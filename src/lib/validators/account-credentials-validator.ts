import { z } from "zod";

// Strong password validation
const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character");

// Basic password validation (for backward compatibility)
const basicPasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" });

export const AuthCredentialValidator = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: basicPasswordSchema,
});

export type TAuthCredentialValidator = z.infer<typeof AuthCredentialValidator>;

export const AuthEmailValidator = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type TAuthEmailValidator = z.infer<typeof AuthEmailValidator>;

export const AuthPasswordValidator = z.object({
  password: basicPasswordSchema,
});

export type TAuthPasswordValidator = z.infer<typeof AuthPasswordValidator>;

export const StrongAuthPasswordValidator = z.object({
  password: strongPasswordSchema,
});

export type TStrongAuthPasswordValidator = z.infer<typeof StrongAuthPasswordValidator>;

export const PasswordResetValidator = z.object({
  password: strongPasswordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type TPasswordResetValidator = z.infer<typeof PasswordResetValidator>;

export const ChangePasswordValidator = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: strongPasswordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type TChangePasswordValidator = z.infer<typeof ChangePasswordValidator>;

export const ProfileUpdateValidator = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

export type TProfileUpdateValidator = z.infer<typeof ProfileUpdateValidator>;
