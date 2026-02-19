import React, { useState } from 'react';
import { CreditCard, Lock, Shield, CheckCircle, AlertTriangle, Loader } from 'lucide-react';

interface SecureCheckoutProps {
  ebookTitle: string;
  ebookPrice: number;
  ebookId: string;
  theme: 'forest' | 'ocean' | 'sunset' | 'night';
  userEmail: string;
  onSuccess: (purchaseId: string) => void;
  onCancel: () => void;
}

const THEME_COLORS = {
  forest: { primary: 'emerald-600', secondary: 'green-100', text: 'green-900' },
  ocean: { primary: 'cyan-600', secondary: 'cyan-100', text: 'cyan-900' },
  sunset: { primary: 'orange-600', secondary: 'orange-100', text: 'orange-900' },
  night: { primary: 'indigo-600', secondary: 'indigo-100', text: 'indigo-900' }
};

export function SecureCheckout({ ebookTitle, ebookPrice, ebookId, theme, userEmail, onSuccess, onCancel }: SecureCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'google-play' | 'credit-card'>('google-play');

  const colors = THEME_COLORS[theme];

  const handlePurchase = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // IMPORTANT: In production, this should call Google Play Billing Library
      // This is a mock implementation for demonstration
      
      // Step 1: Validate user authentication
      if (!userEmail) {
        throw new Error('User not authenticated');
      }

      // Step 2: Create purchase order on secure server
      const orderResponse = await mockCreateOrder({
        ebookId,
        userEmail,
        price: ebookPrice,
        paymentMethod
      });

      // Step 3: Process payment through Google Play Billing
      const paymentResponse = await mockProcessPayment(orderResponse.orderId);

      // Step 4: Verify receipt server-side (CRITICAL for security)
      const verificationResponse = await mockVerifyReceipt(paymentResponse.receiptToken);

      if (verificationResponse.verified) {
        // Step 5: Grant access to ebook
        await mockGrantAccess(ebookId, userEmail);

        setPurchaseComplete(true);
        setTimeout(() => {
          onSuccess(verificationResponse.purchaseId);
        }, 2000);
      } else {
        throw new Error('Payment verification failed');
      }

    } catch (err: any) {
      setError(err.message || 'Purchase failed. Please try again.');
      setIsProcessing(false);
    }
  };

  // Mock functions - In production, replace with actual API calls
  const mockCreateOrder = async (orderData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { orderId: `order_${Date.now()}` };
  };

  const mockProcessPayment = async (orderId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { receiptToken: `receipt_${Date.now()}`, success: true };
  };

  const mockVerifyReceipt = async (receiptToken: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { verified: true, purchaseId: `purchase_${Date.now()}` };
  };

  const mockGrantAccess = async (ebookId: string, email: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  };

  if (purchaseComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-sm w-full">
          <div className="text-center">
            <div className={`w-16 h-16 bg-${colors.secondary} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <CheckCircle className={`w-10 h-10 text-${colors.primary}`} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Purchase Complete!</h3>
            <p className="text-gray-600 mb-4">
              "{ebookTitle}" has been added to your library.
            </p>
            <p className="text-sm text-gray-500">
              You can now download and read your book offline.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`bg-${colors.primary} text-white p-4 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Secure Checkout</h2>
          </div>
          <button onClick={onCancel} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>

        {/* Security Notice */}
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Secure Connection</p>
              <p className="text-xs text-blue-700 mt-1">
                Your payment is processed securely through Google Play. We never store your payment information.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">E-Book:</span>
              <span className="text-sm font-medium text-gray-900">{ebookTitle}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Format:</span>
              <span className="text-sm text-gray-900">EPUB (DRM Protected)</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">License:</span>
              <span className="text-sm text-gray-900">Personal Use</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="text-xl font-bold text-gray-900">${ebookPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
          
          {/* Google Play */}
          <div
            onClick={() => setPaymentMethod('google-play')}
            className={`border-2 rounded-lg p-4 mb-3 cursor-pointer transition-colors ${
              paymentMethod === 'google-play'
                ? `border-${colors.primary} bg-${colors.secondary}`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-${colors.primary} rounded flex items-center justify-center`}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Google Play</p>
                  <p className="text-xs text-gray-600">Recommended & Most Secure</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                paymentMethod === 'google-play'
                  ? `border-${colors.primary} bg-${colors.primary}`
                  : 'border-gray-300'
              } flex items-center justify-center`}>
                {paymentMethod === 'google-play' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
          </div>

          {/* Credit Card (Disabled - For display only) */}
          <div className="border-2 border-gray-200 rounded-lg p-4 opacity-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Credit Card</p>
                  <p className="text-xs text-gray-600">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* License Agreement */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">License Agreement</h3>
          <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-700 max-h-32 overflow-y-auto">
            <p className="mb-2">By purchasing this e-book, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the book for personal, non-commercial purposes only</li>
              <li>Not remove DRM protection or share the book</li>
              <li>Access the book only through your licensed account</li>
              <li>Comply with copyright and intellectual property laws</li>
            </ul>
          </div>
        </div>

        {/* Account Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Licensed to: <span className="font-medium text-gray-900">{userEmail}</span></span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border-b border-red-100">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-4 flex gap-3">
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handlePurchase}
            disabled={isProcessing}
            className={`flex-1 px-4 py-3 bg-${colors.primary} text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Complete Purchase
              </>
            )}
          </button>
        </div>

        {/* Security Footer */}
        <div className="p-4 bg-gray-50 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
            <Shield className="w-4 h-4" />
            <span>PCI DSS Compliant • 256-bit SSL Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
