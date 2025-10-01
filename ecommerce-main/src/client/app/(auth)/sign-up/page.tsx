"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/app/components/atoms/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PasswordField from "@/app/components/molecules/PasswordField";
import { z } from "zod";
import MainLayout from "@/app/components/templates/MainLayout";
import { useSignupMutation } from "@/app/store/apis/AuthApi";
import { MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

interface InputForm {
  name: string;
  phone?: string;
  email?: string;
  password?: string;
  otp?: string;
}

type AuthMethod = 'phone' | 'email';

const nameSchema = (value: string) => {
  const result = z
    .string()
    .min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak")
    .safeParse(value);
  return result.success || result.error.errors[0].message;
};

const emailSchema = (value: string) => {
  const result = z.string().email("Noto'g'ri email manzili").safeParse(value);
  return result.success || result.error.errors[0].message;
};

const Signup = () => {
  const [signup, { isLoading, error }] = useSignupMutation();
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      otp: "",
    },
  });

  const onSubmit = async (formData: InputForm) => {
    try {
      // Telefon usuli uchun
      if (authMethod === 'phone') {
        const phoneData = {
          name: formData.name,
          phone: formData.phone || '',
          otp: formData.otp || ''
        };
        await signup(phoneData as any).unwrap();
      } else {
        // Email usuli uchun
        const emailData = {
          name: formData.name,
          email: formData.email || '',
          password: formData.password || ''
        };
        await signup(emailData).unwrap();
      }
      router.push("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleSendOTP = async (phone: string) => {
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      if (response.ok) {
        setOtpSent(true);
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      console.error('OTP yuborishda xatolik:', error);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <main className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
            Ro'yxatdan O'tish
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 text-center text-sm p-3 rounded mb-4">
              Kutilmagan xatolik yuz berdi
            </div>
          )}

          {/* Auth Method Selector */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setAuthMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                authMethod === 'phone' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Phone size={16} className="inline mr-2" />
              Telefon
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                authMethod === 'email' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Email
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              name="name"
              type="text"
              placeholder="Ism"
              control={control}
              validation={{
                required: "Ism talab qilinadi",
                validate: nameSchema,
              }}
              error={errors.name?.message}
              className="py-2.5 text-sm"
            />

            {authMethod === 'phone' ? (
              <>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  control={control}
                  validation={{ 
                    required: "Telefon raqam talab qilinadi",
                    pattern: {
                      value: /^\+998[0-9]{9}$/,
                      message: "To'g'ri telefon raqam kiriting (+998901234567)"
                    }
                  }}
                  error={errors.phone?.message}
                  className="py-2.5 text-sm"
                />
                
                {otpSent && (
                  <Input
                    name="otp"
                    type="text"
                    placeholder="SMS kod"
                    control={control}
                    validation={{ required: "SMS kod talab qilinadi" }}
                    error={errors.otp?.message}
                    className="py-2.5 text-sm"
                  />
                )}

                <button
                  type={otpSent ? "submit" : "button"}
                  onClick={!otpSent ? () => {
                    const phone = control._formValues.phone;
                    if (phone) handleSendOTP(phone);
                  } : undefined}
                  disabled={countdown > 0}
                  className={`w-full py-2.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors ${
                    isLoading || countdown > 0 ? "cursor-not-allowed bg-gray-400" : ""
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mx-auto" size={20} />
                  ) : otpSent ? (
                    "Akkaunt Yaratish"
                  ) : countdown > 0 ? (
                    `Qayta yuborish (${countdown}s)`
                  ) : (
                    "SMS Kod Yuborish"
                  )}
                </button>
              </>
            ) : (
              <>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  control={control}
                  validation={{
                    required: "Email talab qilinadi",
                    validate: emailSchema,
                  }}
                  error={errors.email?.message}
                  className="py-2.5 text-sm"
                />

                <PasswordField
                  name="password"
                  register={register}
                  errors={errors}
                  watch={watch}
                />

                <button
                  type="submit"
                  className={`w-full py-2.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors ${
                    isLoading ? "cursor-not-allowed bg-gray-400" : ""
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mx-auto" size={20} />
                  ) : (
                    "Akkaunt Yaratish"
                  )}
                </button>
              </>
            )}
          </form>

          <div className="text-center text-sm text-gray-600 mt-4">
            Akkauntingiz bormi?{" "}
            <Link href="/sign-in" className="text-indigo-600 hover:underline">
              Kirish
            </Link>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">
              📱 Telefon Raqam bilan Ro'yxatdan O'tish
            </h3>
            <p className="text-xs text-blue-600">
              Telefon raqamingizga SMS kod yuboriladi. Bu eng xavfsiz va tezkor usul.
            </p>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default Signup;
