import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Check, X, GraduationCap, Mail, User } from "lucide-react";
import { useHandler } from "./handler";

export function InvitationPage() {
    const [state, handlers] = useHandler();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-fade-in">
                <div className="text-center mb-8 animate-scale-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                        <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Course Invitation
                    </h1>
                    <p className="text-muted-foreground">
                        You've been invited to join a course. Please fill in your details to accept.
                    </p>
                </div>

                <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm animate-slide-in-right">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl text-foreground">Accept Invitation</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Complete your profile to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...state.form}>
                            <form onSubmit={state.form.handleSubmit(handlers.handleAccept)} className="space-y-6">
                                <FormField
                                    control={state.form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                                            <FormLabel className="flex items-center gap-2 text-foreground">
                                                <Mail className="w-4 h-4 text-primary" />
                                                Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your email"
                                                    type="email"
                                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                    {...field}
                                                    value={state.email}
                                                    disabled
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={state.form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                                            <FormLabel className="flex items-center gap-2 text-foreground">
                                                <User className="w-4 h-4 text-primary" />
                                                First Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your first name"
                                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={state.form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                                            <FormLabel className="flex items-center gap-2 text-foreground">
                                                <User className="w-4 h-4 text-primary" />
                                                Last Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your last name"
                                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex gap-4 pt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                                    <Button
                                        type="submit"
                                        disabled={state.isLoading}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95"
                                    >
                                        {state.isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                Accepting...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Check className="w-4 h-4" />
                                                Accept
                                            </div>
                                        )}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handlers.handleReject}
                                        disabled={state.isLoading}
                                        className="flex-1 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                                    >
                                        <div className="flex items-center gap-2">
                                            <X className="w-4 h-4" />
                                            Reject
                                        </div>
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <p className="text-sm text-muted-foreground">
                        Need help?{" "}
                        <a href="mailto:support@lms.com" className="text-primary hover:underline">
                            Contact support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};