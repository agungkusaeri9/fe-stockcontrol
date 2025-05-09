import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Label from "./Label";

interface InputLabelProps {
    label: string;
    name: string;
    type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
    required?: boolean;
    placeholder?: string;
    error?: FieldError;
    register?: UseFormRegisterReturn;
    disabled?: boolean;
    success?: boolean;
    hint?: string; // Optional hint text
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputLabel: React.FC<InputLabelProps> = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
    error,
    register,
    disabled = false,
    success = false,
    hint,
    onChange
}) => {
    // Class untuk input berdasarkan kondisi (disabled, success, error)
    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`;

    if (disabled) {
        inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (error) {
        inputClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;
    } else if (success) {
        inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300 dark:text-success-400 dark:border-success-500`;
    } else {
        inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }

    return (
        <div className="mb-4">
            <Label htmlFor={name}>
                {label} {required && <span className="text-error-500">*</span>}
            </Label>
            <input
                onChange={onChange}
                id={name}
                type={type}
                placeholder={placeholder}
                {...register}
                disabled={disabled}
                className={inputClasses}
            />
            {error && <p className="text-sm text-error-500 mt-1">{error.message}</p>}
            {hint && !error && !success && (
                <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
            )}
        </div>
    );
};

export default InputLabel;
