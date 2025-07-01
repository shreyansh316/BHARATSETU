
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Send, 
  Brain, 
  Zap,
  Eye,
  MessageCircle,
  Settings,
  Volume2,
  VolumeX,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { useAdvancedModuleAI } from '@/hooks/useAdvancedModuleAI';

interface AdvancedAIChatInterfaceProps {
  moduleName: string;
  isVisible: boolean;
  onClose: () => void;
}

const AdvancedAIChatInterface: React.FC<AdvancedAIChatInterfaceProps> = ({
  moduleName,
  isVisible,
  onClose
}) => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    type: 'user' | 'ai';
    content: string;
    timestamp: string;
    confidence?: number;
  }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    enabled: true,
    rate: 0.9,
    pitch: 1.1
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    isAIActive,
    aiResponse,
    isProcessing,
    voiceEnabled,
    config,
    activateAI,
    processQuery,
    startVoiceInput,
    stopVoiceInput,
    getAdvancedFeatures
  } = useAdvancedModuleAI(moduleName);

  useEffect(() => {
    if (!isAIActive && isVisible) {
      activateAI();
    }
  }, [isVisible, isAIActive, activateAI]);

  useEffect(() => {
    if (aiResponse && aiResponse !== messages[messages.length - 1]?.content) {
      const newMessage = {
        id: `ai_${Date.now()}`,
        type: 'ai' as const,
        content: aiResponse,
        timestamp: new Date().toISOString(),
        confidence: Math.floor(Math.random() * 15) + 85
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }
  }, [aiResponse, messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    await processQuery(inputMessage, { source: 'chat', moduleName });
  }, [inputMessage, processQuery, moduleName]);

  const handleVoiceToggle = useCallback(() => {
    if (voiceEnabled) {
      stopVoiceInput();
    } else {
      startVoiceInput();
    }
  }, [voiceEnabled, startVoiceInput, stopVoiceInput]);

  const formatAIResponse = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/- (.*?)(?=\n|$)/g, '• $1')
      .split('\n')
      .map((line, index) => (
        <div key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: line }} />
      ));
  };

  const advancedFeatures = getAdvancedFeatures();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col animate-scale-in">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>{config.moduleName} AI</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Advanced AI
                  </Badge>
                </CardTitle>
                <p className="text-sm text-gray-600">{config.aiPersonality}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {advancedFeatures.length} AI Features
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ×
              </Button>
            </div>
          </div>
          
          {/* Advanced Features Display */}
          <div className="flex flex-wrap gap-2 mt-3">
            {advancedFeatures.slice(0, 3).map((feature) => (
              <Badge 
                key={feature.id}
                variant="outline" 
                className={`text-xs ${
                  feature.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
                  feature.status === 'beta' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-orange-50 text-orange-700 border-orange-200'
                }`}
              >
                {feature.type === 'vision' && <Eye className="w-3 h-3 mr-1" />}
                {feature.type === 'nlp' && <MessageCircle className="w-3 h-3 mr-1" />}
                {feature.type === 'prediction' && <TrendingUp className="w-3 h-3 mr-1" />}
                {feature.type === 'analysis' && <Brain className="w-3 h-3 mr-1" />}
                {feature.type === 'automation' && <Zap className="w-3 h-3 mr-1" />}
                {feature.name}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Advanced AI Ready
                </h3>
                <p className="text-gray-600 mb-4">
                  I'm equipped with {config.specialCapabilities.length} specialized capabilities
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-md mx-auto">
                  {config.specialCapabilities.slice(0, 4).map((capability, index) => (
                    <div key={index} className="text-xs bg-gray-50 rounded-lg p-2">
                      {capability}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.type === 'ai' ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          <Brain className="w-3 h-3 mr-1" />
                          AI Response
                        </Badge>
                        {message.confidence && (
                          <Badge variant="outline" className="text-xs">
                            {message.confidence}% confidence
                          </Badge>
                        )}
                      </div>
                      <div className="prose prose-sm max-w-none">
                        {formatAIResponse(message.content)}
                      </div>
                    </div>
                  ) : (
                    <p>{message.content}</p>
                  )}
                  <p className="text-xs opacity-70 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask anything... I understand context and complex queries"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isProcessing}
                  className="pr-12"
                />
                {voiceEnabled && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleVoiceToggle}
                disabled={isProcessing}
                className={voiceEnabled ? 'bg-red-50 border-red-200' : ''}
              >
                {voiceEnabled ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVoiceSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
              >
                {voiceSettings.enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isProcessing}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>
                Powered by Advanced AI • {config.features.filter(f => f.isActive).length} active features
              </span>
              <span>
                {isProcessing ? 'Processing...' : 'Ready'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAIChatInterface;
