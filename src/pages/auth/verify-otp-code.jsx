import {
    Typography,
    Button
  } from "@material-tailwind/react";
  import React, { useState } from 'react';
  import OtpInput from 'react-otp-input';
import { verifyLoginOtp } from "@/api/authenticationApi";
import { Toaster, toast } from 'sonner';
import { useAuth } from "@/features/auth/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { delay,of,tap,switchMap,finalize,catchError, defer } from "rxjs";





const getPhoneNumber = () => {
    const queryParams = new URLSearchParams(location.search);
    const phone = queryParams.get('phone');
    return phone ? atob(phone) : ''
};


export function VerifyOtpCode()  {
    const auth = useAuth();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const OTP_LENGTH = 4;
    const { control,handleSubmit,formState: { errors } } = useForm();
    const onSubmit = () => {
        of({phone_number: getPhoneNumber(), otp_value: otp}).pipe(
          tap(() => setIsLoading(true)),
          switchMap((value) => defer(() => verifyLoginOtp(value)).pipe(
              catchError((err) => {
                  toast.error('An error occurred on the server. Please contact support or try again.',
                      {
                          duration: 8000
                      }
                  )
                  throw err;
              })
          )),
          switchMap((res) => defer(() => res.json()).pipe(
              delay(800),
              finalize(() => setIsLoading(false))
          )),
        ).subscribe({
            next: (res) => {
                if (res.status && res.status === 'success') {
                    auth.login(res);
                    document.startViewTransition(() => {
                        flushSync(() => {
                            navigate('/dashboard/home');
                        });
                    });
                }
                else {
                    toast.error(
                        res.message || 'Wrong Otp, please check again.',
                        {
                          duration: 8000
                        }
                    )
                }
            }
        })
    };

    return (
        <section className="w-screen h-screen grid grid-cols-2 relative">
            <div className="w-full h-full grid place-items-center lg:col-span-1 col-span-full">
                <form className="grid place-items-center w-full gap-y-8" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid place-items-center">
                      <Typography variant="h2" className="font-bold mb-4 font-poppins">Verify phone number</Typography>
                      <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal font-poppins text-center w-full">An OTP was sent to <span className="font-medium">{`0${getPhoneNumber()}`}</span>, enter the code below to continue.</Typography>
                  </div>
                  <div className="flex flex-col">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={OTP_LENGTH}
                        renderSeparator={<span className="opacity-0">------</span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={`!w-12 !h-12 border rounded space-x-1 !bg-transparent`}
                    />
                  </div>
                    <div className="px-16 w-full">
                        <Button loading={isLoading} disabled={otp.length !== OTP_LENGTH || isLoading} className="font-poppins" type="submit" fullWidth>
                            Verify
                        </Button>
                    </div>
                </form>
            </div>
            <div className="w-full h-full relative lg:block hidden">
                <div className="w-full h-full absolute">
                    <img src="/img/login-bg-1.png" className="w-full h-full object-cover" alt="" />
                </div>
            </div>
            <div className="absolute top-0">
                <Toaster position="bottom-left" richColors />
            </div>
        </section>
    );
};