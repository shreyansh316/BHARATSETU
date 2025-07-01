
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Lightbulb, 
  Zap, 
  X,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useAdvancedAI } from '@/hooks/useAdvancedAI';
import { useTranslation } from '@/contexts/TranslationContext';

interface AIContextualHelpProps {
  currentPage: string;
  isVisible: boolean;
  onClose: () => void;
}

const AIContextualHelp = ({ currentPage, isVisible, onClose }: AIContextualHelpProps) => {
  const { getContextualHelp } = useAdvancedAI();
  const { t } = useTranslation();
  const contextualHelp = getContextualHelp(currentPage);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-6 w-80 z-40 animate-scale-in">
      <Card className="shadow-2xl border-2 border-purple-200 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-t-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">{t('ai_assistant')}</CardTitle>
                <p className="text-xs opacity-90">Smart Help for {contextualHelp.page}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* AI Suggestions */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <h3 className="text-sm font-semibold text-gray-800">Smart Suggestions</h3>
            </div>
            <div className="space-y-2">
              {contextualHelp.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200 cursor-pointer group"
                >
                  <Sparkles className="w-3 h-3 text-purple-500 mt-0.5 group-hover:text-blue-500" />
                  <p className="text-xs text-gray-700 group-hover:text-blue-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          {contextualHelp.quickActions.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-semibold text-gray-800">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                {contextualHelp.quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={action.action}
                    className="w-full justify-start text-xs hover:bg-purple-50 hover:border-purple-300"
                  >
                    <MessageCircle className="w-3 h-3 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* AI Status */}
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                AI Active
              </Badge>
              <p className="text-xs text-gray-500">{t('ask_anything')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContextualHelp;
