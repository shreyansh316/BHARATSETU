
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Bot,
  User,
  X,
  Minimize2,
  Languages,
  Sparkles,
  Brain,
  Zap,
  Globe,
  RefreshCw,
  Settings,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

interface Message {
  id: string;
  text: string;
  translatedText?: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: 'helpful' | 'enthusiastic' | 'professional' | 'friendly';
  category?: 'health' | 'legal' | 'employment' | 'civic' | 'general';
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! I am your BharatSetu AI assistant with advanced multilingual capabilities. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
      mood: 'friendly',
      category: 'general'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [aiPersonality, setAiPersonality] = useState<'professional' | 'friendly' | 'enthusiastic'>('friendly');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, availableLanguages } = useTranslation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIPersonalityGreeting = () => {
    const greetings = {
      professional: "Good day! I'm your professional BharatSetu AI assistant. How may I assist you with our services today?",
      friendly: "Hey there! 😊 I'm your friendly BharatSetu AI companion. What can I help you with?",
      enthusiastic: "Hello and welcome! 🎉 I'm absolutely thrilled to be your BharatSetu AI assistant today! What exciting thing can we work on together?"
    };
    return greetings[aiPersonality];
  };

  const translateText = async (text: string, targetLang: string): Promise<string> => {
    // Simulate advanced translation with context awareness
    if (targetLang === 'English') return text;
    
    // Mock translation with enhanced context
    const translations: Record<string, Record<string, string>> = {
      'हिंदी': {
        'health': 'स्वास्थ्य',
        'legal': 'कानूनी',
        'employment': 'रोजगार',
        'civic': 'नागरिक',
        'How can I help you': 'मैं आपकी कैसे मदद कर सकता हूं',
        'Thank you': 'धन्यवाद'
      }
    };
    
    return translations[targetLang]?.[text] || `[${targetLang}] ${text}`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate advanced AI processing with context awareness
    setTimeout(async () => {
      const aiResponse = await generateAdvancedAIResponse(inputText);
      const translatedResponse = autoTranslate && targetLanguage !== 'English' 
        ? await translateText(aiResponse.text, targetLanguage)
        : undefined;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        translatedText: translatedResponse,
        sender: 'ai',
        timestamp: new Date(),
        mood: aiResponse.mood,
        category: aiResponse.category
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAdvancedAIResponse = async (userInput: string): Promise<{text: string, mood: Message['mood'], category: Message['category']}> => {
    const input = userInput.toLowerCase();
    
    // Advanced context detection
    if (input.includes('health') || input.includes('medical') || input.includes('doctor')) {
      return {
        text: getPersonalizedResponse('health'),
        mood: 'professional',
        category: 'health'
      };
    } else if (input.includes('legal') || input.includes('law') || input.includes('court')) {
      return {
        text: getPersonalizedResponse('legal'),
        mood: 'professional', 
        category: 'legal'
      };
    } else if (input.includes('job') || input.includes('career') || input.includes('employment')) {
      return {
        text: getPersonalizedResponse('employment'),
        mood: 'enthusiastic',
        category: 'employment'
      };
    } else if (input.includes('report') || input.includes('complaint') || input.includes('civic')) {
      return {
        text: getPersonalizedResponse('civic'),
        mood: 'helpful',
        category: 'civic'
      };
    }
    
    return {
      text: getPersonalizedResponse('general'),
      mood: aiPersonality === 'professional' ? 'professional' : 'friendly',
      category: 'general'
    };
  };

  const getPersonalizedResponse = (category: string): string => {
    const responses = {
      professional: {
        health: "I can connect you with our SwasthyaMitra health module for professional medical guidance and health services.",
        legal: "Our KanoonSathi legal platform provides comprehensive legal assistance and document services.",
        employment: "YuvaRojgar offers extensive career opportunities and professional development resources.",
        civic: "SamasyaReport enables efficient civic issue reporting with photographic documentation.",
        general: "I'm here to provide professional assistance with all BharatSetu services."
      },
      friendly: {
        health: "Let me help you with health-related queries through our SwasthyaMitra module! It's really helpful for medical guidance.",
        legal: "Need legal help? Our KanoonSathi platform is perfect for that! It has lots of useful legal resources.",
        employment: "Looking for career opportunities? YuvaRojgar is amazing for finding jobs and skill development!",
        civic: "Want to report a civic issue? SamasyaReport makes it super easy with photo uploads!",
        general: "I'm here to help you navigate through all our awesome BharatSetu services!"
      },
      enthusiastic: {
        health: "Fantastic! Our SwasthyaMitra health assistant is incredible for all health-related needs! Let's get you connected!",
        legal: "Excellent choice! KanoonSathi is an amazing legal platform that will solve all your legal queries beautifully!",
        employment: "Wonderful! YuvaRojgar is the perfect place to supercharge your career journey! So many opportunities await!",
        civic: "Great initiative! SamasyaReport is a powerful tool for making positive changes in your community!",
        general: "Amazing! I'm absolutely excited to help you explore all the fantastic BharatSetu services!"
      }
    };
    
    return responses[aiPersonality][category as keyof typeof responses.professional] || responses[aiPersonality].general;
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  const toggleSpeaker = () => {
    setIsSpeaking(!isSpeaking);
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getMoodEmoji = (mood?: Message['mood']) => {
    const emojis = {
      helpful: '🤝',
      enthusiastic: '🎉',
      professional: '💼',
      friendly: '😊'
    };
    return mood ? emojis[mood] : '🤖';
  };

  const getCategoryColor = (category?: Message['category']) => {
    const colors = {
      health: 'bg-green-100 text-green-800',
      legal: 'bg-blue-100 text-blue-800',
      employment: 'bg-purple-100 text-purple-800',
      civic: 'bg-orange-100 text-orange-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return category ? colors[category] : colors.general;
  };

  return (
    <>
      {/* Enhanced Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="relative">
            <Button
              onClick={() => setIsOpen(true)}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-pulse border-4 border-white/20"
              size="icon"
            >
              <div className="relative">
                <MessageCircle className="w-10 h-10 text-white" />
                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-spin" />
              </div>
            </Button>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[420px] h-[700px] z-50 animate-scale-in">
          <Card className="h-full shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl overflow-hidden">
            {/* Enhanced Header */}
            <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <Bot className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">BharatSetu AI</CardTitle>
                      <p className="text-sm opacity-90 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        Advanced Multilingual Assistant
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSettings(!showSettings)}
                      className="text-white hover:bg-white/20 rounded-full"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 rounded-full"
                    >
                      <Minimize2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                  <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div>
                        <label className="block text-xs font-medium mb-1">AI Personality</label>
                        <Select value={aiPersonality} onValueChange={(value: any) => setAiPersonality(value)}>
                          <SelectTrigger className="h-8 bg-white/20 border-white/30 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">💼 Professional</SelectItem>
                            <SelectItem value="friendly">😊 Friendly</SelectItem>
                            <SelectItem value="enthusiastic">🎉 Enthusiastic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Translation Language</label>
                        <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                          <SelectTrigger className="h-8 bg-white/20 border-white/30 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {availableLanguages.map(lang => (
                              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="flex flex-col h-full p-0">
              {/* Enhanced Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-blue-50/20">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                          : 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl p-4 shadow-lg backdrop-blur-sm border ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-200'
                          : 'bg-white/90 text-gray-800 border-gray-200'
                      }`}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed">{message.translatedText || message.text}</p>
                            {message.translatedText && (
                              <p className="text-xs opacity-70 mt-2 italic">Original: {message.text}</p>
                            )}
                          </div>
                          {message.sender === 'ai' && (
                            <div className="flex flex-col items-end space-y-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyMessage(message.text)}
                                className="h-6 w-6 p-0 hover:bg-black/10"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-black/10">
                                  <ThumbsUp className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-black/10">
                                  <ThumbsDown className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <p className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                            {message.category && (
                              <Badge className={`text-xs px-2 py-0.5 ${getCategoryColor(message.category)}`}>
                                {message.category}
                              </Badge>
                            )}
                          </div>
                          {message.mood && (
                            <span className="text-sm">{getMoodEmoji(message.mood)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/90 rounded-2xl p-4 shadow-lg backdrop-blur-sm border border-gray-200">
                        <div className="flex space-x-2 items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <span className="text-xs text-gray-600 ml-2">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input Area */}
              <div className="p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-t border-gray-200/50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAutoTranslate(!autoTranslate)}
                      className={`h-8 text-xs ${autoTranslate ? 'bg-purple-100 text-purple-700 border-purple-300' : ''}`}
                    >
                      <Languages className="w-3 h-3 mr-1" />
                      Auto Translate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newGreeting = {
                          id: Date.now().toString(),
                          text: getAIPersonalityGreeting(),
                          sender: 'ai' as const,
                          timestamp: new Date(),
                          mood: aiPersonality === 'professional' ? 'professional' as const : 'friendly' as const,
                          category: 'general' as const
                        };
                        setMessages(prev => [...prev, newGreeting]);
                      }}
                      className="h-8 text-xs"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      New Chat
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1 flex items-center space-x-2 bg-white/80 rounded-full border-2 border-purple-200/50 px-4 py-3 shadow-lg backdrop-blur-sm">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me anything about BharatSetu services..."
                      className="flex-1 outline-none text-sm bg-transparent placeholder-gray-500"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleVoice}
                      className={`rounded-full h-8 w-8 p-0 ${isListening ? "text-red-500 bg-red-50" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSpeaker}
                      className={`rounded-full h-8 w-8 p-0 ${isSpeaking ? "text-blue-500 bg-blue-50" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                      {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg h-12 w-12 p-0"
                    size="sm"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="flex justify-center mt-3">
                  <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Advanced AI powered by BharatSetu
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AIChat;
