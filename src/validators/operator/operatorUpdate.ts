import { z } from "zod";

export const operatorUpdateValidation = z.object({
  name: z.string().min(1, "Name is required"),
  nik: z.string().min(1, "NIK is required"),
  username: z.string().min(1, "Username is required"),
  password: z
    .union([
      z.string().min(5, "Password must be at least 5 characters"),
      z.null(),
      z.undefined(),
    ])
    .transform((val) => (val === "" ? null : val)),
});
