
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useUser, useFirestore, useAuth, useDoc } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import type { StudentProfile } from "@/lib/demo-data";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

const passwordFormSchema = z.object({
    currentPassword: z.string().min(1, { message: "Current password is required." }),
    newPassword: z.string().min(6, { message: "New password must be at least 6 characters." }),
});

export default function SettingsPage() {
    const { user, loading: userLoading } = useUser();
    const firestore = useFirestore();
    const auth = useAuth();
    const { toast } = useToast();

    const [isProfileSaving, setIsProfileSaving] = useState(false);
    const [isPasswordSaving, setIsPasswordSaving] = useState(false);

    const studentDocRef = useMemo(() => {
        if (!firestore || !user) return null;
        // With real auth, the student document ID in Firestore matches the user's UID
        return doc(firestore, 'students', user.uid);
      }, [firestore, user]);
    
    const { data: studentProfile, loading: studentLoading } = useDoc<StudentProfile>(studentDocRef);

    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: { name: "" },
    });

    const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: { currentPassword: "", newPassword: "" },
    });

    useEffect(() => {
        if (studentProfile) {
            profileForm.reset({ name: studentProfile.name });
        }
    }, [studentProfile, profileForm]);
    
    async function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
        if (!firestore || !user || !studentProfile) return;
        setIsProfileSaving(true);
        try {
            const studentDocRef = doc(firestore, 'students', user.uid);
            await updateDoc(studentDocRef, { name: values.name });

            if(user.displayName !== values.name) {
                await updateProfile(user, { displayName: values.name });
            }
            toast({ title: "Profile updated successfully!" });
        } catch (error: any) {
            console.error(error);
            toast({ variant: "destructive", title: "Failed to update profile.", description: error.message });
        } finally {
            setIsProfileSaving(false);
        }
    }

    async function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
        if (!auth || !user || !user.email) return;

        setIsPasswordSaving(true);
        try {
            const credential = EmailAuthProvider.credential(user.email, values.currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, values.newPassword);
            toast({ title: "Password updated successfully!", description: "You may need to log in again with your new password." });
            passwordForm.reset();
        } catch (error: any) {
            console.error(error);
            let description = "Please check your current password and try again.";
            if(error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                description = "The current password you entered is incorrect.";
            } else if (error.code) {
                description = error.code;
            }
            toast({
                variant: "destructive",
                title: "Failed to update password.",
                description: description,
            });
        } finally {
            setIsPasswordSaving(false);
        }
    }
    
    const isLoading = userLoading || studentLoading;

  return (
    <main className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="grid gap-8">
        <Card>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  This is how others will see you on the site.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} disabled={isLoading || isProfileSaving} placeholder={isLoading ? "Loading..." : "Your name"} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input readOnly disabled value={user?.email || (isLoading ? "Loading..." : "No email found")} />
                     </FormControl>
                     <FormDescription>Your email address cannot be changed.</FormDescription>
                 </FormItem>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading || isProfileSaving}>
                    {isProfileSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isProfileSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <Card>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                    Change your password here. You may need to log in again after a successful password change.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} disabled={isPasswordSaving} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} disabled={isPasswordSaving} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isPasswordSaving}>
                        {isPasswordSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isPasswordSaving ? "Updating..." : "Update Password"}
                    </Button>
                </CardFooter>
            </form>
          </Form>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                Customize the look and feel of the application.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">Theme</h3>
                        <p className="text-sm text-muted-foreground">Select between light and dark mode.</p>
                    </div>
                    <ThemeToggle />
                </div>
            </CardContent>
        </Card>
      </div>
    </main>
  );
}
