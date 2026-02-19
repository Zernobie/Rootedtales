import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import {
  ChevronDown,
  ChevronUp,
  Search,
  Mail,
  HelpCircle,
  Book,
  CreditCard,
  Download,
  Settings,
  Shield,
  Star,
  Send,
  CheckCircle2,
  Gamepad2
} from 'lucide-react';
import { User } from '../App';
import { toast } from 'sonner@2.0.3';

interface FAQSupportProps {
  user: User | null;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}

export function FAQSupport({ user }: FAQSupportProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: user?.username || '',
    email: user?.email || '',
    subject: '',
    message: '',
    category: 'general'
  });

  const faqs: FAQItem[] = [
    {
      id: '1',
      category: 'Getting Started',
      icon: <Book className="w-5 h-5" />,
      question: 'How do I start reading my first book?',
      answer: 'Navigate to the Library or Store screen, select a book you like, and tap "Read Now" to start your adventure! You can also browse our featured collections for recommendations.'
    },
    {
      id: '2',
      category: 'Getting Started',
      icon: <Book className="w-5 h-5" />,
      question: 'What is the difference between Guest and Registered accounts?',
      answer: 'Guest accounts let you explore the app with limited features. Registered accounts unlock full access including: cloud sync, achievements, personalized recommendations, purchase history, and ability to download books for offline reading.'
    },
    {
      id: '3',
      category: 'Reading',
      icon: <Book className="w-5 h-5" />,
      question: 'How do I adjust reading settings like font size and brightness?',
      answer: 'Tap the Settings icon in the top menu, then select "Book Settings". Here you can customize font size, font family, line spacing, brightness, and more to create your perfect reading experience.'
    },
    {
      id: '4',
      category: 'Reading',
      icon: <Book className="w-5 h-5" />,
      question: 'Can I read books offline?',
      answer: 'Yes! Download any purchased book by tapping the download icon on the book cover. Once downloaded, you can read it anytime without an internet connection. Manage your downloads in the Download Manager.'
    },
    {
      id: '5',
      category: 'Audio',
      icon: <Settings className="w-5 h-5" />,
      question: 'How does Text-to-Speech work?',
      answer: 'Our TTS feature reads books aloud to you. Enable it in Audio Settings, choose your preferred voice and speed, and tap the play button while reading. Perfect for listening while doing other activities!'
    },
    {
      id: '6',
      category: 'Audio',
      icon: <Settings className="w-5 h-5" />,
      question: 'Can I adjust the reading voice and speed?',
      answer: 'Absolutely! Go to Audio Settings where you can select different voices (male/female), adjust reading speed (slow, normal, fast), set auto-play preferences, and control volume levels.'
    },
    {
      id: '7',
      category: 'Purchasing',
      icon: <CreditCard className="w-5 h-5" />,
      question: 'What payment methods do you accept?',
      answer: 'We accept Credit/Debit Cards (Visa, Mastercard, Amex), Apple Pay, and Google Pay. All transactions are encrypted and secure through our payment processor.'
    },
    {
      id: '8',
      category: 'Purchasing',
      icon: <CreditCard className="w-5 h-5" />,
      question: 'Can I get a refund for a purchased book?',
      answer: 'Yes! If you\'re not satisfied with a purchase, request a refund within 14 days. Go to Account > Purchase History, select the book, and tap "Request Refund". Refunds are processed within 5-7 business days.'
    },
    {
      id: '9',
      category: 'Purchasing',
      icon: <CreditCard className="w-5 h-5" />,
      question: 'Do purchased books expire?',
      answer: 'Never! Once you purchase a book, it\'s yours forever. Access it anytime from your Library, download it for offline reading, or re-download if needed.'
    },
    {
      id: '10',
      category: 'Account',
      icon: <Shield className="w-5 h-5" />,
      question: 'How do I change my password?',
      answer: 'Go to Account Settings > Security, and tap "Change Password". Enter your current password and new password. We recommend using a strong, unique password for security.'
    },
    {
      id: '11',
      category: 'Account',
      icon: <Shield className="w-5 h-5" />,
      question: 'Can I use my account on multiple devices?',
      answer: 'Yes! Your account syncs across all devices. Sign in with your credentials on any device to access your library, bookmarks, reading progress, and preferences.'
    },
    {
      id: '12',
      category: 'Features',
      icon: <Star className="w-5 h-5" />,
      question: 'How do I earn achievements and badges?',
      answer: 'Complete reading milestones, finish books, maintain reading streaks, and explore different features! Check your Profile to see all available badges and track your progress towards unlocking them.'
    },
    {
      id: '13',
      category: 'Features',
      icon: <Gamepad2 className="w-5 h-5" />,
      question: 'What are Mini-Games and how do I access them?',
      answer: 'Mini-Games are fun educational games related to the stories! Unlock them by reading books. Access them from the main menu to test your knowledge and earn bonus rewards.'
    },
    {
      id: '14',
      category: 'Downloads',
      icon: <Download className="w-5 h-5" />,
      question: 'How much storage space do books take?',
      answer: 'Books typically range from 5-50 MB depending on illustrations and length. Check the Download Manager to see storage usage and manage your downloaded books efficiently.'
    },
    {
      id: '15',
      category: 'Downloads',
      icon: <Download className="w-5 h-5" />,
      question: 'Can I delete downloaded books and re-download them later?',
      answer: 'Yes! Delete books from the Download Manager to free up space. You can re-download any purchased book anytime from your Library at no additional cost.'
    },
    {
      id: '16',
      category: 'Technical',
      icon: <Settings className="w-5 h-5" />,
      question: 'The app is running slowly. What should I do?',
      answer: 'Try these steps: 1) Clear cached data in Settings, 2) Delete unused downloads, 3) Close other apps, 4) Restart your device, 5) Update to the latest app version. If issues persist, contact support.'
    },
    {
      id: '17',
      category: 'Technical',
      icon: <Settings className="w-5 h-5" />,
      question: 'My reading progress isn\'t syncing. Help!',
      answer: 'Ensure you\'re signed in (not using Guest mode) and have an internet connection. Go to Settings > Sync Now to manually sync. If the problem continues, sign out and back in, or contact support.'
    }
  ];

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate email sending
    setShowContactForm(false);
    setShowConfirmation(true);
    
    // Reset form
    setFormData({
      name: user?.username || '',
      email: user?.email || '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

  const ConfirmationDialog = () => (
    <AnimatePresence>
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setShowConfirmation(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-2xl p-6 max-w-md w-full shadow-2xl border-2 border-primary"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-2">Your Xenwinx Quest!</h2>
              <p className="text-lg mb-4">We got your message</p>

              <div className="bg-muted/50 rounded-lg p-4 text-left space-y-3 mb-6">
                <p className="text-sm">
                  Hey <span className="font-bold text-primary">{formData.name || 'Player'}</span>,
                </p>
                <p className="text-sm">
                  Thanks for reaching out to the Xenwinx guild! Your message has landed in our queue. 
                  We're currently off grinding through other requests, but a party member will get back to you soon.
                </p>
                <p className="text-sm">
                  <strong>For faster help:</strong> Check out our FAQ section above.
                </p>
                <div className="border-t border-border pt-3 mt-3">
                  <p className="text-xs text-muted-foreground">— The Team at Xenwinx Studios</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    P.S. What's your current main game? We're always looking for recommendations!
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>Response sent to: {formData.email || user?.email || 'your email'}</span>
                </div>
                
                <Button 
                  className="w-full mt-4"
                  onClick={() => setShowConfirmation(false)}
                >
                  Got it!
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-2"
          >
            <HelpCircle className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">
            Find answers or reach out to our guild
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Contact Support Button */}
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold">Still need help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact our support team
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    hub@xenwinx.com
                  </p>
                </div>
              </div>
              <Button onClick={() => setShowContactForm(!showContactForm)}>
                {showContactForm ? 'Close' : 'Contact'}
              </Button>
            </div>

            {/* Contact Form */}
            <AnimatePresence>
              {showContactForm && (
                <motion.form
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4 overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Name</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <select
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="general">General Question</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="account">Account Help</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Subject</label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Message</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more about how we can help..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* FAQ List */}
        <div className="space-y-3">
          <h2 className="font-bold text-xl">Frequently Asked Questions</h2>
          
          {filteredFAQs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No results found. Try a different search term or category.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFAQs.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <button
                  className="w-full text-left p-4 hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {faq.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {faq.category}
                          </Badge>
                        </div>
                        <p className="font-medium">{faq.question}</p>
                      </div>
                    </div>
                    {expandedId === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {expandedId === faq.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 pl-[60px]">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))
          )}
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Support Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-xs text-muted-foreground">Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">&lt;24h</div>
                <div className="text-xs text-muted-foreground">Response Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">Availability</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog />
    </div>
  );
}
