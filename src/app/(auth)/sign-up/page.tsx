"use client";

import { Icons } from "@/components/Icons";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthCredentialValidator,
  TAuthCredentialValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialValidator>({
    resolver: zodResolver(AuthCredentialValidator),
  });

  const router = useRouter();

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (error) => {
      if (error.data?.code === "CONFLICT") {
        toast.error("This email is already in use");

        return;
      }

      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);

        return;
      }

      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: ({ sentToEmail }) => {
      router.push("/verify?to=" + sentToEmail);
      router.refresh();
      toast.success(`Verification email sent to ${sentToEmail}`);
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialValidator) => {
    // TODO: handle submit = Send data to server
    mutate({ email, password });
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="relative w-24 h-24">
          <Image src="/logo.png" fill alt="Digibee Logo" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>

        <Link
          className={buttonVariants({
            variant: "link",
            className: "gap-1.5",
          })}
          href="/sign-in"
        >
          Already have an account?
          <ArrowRight className="w-4 h-4" />
        </Link>
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
              />
              {errors?.email && (
                <p className="text-sm text-red-500">{errors?.email?.message}</p>
              )}
            </div>

            <div className="grid gap-1 py-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={cn({
                    "focus-visible:ring-red-500": errors.password,
                  })}
                  placeholder="Password (min. 8 characters)"
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
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
