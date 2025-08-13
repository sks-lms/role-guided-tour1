import React from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentLoginModalProps, useHandler } from "./handler";

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({ open, onOpenChange }) => {
    const [state, handlers] = useHandler(onOpenChange);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden bg-background border-0 shadow-elegant">
                <div className="bg-gradient-primary p-6 text-center">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-primary-foreground">
                            Student Login
                        </DialogTitle>
                        <p className="text-primary-foreground/80 mt-2">
                            Access your learning dashboard
                        </p>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-6">
                    {/* Google Login Button */}
                    <Button
                        onClick={(e) => handlers.handleStudentGoogleLogin(e)}
                        variant="outline"
                        className="w-full h-12 border-2 hover:border-primary hover:shadow-card transition-all duration-300 group"
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continue with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-4 text-muted-foreground">Or</span>
                        </div>
                    </div>

                    {/* Email/Code Form */}
                    <form
                        onSubmit={handlers.handleSubmit(state.step === "email" ? handlers.handleEmailSubmit : handlers.handleCodeSubmit)}
                        className="space-y-4"
                    >
                        {state.step === "email" ? (
                            <div className="space-y-4 animate-fade-in">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            className="pl-10 h-12 transition-all duration-300 focus:shadow-card"
                                            {...state.register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                        />
                                    </div>
                                    {state.errors.email && (
                                        <p className="text-sm text-destructive animate-fade-in">
                                            {state.errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
                                    disabled={state.isLoading}
                                >
                                    {state.isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                            Sending Code...
                                        </div>
                                    ) : (
                                        <>
                                            Send Login Code
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-fade-in">
                                <div className="text-center space-y-2 p-4 bg-muted/50 rounded-lg">
                                    <CheckCircle className="h-8 w-8 text-primary mx-auto" />
                                    <p className="text-sm text-muted-foreground">
                                        A verification code has been sent to
                                    </p>
                                    <p className="font-medium text-foreground">{state.email}</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="code" className="text-sm font-medium">
                                        Verification Code
                                    </Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        placeholder="Enter 6-digit code"
                                        maxLength={6}
                                        className="h-12 text-center text-lg tracking-widest transition-all duration-300 focus:shadow-card"
                                        {...state.register("code", {
                                            required: "Verification code is required",
                                            minLength: {
                                                value: 6,
                                                message: "Code must be 6 digits"
                                            }
                                        })}
                                    />
                                    {state.errors.code && (
                                        <p className="text-sm text-destructive animate-fade-in">
                                            {state.errors.code.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handlers.resetForm}
                                        className="flex-1 h-12 hover:shadow-card transition-all duration-300"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
                                        disabled={state.isLoading}
                                    >
                                        {state.isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                                Verifying...
                                            </div>
                                        ) : (
                                            <>
                                                Verify Code
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};