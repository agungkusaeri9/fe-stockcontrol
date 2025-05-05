"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import AuthService from "@/services/AuthService";
import FormErrors from "@/types/formErrors";
import { handleError } from "@/utils/handleErrors";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import InputLabel from "../form/InputLabel";
import Button from "../ui/button/Button";

export default function SignUpForm() {

  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors((prev: FormErrors) => ({ ...prev, [name]: undefined }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation();
  };

  const { mutate: registerMutation, isPending: loading } = useMutation({
    mutationFn: async function () {
      const response = await AuthService.register(form);
      return response;
    },
    onSuccess: function (response) {
      toast.success(response.data.meta.message);
      router.push("/auth/signin");
    },
    onError: function (error) {
      handleError(error, setErrors);
    }
  })

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <InputLabel
                  label="Name"
                  name="name"
                  type="name"
                  required
                  placeholder="Jhon"
                  value={form.name}
                  error={errors.name?.[0]}
                  onChange={handleChange}
                />
                <InputLabel
                  label="Email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  value={form.email}
                  error={errors.email?.[0]}
                  onChange={handleChange}
                />
                <InputLabel
                  label="Password"
                  name="password"
                  type="password"
                  required
                  placeholder="********"
                  value={form.password}
                  error={errors.password?.[0]}
                  onChange={handleChange}
                />
                <InputLabel
                  label="Password Confirmation"
                  name="password_confirmation"
                  type="password"
                  required
                  placeholder="********"
                  value={form.password_confirmation}
                  error={errors.password_confirmation?.[0]}
                  onChange={handleChange}
                />
                <div>
                  <Button loading={loading} disabled={loading} className="w-full" size="sm">
                    Sign Up
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
                <Link
                  href="/auth/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
