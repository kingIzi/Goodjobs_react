import {
  Card,
  Checkbox,
  Button,
  Typography,
  Input
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {PhoneNumberInput} from './sign-in';
import { InputFormField,ReactQuillField } from '../dashboard/company/CompanyForm';
import { useState } from "react";
import { catchError, defer, finalize, from, switchMap, tap } from "rxjs";
import { signup } from "@/api/authenticationApi";
import { Toaster, toast } from 'sonner';
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const { control,handleSubmit,formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (form) => {
    defer(() => signup(form)).pipe(
      tap((form) => setIsLoading(true)),
      catchError((err) => {
        if (err.message) {
          toast.error(
            err.message,
            {
              duration: 8000
            }
          )
        }
        else {
          toast.error(
            'An error occurred on the server. Please contact support or try again.',
            {
              duration: 8000
            }
          )
        }
        throw err;
      }),
      switchMap((res) => from(res.json())),
      finalize(() => setIsLoading(false))
    ).subscribe({
      next: (res) => {
        if (res.status && res.status === 'success') {
          const queryParams = new URLSearchParams({ phone: btoa(form.phone_number) }).toString();
          document.startViewTransition(() => {
            flushSync(() => {
              navigate(`/signup-verify?${queryParams}`,{ replace: true });
            });
          });
        }
        else {
          toast.error(
            res.message || 'The mobile number you entered is not registered. Please register and try again.',
            {
              duration: 8000
            }
          )
        }
      }
    })
  } 
  return (
    <section className="w-screen h-screen grid place-items-center relative">
      <div className="w-full lg:w-3/5">
      <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Not registered?</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Complete the form below to add a new staff</Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full px-4 space-y-2">
          <Controller  
            name="first_name" 
            defaultValue="" // Ensures controlled component
            control={control} 
            rules={{
              required: "Please enter your first name",
            }}  
            render={({ field,fieldState }) => (
              <InputFormField label="First name" {...field} error={fieldState.error} />
            )}
          />
          <Controller  
            name="last_name" 
            defaultValue="" // Ensures controlled component
            control={control} 
            rules={{
              required: "Please enter your last name",
            }}  
            render={({ field,fieldState }) => (
              <InputFormField label="Last name" {...field} error={fieldState.error} />
            )}
          />
          <Controller  
              name="phone_number" 
              defaultValue="" // Ensures controlled component
              control={control} 
              rules={{ required: "Phone number is required",pattern: {
                value: /^[67]\d{8}$/, // Example: 9 to 12 digits
                message: 'Invalid phone number',
              }, }}  
              render={({ field,fieldState }) => <PhoneNumberInput label="" {...field} error={fieldState.error} />}
          />
          <Controller  
            name="email" 
            defaultValue="" // Ensures controlled component
            control={control} 
            rules={{
              required: "Please enter your email address",
              pattern: {
                value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address format",
              },
            }}  
            render={({ field,fieldState }) => (
              <InputFormField label="Email Address" {...field} error={fieldState.error} />
            )}
          />
          <Button loading={isLoading} disabled={Object.keys(errors).length > 0 || isLoading} className="font-poppins bg-[#071460] hover:bg-[#180463]" type="submit" fullWidth>
            Sign up
          </Button>
        </form>
         <div className="flex flex-row items-center my-4 space-x-1 w-full justify-center">
            <h6>Already registered?</h6>
            <Link to={'/signin'} className="hover:underline !text-[#071460]">Sign in.</Link>
          </div>
      </div>
      <div className="absolute top-0">
        <Toaster position="bottom-left" richColors />
      </div>
    </section>
  );
}

export default SignUp;
