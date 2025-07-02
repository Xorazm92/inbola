"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthPasswordValidator,
  TAuthPasswordValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorAndLoading from "./ErrorAndLoading";

interface ResetPasswordProps {
  token: string;
}

const ResetPassword = ({ token }: ResetPasswordProps) => {
  const [isReset, setIsReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthPasswordValidator>({
    resolver: zodResolver(AuthPasswordValidator),
  });

  const {
    mutate: updatePassword,
    isLoading,
    isError,
  } = trpc.auth.resetPassword.useMutation({
    onSuccess: ({ success }) => {
      if (success) {
        setIsReset(true);
        toast.success("Password updated successfully");
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      console.error("[ERROR]",error);
      toast.error(error.message);
    },
  });

  const onSubmit = ({ password }: TAuthPasswordValidator) => {
    updatePassword({ password, token });
  };

  <ErrorAndLoading isLoading={isLoading} isError={isError} />;

  if (isReset) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/email-sent.png" fill alt="the email was sent" />
        </div>

        <h3 className="text-2xl font-semibold">You&apos;re all set!</h3>
        <p className="mt-1 text-center text-muted-foreground">
          Your password has been updated!
        </p>
        <Link className={buttonVariants({ variant: "link" })} href="/sign-in">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-2 text-center grow">
        <div className="relative w-24 h-24">
          <Image src="/logo.png" fill alt="Digibee Logo" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Update your password
        </h1>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1 py-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.password,
                  })}
                  placeholder="Enter new password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors?.password && (
                <p className="text-sm text-red-500">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            <Button disabled={isLoading} className="w-full">
              {isLoading ? "Resetting..." : "Reset password"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
