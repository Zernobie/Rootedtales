import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { 
  CreditCard,
  Lock,
  CheckCircle2,
  ArrowLeft,
  Smartphone,
  Mail,
  User,
  MapPin,
  Building,
  Globe,
  Shield,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutFlowProps {
  cartItems: any[];
  total: number;
  onComplete: () => void;
  onBack: () => void;
}

type CheckoutStep = 'payment' | 'processing' | 'confirmation';

export function CheckoutFlow({ cartItems, total, onComplete, onBack }: CheckoutFlowProps) {
  const [step, setStep] = useState<CheckoutStep>('payment');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [orderId] = useState(`RT-${Date.now()}`);

  const handlePayment = () => {
    setStep('processing');
    setProcessingProgress(0);
    
    // Simulate payment processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStep('confirmation');
            toast.success('Payment successful!');
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Lock className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-foreground">Secure Checkout</h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-600" />
            <span>256-bit SSL encryption</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Payment Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <p className="font-medium">Credit or Debit Card</p>
                          <p className="text-xs text-muted-foreground">
                            Visa, Mastercard, Amex
                          </p>
                        </div>
                      </div>
                      {paymentMethod === 'card' && (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>

                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'apple' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod('apple')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-5 h-5 mr-3 text-lg">🍎</div>
                        <div>
                          <p className="font-medium">Apple Pay</p>
                          <p className="text-xs text-muted-foreground">
                            Fast and secure
                          </p>
                        </div>
                      </div>
                      {paymentMethod === 'apple' && (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>

                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'google' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod('google')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Smartphone className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <p className="font-medium">Google Pay</p>
                          <p className="text-xs text-muted-foreground">
                            One-tap payment
                          </p>
                        </div>
                      </div>
                      {paymentMethod === 'google' && (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card Details Form (shown when card is selected) */}
              {paymentMethod === 'card' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Card Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input 
                        id="card-number" 
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          placeholder="123"
                          maxLength={4}
                          type="password"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="card-name">Cardholder Name</Label>
                      <Input 
                        id="card-name" 
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs text-yellow-800 flex items-center">
                        <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
                        Your CVV is never stored. We use Stripe for secure payment processing.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="San Francisco" />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="94102" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground line-clamp-1 flex-1">
                        {item.title}
                      </span>
                      <span className="font-medium ml-2">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePayment}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Complete Purchase - ${total.toFixed(2)}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onBack}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Cart
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12"
            >
              <Card>
                <CardContent className="p-8 text-center space-y-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Lock className="w-16 h-16 text-primary mx-auto" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">Processing Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      Please wait while we securely process your payment...
                    </p>
                  </div>
                  
                  <Progress value={processingProgress} className="h-2" />
                  
                  <p className="text-xs text-muted-foreground">
                    {processingProgress}% complete
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <Card className="border-green-200 bg-green-50/50">
                <CardContent className="p-8 text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto" />
                  </motion.div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                    <p className="text-sm text-muted-foreground">
                      Your order has been confirmed
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-xs text-muted-foreground mb-1">Order ID</p>
                    <p className="font-mono font-bold text-lg">{orderId}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-lg">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium line-clamp-1">
                          {item.title}
                        </span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Download className="w-3 h-3 mr-1" />
                        Ready
                      </Badge>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-900 flex items-center">
                      <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                      A confirmation email has been sent to your inbox
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Button 
                className="w-full" 
                size="lg"
                onClick={onComplete}
              >
                <Download className="w-4 h-4 mr-2" />
                View My Books
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
