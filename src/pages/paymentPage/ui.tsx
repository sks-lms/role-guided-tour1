import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CreditCard, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useHandler } from "./handler";

export function PaymentPage() {
  const [state, handlers] = useHandler();

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-scale-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Complete Your Subscription
          </h1>
          <p className="text-xl text-white/80">
            Choose your payment method to start teaching with SKS LMS
          </p>
        </div>

        <Card className="shadow-elegant border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center space-x-4 mb-6">
              <Button
                variant={state.selectedPlan === "monthly" ? "default" : "outline"}
                onClick={() => handlers.setSelectedPlan("monthly")}
                className="px-6"
              >
                Monthly
              </Button>
              <Button
                variant={state.selectedPlan === "annual" ? "default" : "outline"}
                onClick={() => handlers.setSelectedPlan("annual")}
                className="px-6 relative"
              >
                Annual
                {state.selectedPlan === "annual" && (
                  <Badge className="absolute -top-2 -right-2 bg-accent text-white text-xs">
                    Save 12%
                  </Badge>
                )}
              </Button>
            </div>

            <CardTitle className="text-2xl mb-2">
              {state.plans[state.selectedPlan as keyof typeof state.plans].name}
            </CardTitle>
            
            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-primary">
                {state.plans[state.selectedPlan as keyof typeof state.plans].price}
              </span>
              <span className="text-muted-foreground ml-2">
                {state.plans[state.selectedPlan as keyof typeof state.plans].period}
              </span>
            </div>

            {state.plans[state.selectedPlan as keyof typeof state.plans].savings && (
              <Badge className="bg-accent/10 text-accent border-accent/20">
                {state.plans[state.selectedPlan as keyof typeof state.plans].savings}
              </Badge>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Plan Features */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                What's included:
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Up to 50 students
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  All analytics
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Video uploads
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Email support
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  Cancel anytime
                </div>
                {state.selectedPlan === "annual" && (
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    2 months free
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Choose Payment Method</h3>
              <RadioGroup 
                value={state.selectedPayment} 
                onValueChange={handlers.setSelectedPayment}
                className="space-y-3"
              >
                {state.paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={method.id} 
                      id={method.id} 
                      disabled={method.id === "stripe"}
                    />
                    <Label 
                      htmlFor={method.id} 
                      className={`flex-1 cursor-pointer ${method.id === "stripe" ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      <Card className={`p-4 transition-all duration-200 border-border/50 ${
                        method.id === "stripe" 
                          ? "opacity-60 cursor-not-allowed" 
                          : "hover:shadow-card"
                      }`}>
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-muted ${method.color}`}>
                            <method.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium flex items-center gap-2">
                              {method.name}
                              {method.id === "stripe" && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AlertCircle className="h-4 w-4 text-destructive cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent side="top" variant="destructive" className="max-w-xs">
                                    <div className="text-center">
                                      <p className="font-medium mb-1">Stripe Payment Unavailable</p>
                                      <p className="text-sm">
                                        Stripe payment is currently unavailable. Please try another payment method.
                                      </p>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {method.description}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button 
                variant="outline" 
                className="flex-1" 
                asChild
              >
                <Link to="/" className="flex items-center justify-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Cancel
                </Link>
              </Button>
              <Button 
                className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                onClick={handlers.handleProceedToPayment}
              >
                Proceed to Payment
              </Button>
            </div>

            {/* Security Notice */}
            <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border/50">
              <p className="flex items-center justify-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Your payment information is secure and encrypted
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-white/80 hover:text-white transition-colors text-sm flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};