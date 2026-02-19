import React from 'react';
import { motion, AnimatePresence } from 'motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Lock, Crown, Sparkles, X } from 'lucide-react';

interface SignInPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
  feature: string;
  description?: string;
}

export function SignInPrompt({ isOpen, onClose, onSignIn, feature, description }: SignInPromptProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative z-10 w-full max-w-sm"
        >
          <Card className="border-2 border-primary/20 shadow-2xl">
            <CardHeader className="relative text-center pb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute right-2 top-2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              
              <CardTitle className="text-xl">
                Sign In Required
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  {description || `You need to sign in to access ${feature}`}
                </p>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <Crown className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">Unlock Full Access</span>
                  </div>
                  <ul className="text-xs text-green-700 space-y-1 text-left">
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>Access all 12+ magical books</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>Save your reading progress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>Earn achievements & badges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>Customize themes & settings</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={onSignIn}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Sign In / Sign Up
                </Button>
                
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                >
                  Continue as Guest
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Guests have limited access to preview features
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
