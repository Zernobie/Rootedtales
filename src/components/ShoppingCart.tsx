import React from 'react';
import { motion } from 'motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ShoppingCart, 
  Trash2, 
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Gift
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItem {
  id: string;
  type: 'book' | 'journal' | 'membership';
  title: string;
  price: number;
  originalPrice?: number;
  coverImage?: any;
  icon: string;
}

interface ShoppingCartProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function ShoppingCartComponent({ 
  cartItems, 
  onRemoveItem, 
  onCheckout,
  onContinueShopping 
}: ShoppingCartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price);
    }
    return sum;
  }, 0);

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
            <ShoppingCart className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-foreground">Shopping Cart</h1>
          </div>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Add some books to get started!
            </p>
            <Button onClick={onContinueShopping}>
              Continue Shopping
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-2xl overflow-hidden backdrop-blur-md bg-opacity-80 border border-white/20 shadow-lg flex-shrink-0">
                          {item.type === 'book' && item.coverImage ? (
                            <ImageWithFallback
                              src={item.coverImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{item.icon}</span>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm line-clamp-2">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-bold text-primary">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Savings Banner */}
            {savings > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Gift className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-700">
                          You're saving ${savings.toFixed(2)} on this order!
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex items-center justify-between text-sm text-green-600">
                      <span>Savings</span>
                      <span className="font-medium">-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    size="lg"
                    onClick={onCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={onContinueShopping}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Methods Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <p className="text-xs text-center text-muted-foreground mb-2">
                    We accept
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Badge variant="outline" className="bg-white">
                      💳 Card
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      🍎 Apple Pay
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      📱 Google Pay
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
