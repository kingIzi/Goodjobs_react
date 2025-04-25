import LoadingIndicator from '@/widgets/loading/LoadingIndicator';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { Spinner,Input,Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/data/app-constants';
import { Controller, useForm } from "react-hook-form";
import { catchError, defer, firstValueFrom, map, switchMap,Subject, of, tap, finalize } from 'rxjs';
import { Toaster, toast } from 'sonner';


export const InputFormField = React.forwardRef(({ label, error, value = "", onChange,type = 'text', ...props }, ref) => {
  return (
    <div className="flex flex-col w-full">
      <Input
        type={type}
        placeholder={label}
        className="font-poppins appearance-none rounded !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:opacity-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "min-w-0",
        }}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <p className={`text-red-500 text-xs h-4 mt-1 !font-poppins duration-500 ${error?.message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>{error && error?.message}</p>
    </div>
  );
});

export const ReactQuillField = React.forwardRef(({ label, error, value = "", onChange, ...props }, ref) => {
  return (
    <div className="flex flex-col w-full">
      <ReactQuill 
        style={{color: 'black'}}
        theme="snow" 
        value={value} 
        onChange={onChange} 
        ref={ref} 
        {...props} 
      />
      <p className={`text-red-500 text-xs h-4 mt-1 !font-poppins duration-500 ${error?.message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>{error && error?.message}</p>
    </div>
  );
});

export const FileFormField = React.forwardRef(({ label, error, value = "", onChange, ...props }, ref) => {
  return (
    <div className="flex flex-col w-full">
        <input 
          type="file" 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          value={undefined} 
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onChange(file); // <-- send the File object
            }
          }}
          ref={ref} 
          {...props} 
        />
        <p className={`text-red-500 text-xs h-4 mt-1 !font-poppins duration-500 ${error?.message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>{error && error?.message}</p>
    </div>
  );
});


function CompanyForm({closeModalAddCompany}) {
  const [isLoading, setIsLoading] = useState(false);
  const { control,handleSubmit,formState: { errors } } = useForm();

  const onSubmit = (loginForm) => {
    const companyExists$ = of(loginForm.name).pipe(
      map((name) => {
        const formData = new FormData()
        formData.append("name", name);
        return {
          method: 'POST',
          body: formData,
          redirect: 'follow'
        };
      }),
      switchMap((options) => defer(() => fetch(`${BASE_URL}/api/check_exists_company/`, options))),
      switchMap((res) => defer(() => res.json())),
      map((res) => res.message),
      catchError(() => {
        toast.error(
          'An error occurred on the server. Please contact support or try again.',
          {
            duration: 8000
          }
        );
        throw err;
      })
    );
    const companyExistsToast$ = of(true).pipe(
      tap(() => toast.error(
        `The company ${loginForm.name} already exists.`,
        {
          duration: 8000
        }
      ))
    );
    const addCompany$ = of(loginForm).pipe(
      map((form) => Object.entries(form).reduce((fd, [key, val]) => (fd.append(key, val), fd), new FormData())),
      map((formData) => ({
        method: "POST",
        body: formData,
        redirect: "follow"
      })),
      switchMap((options) => defer(() => fetch(`${BASE_URL}/api/add_job_company/`,options))),
      switchMap((res) => defer(() => res.json())),
      tap((res) => window.location.reload()),
      catchError((err) => {
        toast.error(
          `Failed to add new company.`,
          {
            duration: 8000
          }
        )
        throw err;
      })
    );
    of(loginForm).pipe(
      tap(() => setIsLoading(true)),
      switchMap(() => companyExists$),
      switchMap((res) => res ? companyExistsToast$ : addCompany$),
      finalize(() => setIsLoading(false))
    ).subscribe({
      error: (err) => console.error(err),
      complete: () => console.log('Completed...') 
    })
  }; 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller 
        name='name'
        defaultValue=''
        control={control}
        rules={{ required: "Phone number is required"}} 
        render={({ field,fieldState }) => <InputFormField label="Enter company name" {...field} error={fieldState.error} />}
      />
      <Controller 
        name='about_company' 
        defaultValue='' 
        control={control} 
        rules={{ required: "Please enter company description"}}
        render={({ field,fieldState }) => <ReactQuillField {...field} error={fieldState.error} />} 

      />
      <Controller 
        name='company_image'
        defaultValue=''
        control={control}
        rules={{ required: "Missing company logo"}}
        render={({ field,fieldState }) => <FileFormField {...field} error={fieldState.error} />} 
      />
    <div className="flex justify-end"> {/* This div wraps the button to align it to the right */}
      <Button loading={isLoading} disabled={Object.keys(errors).length > 0 || isLoading} className="font-poppins bg-[#071460] hover:bg-[#180463]" type="submit" fullWidth>
        Submit
      </Button>
    </div>
    <div className="absolute top-0">
      <Toaster position="top-left" richColors />
    </div>
  </form>
  );
}

export default CompanyForm;
