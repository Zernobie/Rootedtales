import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User } from '../App';
import { 
  Check, 
  X, 
  Crown, 
  Headphones,
  BookOpen,
  Gamepad2,
  Users,
  Sparkles,
  ShieldOff,
  Gift,
  Star,
  Volume2,
  Download
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import akaiClubIcon from 'figma:asset/c93be1fc85939baa10b7cab9649cebd186655436.png';

interface SubscriptionComparisonProps {
  user: User | null;
  onSelectPlan?: (planId: string) => void;
}

export function SubscriptionComparison({ user, onSelectPlan }: SubscriptionComparisonProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const features = [
    {
      category: 'Content Access',
      items: [
        { name: 'Sample Chapters', free: true, premium: false, premiumPlus: false, icon: BookOpen },
        { name: 'Full Ebook Library (All 12 Books)', free: false, premium: true, premiumPlus: true, icon: BookOpen },
        { name: 'All Mini-Games & Badges', free: '1 Game Only', premium: true, premiumPlus: true, icon: Gamepad2 },
        { name: 'Character Lore & Extras', free: 'Limited', premium: true, premiumPlus: true, icon: Users },
        { name: 'Audiobook Library', free: 'Previews Only', premium: false, premiumPlus: true, icon: Headphones },
        { name: 'Read-Along Mode', free: false, premium: false, premiumPlus: true, icon: Volume2 }
      ]
    },
    {
      category: 'Experience',
      items: [
        { name: 'In-App Ads', free: true, premium: false, premiumPlus: false, icon: ShieldOff, reverse: true },
        { name: 'Premium Audio Quality', free: false, premium: false, premiumPlus: true, icon: Sparkles },
        { name: 'Offline Downloads', free: false, premium: false, premiumPlus: true, icon: Download }
      ]
    },
    {
      category: 'Perks & Benefits',
      items: [
        { name: 'Store Discounts (25% Off Physical Books)', free: false, premium: true, premiumPlus: true, icon: Gift },
        { name: 'Priority Support', free: false, premium: true, premiumPlus: true, icon: Star },
        { name: 'Early Access to New Releases', free: false, premium: true, premiumPlus: true, icon: Sparkles }
      ]
    }
  ];

  const plans = [
    {
      id: 'free',
      name: 'Free Tier',
      icon: '📖',
      color: 'from-gray-400 to-gray-500',
      monthlyPrice: 'Free',
      yearlyPrice: 'Free',
      description: 'Try sample content and explore the app',
      cta: 'Current Plan',
      features: ['Sample chapters', '1 mini-game', 'Limited content'],
      highlight: false
    },
    {
      id: 'premium',
      name: "Akai's Adventure Club",
      subtitle: 'Premium',
      icon: '⭐',
      color: 'from-yellow-400 to-orange-500',
      monthlyPrice: '$4.99',
      yearlyPrice: '$34.99',
      yearlySavings: 'Save 40%',
      description: 'Unlimited ebooks, games, and exclusive content',
      cta: 'Start 7-Day FREE Trial',
      productIds: {
        monthly: 'club_premium_monthly',
        annual: 'club_premium_annual'
      },
      features: [
        'All 12 ebooks unlocked',
        'All mini-games & badges',
        'Character lore & extras',
        'Ad-free experience',
        '25% off physical books',
        'Priority support'
      ],
      highlight: true
    },
    {
      id: 'premium_plus',
      name: "Akai's Adventure Club",
      subtitle: 'Premium+',
      icon: '🎧',
      color: 'from-purple-400 to-pink-500',
      monthlyPrice: '$6.99',
      yearlyPrice: '$49.99',
      yearlySavings: 'Save 40%',
      description: 'Everything in Premium + Full Audiobook Library',
      cta: 'Start 7-Day FREE Trial',
      productIds: {
        monthly: 'club_premiumplus_monthly',
        annual: 'club_premiumplus_annual'
      },
      features: [
        '✨ Everything in Premium',
        'Full audiobook library',
        'Unlimited streaming',
        'Offline downloads',
        'Read-along mode',
        'Premium audio quality'
      ],
      highlight: false
    }
  ];

  const renderFeatureValue = (feature: any, tier: 'free' | 'premium' | 'premiumPlus') => {
    const value = tier === 'free' ? feature.free : tier === 'premium' ? feature.premium : feature.premiumPlus;
    
    if (typeof value === 'boolean') {
      if (feature.reverse) {
        // For negative features like "In-App Ads"
        return value ? (
          <X className="w-3 h-3 text-red-500 mx-auto" />
        ) : (
          <Check className="w-3 h-3 text-green-500 mx-auto" />
        );
      }
      return value ? (
        <Check className="w-3 h-3 text-green-500 mx-auto" />
      ) : (
        <X className="w-3 h-3 text-gray-300 mx-auto" />
      );
    }
    
    return <span className="text-[9px] text-center text-muted-foreground block">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-3 overflow-y-auto pb-24">
      <div className="max-w-[385px] mx-auto space-y-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          {/* Akai Icon */}
          <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-2 border-yellow-400">
            <ImageWithFallback
              src={akaiClubIcon}
              alt="Akai's Adventure Club"
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-xl font-bold text-green-800 mb-1">
            Join Akai's Adventure Club!
          </h1>
          <p className="text-xs text-muted-foreground mb-3">
            Unlock all books, games & badges
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 bg-white p-0.5 rounded-full shadow-md text-xs">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('monthly')}
              className="rounded-full h-7 px-3 text-xs"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('yearly')}
              className="rounded-full h-7 px-3 text-xs"
            >
              Yearly
              <Badge className="ml-1 bg-green-500 text-white text-[10px] px-1">Save 40%</Badge>
            </Button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="space-y-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative overflow-hidden ${plan.highlight ? 'ring-2 ring-yellow-400 shadow-xl' : ''}`}>
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 text-[10px] font-bold rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                
                <CardHeader className="text-center pb-2 pt-3 px-3">
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-sm mb-0.5">{plan.name}</CardTitle>
                  {plan.subtitle && (
                    <p className="text-xs text-muted-foreground font-bold">{plan.subtitle}</p>
                  )}
                  <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{plan.description}</p>
                </CardHeader>

                <CardContent className="text-center space-y-2 px-3 pb-3">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </div>
                    {plan.yearlySavings && billingCycle === 'yearly' && (
                      <Badge className="mt-1 bg-green-500 text-white text-[10px]">
                        {plan.yearlySavings}
                      </Badge>
                    )}
                    {billingCycle === 'yearly' && plan.id !== 'free' && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">per year</p>
                    )}
                    {billingCycle === 'monthly' && plan.id !== 'free' && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">per month</p>
                    )}
                  </div>

                  <ul className="space-y-1 text-left text-[11px]">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full h-8 text-xs ${plan.highlight ? `bg-gradient-to-r ${plan.color} text-white hover:opacity-90` : ''}`}
                    variant={plan.highlight ? 'default' : 'outline'}
                    onClick={() => onSelectPlan && onSelectPlan(plan.id)}
                    disabled={plan.id === 'free'}
                  >
                    {plan.cta}
                  </Button>

                  {plan.id !== 'free' && (
                    <p className="text-[10px] text-muted-foreground">
                      🎁 7-Day Free Trial · Cancel Anytime
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-2 px-3 pt-3">
              <CardTitle className="text-center text-sm">Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto px-2 pb-3">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-bold">Feature</th>
                    <th className="text-center p-2 font-bold text-[9px]">Free</th>
                    <th className="text-center p-2 font-bold bg-yellow-50 text-[9px]">Premium</th>
                    <th className="text-center p-2 font-bold text-[9px]">Premium+</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((category, catIndex) => (
                    <React.Fragment key={catIndex}>
                      <tr className="bg-gray-50">
                        <td colSpan={4} className="p-2 font-bold text-[10px] text-gray-700">
                          {category.category}
                        </td>
                      </tr>
                      {category.items.map((feature, featIndex) => {
                        const Icon = feature.icon;
                        return (
                          <tr key={featIndex} className="border-b hover:bg-gray-50">
                            <td className="p-2 flex items-center">
                              <Icon className="w-3 h-3 mr-1 text-gray-500 flex-shrink-0" />
                              <span className="text-[10px] leading-tight">{feature.name}</span>
                            </td>
                            <td className="p-2 text-center">
                              {renderFeatureValue(feature, 'free')}
                            </td>
                            <td className="p-2 text-center bg-yellow-50">
                              {renderFeatureValue(feature, 'premium')}
                            </td>
                            <td className="p-2 text-center">
                              {renderFeatureValue(feature, 'premiumPlus')}
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>

        {/* App Store Copy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader className="pb-2 px-3 pt-3">
              <CardTitle className="text-center text-sm">Subscription Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-[11px] px-3 pb-3">
              <div>
                <h4 className="font-bold mb-1 text-xs">🌟 Unlock the Full World of Akai!</h4>
                <p className="text-muted-foreground leading-tight">
                  Join Akai's Adventure Club for unlimited access to magical stories, exciting games, and exclusive content.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-1 text-xs">📱 Subscription Plans:</h4>
                <ul className="space-y-1 text-muted-foreground leading-tight">
                  <li><strong>Premium</strong> - $4.99/mo or $34.99/yr (Save 40%)</li>
                  <li><strong>Premium+</strong> - $6.99/mo or $49.99/yr (Save 40%)</li>
                  <li>🎁 FREE 7-day trial · 📚 Keep purchased ebooks</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-1 text-xs">✨ Premium Benefits:</h4>
                <ul className="space-y-0.5 text-muted-foreground leading-tight">
                  <li>• All 12 ebooks · All games & badges</li>
                  <li>• Character lore & extras · Ad-free</li>
                  <li>• 25% off physical books · Priority support</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-1 text-xs">🎧 Premium+ Extras:</h4>
                <ul className="space-y-0.5 text-muted-foreground leading-tight">
                  <li>• Full audiobook library (all 12 books)</li>
                  <li>• Unlimited streaming · Offline downloads</li>
                  <li>• Read-along mode · Premium audio quality</li>
                </ul>
              </div>

              <div className="text-[9px] text-muted-foreground pt-2 border-t">
                <p className="mb-1">
                  <strong>Subscription Details:</strong>
                </p>
                <ul className="space-y-0.5 leading-tight">
                  <li>• Payment charged at confirmation · Auto-renews unless canceled 24hrs before period ends</li>
                  <li>• Manage in Account Settings · Unused trial forfeited when purchased</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}