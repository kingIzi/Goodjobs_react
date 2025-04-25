import {
  Card,
  Checkbox,
  Button,
  Typography,
  Spinner,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import React from "react";
import { Toaster, toast } from 'sonner';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "@/api/authenticationApi";
import { Controller, useForm } from "react-hook-form";
import { BehaviorSubject, catchError, concatMap, defer, delay, finalize, iif, map, of, Subject, switchMap, tap, timer } from "rxjs";
import { flushSync } from "react-dom";


export function SignIn() {
  const PhoneNumberInput = React.forwardRef(({ label,error, value = "", onChange, ...props }, ref) => {
    const COUNTRIES = ["Tanzania (+255)"];
    const CODES = ["+255"];
    const [country, setCountry] = React.useState(0);
    return (
      <div className="w-full max-w-full">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 font-medium font-poppins"
        >
          {label}
        </Typography>
        <div className="flex flex-col">
          <div className="relative flex w-full">
            <Menu placement="bottom-start">
              <MenuHandler>
                <Button
                  ripple={false}
                  variant="text"
                  color="blue-gray"
                  className="h-10 w-14 shrink-0 rounded-r-none border border-r-0 border-blue-gray-200 bg-transparent px-3"
                >
                  {CODES[country]}
                </Button>
              </MenuHandler>
              <MenuList className="max-h-[20rem] max-w-[18rem]">
                {COUNTRIES.map((country, index) => {
                  return (
                    <MenuItem
                      key={country}
                      value={country}
                      onClick={() => setCountry(index)}
                    >
                      {country}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
            <Input
              type="tel"
              inputMode="numeric"
              maxLength={9}
              placeholder="654-456-232"
              className="font-poppins appearance-none rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:opacity-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "min-w-0",
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-blue-gray-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              value={value}
              onChange={onChange}
              ref={ref}
              {...props}
            />
          </div>
          <p className={`text-red-500 text-xs h-4 mt-1 !font-poppins duration-500 ${error?.message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>{error && error?.message}</p>
        </div>
      </div>
    );
  });
  
  const SignInForm = () => {
    const navigate = useNavigate();
    const { control,handleSubmit,formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = (loginForm) => {
      of(loginForm).pipe(
        tap(() => setIsLoading(true)),
        switchMap((value) => defer(() => loginUser(value)).pipe(
          catchError((err) => {
            toast.error(
              'An error occurred on the server. Please contact support or try again.',
              {
                duration: 8000
              }
            )
            throw err;
          })
        )),
        switchMap((res) => defer(() => res.json()).pipe(
          delay(800),
        )),
        finalize(() => setIsLoading(false))
      ).subscribe({
        next: (res) => {
          if (res.status && res.status === 'success') {
            const queryParams = new URLSearchParams({ phone: btoa(loginForm.phone_number) }).toString();
            document.startViewTransition(() => {
              flushSync(() => {
                navigate(`/otp?${queryParams}`,{ replace: true });
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
        },
      })      
    };
    return (
      <form className="w-full px-16 mt-8 flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Controller  
              name="phone_number" 
              defaultValue="" // Ensures controlled component
              control={control} 
              rules={{ required: "Phone number is required",pattern: {
                value: /^[67]\d{8}$/, // Example: 9 to 12 digits
                message: 'Invalid phone number',
              }, }}  
              render={({ field,fieldState }) => <PhoneNumberInput label="Enter your phone number" {...field} error={fieldState.error} />}
              />
            <Button loading={isLoading} disabled={Object.keys(errors).length > 0 || isLoading} className="font-poppins" type="submit" fullWidth>
              Request Otp
            </Button>
      </form>
    );
  };

  return (
    <section className="w-screen h-screen grid grid-cols-2 relative">
      <div className="w-full h-full grid place-items-center lg:col-span-1 col-span-full">
        <div className="grid place-items-center w-full">
          <div className="grid place-items-center w-full">
            <Typography variant="h2" className="font-bold mb-4 font-poppins">Sign In</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal font-poppins text-center w-full">Enter your phone Number and to receive an OTP.</Typography>
          </div>
          <SignInForm />
        </div>
      </div>
      <div className="w-full h-full relative lg:block hidden">
        <div className="w-full h-full absolute">
          <img src="/img/login-bg-2.png" className="w-full h-full object-cover" alt="" />
        </div>
      </div>
      <div className="absolute top-0">
        <Toaster position="bottom-left" richColors />
      </div>
    </section>
  );



}

export default SignIn;
