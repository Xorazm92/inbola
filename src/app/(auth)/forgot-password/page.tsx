"use client";

import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthEmailValidator,
  TAuthEmailValidator,
} from "@/lib/validators/account-credentials-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAuthEmailValidator>({
    resolver: zodResolver(AuthEmailValidator),
  });

  const onSubmit = async ({ email }: TAuthEmailValidator) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setSubmittedEmail(email);
        setIsSubmitted(true);
        toast.success("Password reset email sent!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="relative w-24 h-24">
              <Image src="/logo.png" fill alt="INBOLA Logo" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to{" "}
              <span className="font-medium">{submittedEmail}</span>
            </p>
          </div>

          <div className="grid gap-6">
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "outline",
                className: "gap-1.5",
              })}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative w-24 h-24">
            <Image src="/logo.png" fill alt="INBOLA Logo" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot your password?
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.email,
                  })}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                />
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <Button disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Sending..." : "Send reset link"}
              </Button>
            </div>
          </form>

          <div className="text-center">
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
