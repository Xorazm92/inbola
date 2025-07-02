"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User, Lock, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { trpc } from "@/trpc/client";
import {
  ProfileUpdateValidator,
  ChangePasswordValidator,
  TProfileUpdateValidator,
  TChangePasswordValidator,
} from "@/lib/validators/account-credentials-validator";
import { PasswordStrength } from "@/components/PasswordStrength";

const ProfilePage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get current user
  const { data: user, isLoading: userLoading } = trpc.auth.getUser.useQuery();

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: profileSubmitting },
    reset: resetProfile,
  } = useForm<TProfileUpdateValidator>({
    resolver: zodResolver(ProfileUpdateValidator),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: passwordSubmitting },
    reset: resetPassword,
    watch: watchPassword,
  } = useForm<TChangePasswordValidator>({
    resolver: zodResolver(ChangePasswordValidator),
  });

  const newPassword = watchPassword("newPassword");

  // Update profile mutation
  const { mutate: updateProfile } = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  // Change password mutation
  const { mutate: changePassword } = trpc.user.changePassword.useMutation({
    onSuccess: () => {
      toast.success("Password changed successfully!");
      resetPassword();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to change password");
    },
  });

  const onProfileSubmit = (data: TProfileUpdateValidator) => {
    updateProfile(data);
  };

  const onPasswordSubmit = (data: TChangePasswordValidator) => {
    changePassword(data);
  };

  React.useEffect(() => {
    if (user) {
      resetProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, resetProfile]);

  if (userLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...registerProfile("firstName")}
                      className={cn({
                        "focus-visible:ring-red-500": profileErrors.firstName,
                      })}
                      placeholder="Enter your first name"
                    />
                    {profileErrors?.firstName && (
                      <p className="text-sm text-red-500">
                        {profileErrors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...registerProfile("lastName")}
                      className={cn({
                        "focus-visible:ring-red-500": profileErrors.lastName,
                      })}
                      placeholder="Enter your last name"
                    />
                    {profileErrors?.lastName && (
                      <p className="text-sm text-red-500">
                        {profileErrors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerProfile("email")}
                    className={cn({
                      "focus-visible:ring-red-500": profileErrors.email,
                    })}
                    placeholder="Enter your email"
                  />
                  {profileErrors?.email && (
                    <p className="text-sm text-red-500">
                      {profileErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...registerProfile("phone")}
                    placeholder="Enter your phone number"
                  />
                </div>

                <Button type="submit" disabled={profileSubmitting} className="w-full md:w-auto">
                  {profileSubmitting ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      {...registerPassword("currentPassword")}
                      type={showCurrentPassword ? "text" : "password"}
                      className={cn({
                        "focus-visible:ring-red-500": passwordErrors.currentPassword,
                      })}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {passwordErrors?.currentPassword && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      {...registerPassword("newPassword")}
                      type={showNewPassword ? "text" : "password"}
                      className={cn({
                        "focus-visible:ring-red-500": passwordErrors.newPassword,
                      })}
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {passwordErrors?.newPassword && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.newPassword.message}
                    </p>
                  )}
                  {newPassword && <PasswordStrength password={newPassword} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      {...registerPassword("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      className={cn({
                        "focus-visible:ring-red-500": passwordErrors.confirmPassword,
                      })}
                      placeholder="Confirm new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {passwordErrors?.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={passwordSubmitting} className="w-full md:w-auto">
                  {passwordSubmitting ? "Changing..." : "Change Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your experience and notification settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Preference settings will be available soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
