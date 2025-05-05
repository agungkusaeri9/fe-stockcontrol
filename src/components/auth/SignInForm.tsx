"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon } from "@/icons";
import AuthService from "@/services/AuthService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  setCookie,
} from 'cookies-next/client';
import toast from "react-hot-toast";
import { handleError } from "@/utils/handleErrors";
import FormErrors from "@/types/formErrors";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginValidation } from "@/validators/auth/login";
import { h } from "@fullcalendar/core/preact.js";
import InputLabel from "../form/FormInput";
export default function SignInForm() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const { mutate: loginMutation, isPending: loading } = useMutation({
    mutationFn: async function (data: { username: string, password: string }) {
      const response = await AuthService.login(data);
      return response;
    },
    onSuccess: function (response) {
      setCookie('user', response.data.data, {
        // maxAge: response.data.data.expires_in,
        path: '/',
        secure: true,
        sameSite: 'strict',
      });
      setCookie('token', response.data.data.token, {
        // maxAge: response.data.data.expires_in,
        path: '/',
        secure: true,
        sameSite: 'strict',
      });
      toast.success(response.data.message);
      router.push("/dashboard");
    },
    onError: function (error) {
      console.log('Error ', error);
      handleError(error);
    }
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginValidation),
  });

  const onSubmit = (data: any) => {
    loginMutation(data);
  };


  const handleWithoutLogin = () => {
    localStorage.setItem('role', 'guest');
    router.push("/dashboard");
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full max-w-md mx-auto px-4 sm:px-0 mt-25 ">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Menghindari link default behavior
            handleWithoutLogin(); // Menjalankan fungsi handleWithoutLogin
          }}
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Without Login
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-6">
                <InputLabel
                  label="Username"
                  name="username"
                  type="text"
                  required
                  placeholder="Enter Username"
                  register={register("username")}
                  error={errors.username}
                />
                <InputLabel
                  label="Password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter Password"
                  register={register("password")}
                  error={errors.password}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                </div>
                <div>
                  <Button loading={loading} disabled={loading} className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            {/* <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  href="/auth/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
