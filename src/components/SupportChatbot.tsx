import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Bot, Send, User as UserIcon, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface SupportChatbotProps {
  onClose?: () => void;
}

export function SupportChatbot({ onClose }: SupportChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm Akai, your reading companion! 🐼 How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const chatbotResponses: Record<string, string> = {
    // General greetings
    'hello': "Hello! Welcome to Rooted Tales! How can I assist you today? 🌟",
    'hi': "Hi there! I'm here to help with any questions about the app! 🐼",
    'hey': "Hey! What would you like to know about Rooted Tales?",
    
    // Account & Login
    'account': "For account help: You can manage your account in Account Settings. Need to reset password? Use the 'Forgot Password' option on the login screen.",
    'login': "To log in: Tap 'Sign In' on the home screen, enter your email and password. You can also use Google or Facebook login!",
    'password': "Forgot your password? On the login screen, tap 'Forgot Password' and follow the email instructions. Or contact hub@xenwinx.com for help!",
    'sign up': "To create an account: Tap 'Sign In' then 'Create Account'. Enter your email, username, and password. It's free to start!",
    'profile': "You can edit your profile in the Profile section! Change your avatar, theme, and see your reading stats. 📊",
    
    // Books & Reading
    'books': "We have 12+ amazing stories featuring Akai the Red Panda and friends! Browse the Library or Store to explore all books.",
    'download': "To download a book: 1) Purchase the book in the Store, 2) It auto-downloads to your Library, 3) Read offline anytime! 📚",
    'read': "Start reading by: 1) Go to Library, 2) Tap a book cover, 3) Tap 'Start Reading'. Use swipe to turn pages!",
    'audio': "Audiobooks available! Purchase a book → Open book details → Tap 'Download Audio'. Then enjoy professional narration! 🎧",
    'text to speech': "Text-to-Speech (TTS): Go to Audio Settings → Enable TTS → Adjust voice, speed, and pitch. Free for all books!",
    
    // Membership & Payments
    'membership': "Membership tiers: FREE (3 books/month), PREMIUM ($4.99 - unlimited books), FAMILY ($9.99 - 5 accounts). Upgrade in Store!",
    'subscribe': "To subscribe: Go to Store → Rooted Tales Adventure Club → Choose Premium or Family → Complete payment. Cancel anytime!",
    'payment': "We accept: Credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted. 💳",
    'cancel': "Cancel subscription: Account Settings → Manage Subscription → Cancel. You keep access until period ends.",
    'refund': "Refund requests: Email hub@xenwinx.com within 7 days with order details. We'll process it quickly!",
    
    // Features
    'levels': "Levels track your reading! Earn XP by: Reading books (+100), Playing games (+25), Daily login (+50). Level up every 500 XP! 🎯",
    'badges': "Earn badges by completing achievements! View all badges in Badge Collection. Unlock special rewards!",
    'rewards': "Daily rewards: Login every day for coins and bonuses! Streaks give bigger rewards. Day 7 = special badge! 🎁",
    'games': "Mini games: Memory Match, Story Trivia, Word Puzzle. Play to earn XP and have fun! Find them in the menu.",
    'themes': "4 themes available: Forest 🌲, Ocean 🌊, Sunset 🌅, Night 🌙. Change in Theme Selection to match your mood!",
    
    // Settings
    'settings': "Settings are in: Audio Settings (voice, sounds), Reading Settings (font, sleep timer), and Account Settings (privacy, profile).",
    'timer': "Sleep Timer: Reading Settings → Set duration (15min-2hrs) → Auto-pause at bedtime. Perfect for kids! 😴",
    'font': "Change font size: Reading Settings → Display → Font Size → Choose Small/Medium/Large. Preview updates live!",
    'notifications': "Manage notifications: Account Settings → Privacy → Toggle each notification type on/off.",
    
    // Troubleshooting
    'help': "I'm here to help! Ask me about: books, account, membership, downloading, settings, games, or anything else!",
    'problem': "Having an issue? Try: 1) Restart the app, 2) Check internet connection, 3) Update to latest version. Still stuck? Email hub@xenwinx.com",
    'bug': "Found a bug? Please report it to hub@xenwinx.com with: What happened, which page, device type. Thank you! 🐛",
    'slow': "App running slow? Try: 1) Close other apps, 2) Clear app cache, 3) Restart device. Check your internet speed too!",
    'crash': "App crashing? Sorry about that! Email hub@xenwinx.com with: When it crashes, what you were doing, device model.",
    
    // Company
    'xenwinx': "Rooted Tales is created by Xenwinx Studios! Visit xenwinx.com or follow @Xenwinx7 on Instagram!",
    'contact': "Contact us at hub@xenwinx.com for support, feedback, or questions. We respond within 24 hours! 📧",
    'email': "Email support: hub@xenwinx.com - We're here to help Monday-Friday, 9AM-5PM EST. ✉️",
    
    // Thanks
    'thank': "You're very welcome! Happy reading! 📚✨ Let me know if you need anything else!",
    'thanks': "My pleasure! Enjoy your reading adventures! 🐼",
    
    // Default
    'default': "I'm not sure about that! Try asking about: books, account, membership, downloading, settings, or games. Or email hub@xenwinx.com for help!"
  };

  const quickQuestions = [
    "How do I download books?",
    "What's included in membership?",
    "How do levels work?",
    "How to use sleep timer?",
    "How do I earn badges?",
    "Contact support email?"
  ];

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();
    
    // Check for exact or partial matches
    for (const [key, response] of Object.entries(chatbotResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    return chatbotResponses['default'];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot "thinking" time
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay 1-2 seconds
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col border-2 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-500" />
            </div>
            Akai Assistant
          </CardTitle>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        <p className="text-xs text-blue-100 mt-1">
          Ask me anything about Rooted Tales! 🐼
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="p-3 border-b bg-blue-50/50">
            <p className="text-xs font-medium text-blue-900 mb-2">
              Quick Questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(q)}
                  className="text-xs h-7 border-blue-200 hover:bg-blue-100"
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: '100%' }}>
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'bot'
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      : 'bg-gradient-to-br from-green-500 to-emerald-500'
                  }`}
                >
                  {message.type === 'bot' ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.type === 'bot'
                      ? 'bg-blue-100 text-blue-900 rounded-tl-none'
                      : 'bg-green-500 text-white rounded-tr-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === 'bot'
                        ? 'text-blue-600/60'
                        : 'text-white/60'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-blue-100 rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Scroll to bottom anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            For complex issues, email{' '}
            <a
              href="mailto:hub@xenwinx.com"
              className="text-blue-600 hover:underline"
            >
              hub@xenwinx.com
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
