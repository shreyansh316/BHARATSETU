import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff, 
  Languages, 
  Settings, 
  Star,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Brain,
  Zap,
  Globe,
  MessageSquare,
  X,
  Minimize2,
  Maximize2,
  Shield
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useAdvancedAI } from '@/hooks/useAdvancedAI';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  mood?: 'helpful' | 'informative' | 'supportive' | 'analytical';
  category?: 'health' | 'legal' | 'employment' | 'civic' | 'general';
  rating?: 'up' | 'down';
  originalLanguage?: string;
}

interface AIPersonality {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

const EnhancedAIChat = () => {
  const { t, language, setLanguage, availableLanguages } = useTranslation();
  const { processVoiceCommand, getContextualHelp } = useAdvancedAI();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'नमस्ते! मैं आपका BharatSetu AI सहायक हूं। मैं स्वास्थ्य, कानूनी, नौकरी और नागरिक सेवाओं में आपकी मदद कर सकता हूं। कैसे मदद कर सकता हूं?',
      timestamp: new Date(),
      mood: 'helpful',
      category: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState('friendly');
  const [showSettings, setShowSettings] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const personalities: AIPersonality[] = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Formal and detailed responses',
      icon: Brain,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'friendly',
      name: 'Friendly',
      description: 'Warm and conversational',
      icon: Sparkles,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'enthusiastic',
      name: 'Enthusiastic',
      description: 'Energetic and motivating',
      icon: Zap,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      originalLanguage: language
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing with advanced features
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, selectedPersonality);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        mood: aiResponse.mood,
        category: aiResponse.category
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string, personality: string) => {
    const lowerInput = input.toLowerCase();
    
    // Advanced context detection
    let category: Message['category'] = 'general';
    let mood: Message['mood'] = 'helpful';
    
    if (lowerInput.includes('health') || lowerInput.includes('doctor') || lowerInput.includes('hospital')) {
      category = 'health';
      mood = 'supportive';
    } else if (lowerInput.includes('legal') || lowerInput.includes('law') || lowerInput.includes('court')) {
      category = 'legal';
      mood = 'analytical';
    } else if (lowerInput.includes('job') || lowerInput.includes('career') || lowerInput.includes('employment')) {
      category = 'employment';
      mood = 'informative';
    } else if (lowerInput.includes('report') || lowerInput.includes('issue') || lowerInput.includes('problem')) {
      category = 'civic';
      mood = 'helpful';
    }

    // Personality-based responses
    const responses = {
      professional: {
        health: 'मैं आपको SwasthyaMitra के माध्यम से व्यापक स्वास्थ्य सेवाएं प्रदान कर सकता हूं। यह AI-संचालित निदान, अस्पताल खोजने और टेलीमेडिसिन सुविधाएं प्रदान करता है।',
        legal: 'KanoonSathi आपको कानूनी सहायता प्रदान करता है। यह AI-आधारित दस्तावेज़ जेनरेशन, विशेषज्ञ परामर्श और केस ट्रैकिंग की सुविधा देता है।',
        employment: 'YuvaRojgar के माध्यम से मैं आपको करियर के अवसर खोजने में मदद कर सकता हूं। यह AI स्किल असेसमेंट और जॉब मैचिंग प्रदान करता है।',
        civic: 'SamasyaReport के द्वारा आप नागरिक समस्याओं की रिपोर्ट कर सकते हैं। यह AI-संचालित इश्यू डिटेक्शन और ट्रैकिंग प्रदान करता है।',
        general: 'मैं BharatSetu का उन्नत AI सहायक हूं। मैं आपकी सभी सरकारी सेवाओं से संबंधित आवश्यकताओं में सहायता कर सकता हूं।'
      },
      friendly: {
        health: 'अरे वाह! स्वास्थ्य की बात कर रहे हैं? SwasthyaMitra आपका बेस्ट फ्रेंड है! यह AI से लेकर डॉक्टर तक सब कुछ देता है। 😊',
        legal: 'कानूनी मदद चाहिए? कोई बात नहीं! KanoonSathi आपके साथ है। AI लॉयर से लेकर रियल एक्सपर्ट तक, सब मिलेगा! 👨‍⚖️',
        employment: 'जॉब की तलाश? बहुत बढ़िया! YuvaRojgar आपको परफेक्ट करियर मैच दिलाएगा। AI के साथ स्किल्स भी बढ़ाइए! 💼',
        civic: 'कोई समस्या है शहर में? SamasyaReport के साथ आवाज़ उठाइए! AI की मदद से आपकी बात पहुंचेगी सही जगह। 🏙️',
        general: 'हैलो फ्रेंड! मैं आपका BharatSetu बडी हूं। कुछ भी चाहिए हो - स्वास्थ्य, कानून, जॉब या कोई शिकायत, बस बताइए! 🚀'
      },
      enthusiastic: {
        health: '🔥 स्वास्थ्य पहले! SwasthyaMitra के साथ आपकी हेल्थ जर्नी शुरू करें! AI डायग्नोसिस से लेकर बेस्ट हॉस्पिटल तक, सब कुछ यहीं! 💪',
        legal: '⚡ जस्टिस की पावर! KanoonSathi के साथ अपने राइट्स को जानें! AI लॉयर + रियल एक्सपर्ट्स = परफेक्ट कॉम्बो! 🎯',
        employment: '🚀 करियर में उड़ान भरें! YuvaRojgar के साथ ड्रीम जॉब पाएं! AI पावर्ड स्किल्स + जॉब मैचिंग = सक्सेस गारंटी! 🌟',
        civic: '💥 चेंज की शुरुआत आपसे! SamasyaReport के साथ अपनी सिटी को बेहतर बनाएं! AI + एक्शन = रिजल्ट्स! 🏆',
        general: '🎉 वेलकम टू फ्यूचर! मैं आपका सुपर AI असिस्टेंट हूं! चाहे हेल्थ हो, लॉ हो, जॉब हो या कोई इश्यू - हम साथ मिलकर सॉल्व करेंगे! 🌈'
      }
    };

    return {
      content: responses[personality as keyof typeof responses][category] || responses[personality as keyof typeof responses].general,
      mood,
      category
    };
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice recognition implementation would go here
  };

  const handleMessageRating = (messageId: string, rating: 'up' | 'down') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, rating } : msg
      )
    );
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 animate-pulse"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <Card className="h-full bg-white/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden">
        {/* Enhanced Header */}
        <CardHeader className="pb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-pink-600/80 animate-pulse"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <CardTitle className="text-sm font-bold">BharatSetu AI</CardTitle>
                <p className="text-xs text-white/80">Advanced AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                AI v2.0
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-full p-0">
            {/* Settings Panel */}
            {showSettings && (
              <div className="p-4 bg-gray-50 border-b">
                <Tabs defaultValue="personality">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="personality">AI Mode</TabsTrigger>
                    <TabsTrigger value="language">Language</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personality" className="space-y-3">
                    {personalities.map((personality) => (
                      <div
                        key={personality.id}
                        onClick={() => setSelectedPersonality(personality.id)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedPersonality === personality.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${personality.color} rounded-full flex items-center justify-center`}>
                            <personality.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{personality.name}</p>
                            <p className="text-xs text-gray-600">{personality.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="language" className="space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Auto-translate</span>
                      <Button
                        variant={autoTranslate ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAutoTranslate(!autoTranslate)}
                      >
                        <Languages className="w-4 h-4 mr-1" />
                        {autoTranslate ? 'On' : 'Off'}
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {availableLanguages.slice(0, 6).map((lang) => (
                        <Button
                          key={lang}
                          variant={language === lang ? "default" : "outline"}
                          size="sm"
                          onClick={() => setLanguage(lang)}
                          className="text-xs"
                        >
                          {lang}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Voice Recognition</span>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Context Memory</span>
                        <Badge variant="secondary">Enhanced</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Multi-lingual</span>
                        <Badge variant="secondary">10+ Languages</Badge>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white border border-gray-200 shadow-sm'
                  } rounded-2xl p-3 relative group`}>
                    {message.type === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="w-4 h-4 text-purple-600" />
                        {message.mood && (
                          <Badge variant="outline" className="text-xs">
                            {message.mood}
                          </Badge>
                        )}
                        {message.category && (
                          <Badge variant="secondary" className="text-xs">
                            {message.category}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <p className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                      {message.content}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${message.type === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      
                      {message.type === 'ai' && (
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(message.content)}
                            className="h-6 w-6 p-0 hover:bg-gray-100"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMessageRating(message.id, 'up')}
                            className={`h-6 w-6 p-0 hover:bg-green-100 ${message.rating === 'up' ? 'text-green-600' : ''}`}
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMessageRating(message.id, 'down')}
                            className={`h-6 w-6 p-0 hover:bg-red-100 ${message.rating === 'down' ? 'text-red-600' : ''}`}
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <Separator />

            {/* Enhanced Input Area */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center space-x-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex-1"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  AI Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleVoiceToggle}
                  className={`${isListening ? 'bg-red-50 border-red-300' : ''}`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAutoTranslate(!autoTranslate)}
                  className={`${autoTranslate ? 'bg-blue-50 border-blue-300' : ''}`}
                >
                  <Languages className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about BharatSetu services..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
                  />
                  {isListening && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center justify-center mt-2 space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <Globe className="w-3 h-3 mr-1" />
                  Multi-lingual
                </span>
                <span className="flex items-center">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Powered
                </span>
                <span className="flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure
                </span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default EnhancedAIChat;
