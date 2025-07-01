
import { useState, useCallback } from 'react';

export interface AIContextualHelp {
  page: string;
  suggestions: string[];
  quickActions: Array<{
    label: string;
    action: () => void;
  }>;
}

export const useAdvancedAI = () => {
  const [isAIActive, setIsAIActive] = useState(false);
  const [currentContext, setCurrentContext] = useState<string>('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const getContextualHelp = useCallback((page: string): AIContextualHelp => {
    const contextMap: Record<string, AIContextualHelp> = {
      'home': {
        page: 'Home',
        suggestions: [
          'Explore SwasthyaMitra for health concerns',
          'Check KanoonSathi for legal documents',
          'Find employment opportunities in YuvaRojgar',
          'Report civic issues through SamasyaReport'
        ],
        quickActions: [
          { label: 'Health Check', action: () => console.log('Navigate to health') },
          { label: 'Legal Help', action: () => console.log('Navigate to legal') },
          { label: 'Find Jobs', action: () => console.log('Navigate to jobs') },
          { label: 'Report Issue', action: () => console.log('Navigate to report') }
        ]
      },
      'account': {
        page: 'Account',
        suggestions: [
          'Update your profile information',
          'Manage notification preferences',
          'View your service history',
          'Check KYC verification status'
        ],
        quickActions: [
          { label: 'Edit Profile', action: () => console.log('Edit profile') },
          { label: 'Settings', action: () => console.log('Open settings') },
          { label: 'Help Center', action: () => console.log('Open help') }
        ]
      },
      'login': {
        page: 'Login',
        suggestions: [
          'Use DigiLocker for instant verification',
          'Sign in with Google for quick access',
          'Try phone OTP for secure login',
          'Need help? Contact support'
        ],
        quickActions: [
          { label: 'DigiLocker Login', action: () => console.log('DigiLocker login') },
          { label: 'Google Sign In', action: () => console.log('Google login') },
          { label: 'Phone OTP', action: () => console.log('Phone OTP') }
        ]
      }
    };

    return contextMap[page] || {
      page: 'Unknown',
      suggestions: ['Ask me anything about BharatSetu services'],
      quickActions: []
    };
  }, []);

  const activateAI = useCallback((context: string) => {
    setCurrentContext(context);
    setIsAIActive(true);
    const help = getContextualHelp(context);
    setAiSuggestions(help.suggestions);
  }, [getContextualHelp]);

  const deactivateAI = useCallback(() => {
    setIsAIActive(false);
    setCurrentContext('');
    setAiSuggestions([]);
  }, []);

  const processVoiceCommand = useCallback(async (command: string) => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses: Record<string, string> = {
      'health': 'Opening SwasthyaMitra health assistant for you',
      'legal': 'Navigating to KanoonSathi legal aid platform',
      'job': 'Loading YuvaRojgar career opportunities',
      'report': 'Opening SamasyaReport civic issue reporter',
      'account': 'Taking you to your account details',
      'help': 'How can I assist you today?'
    };

    const lowerCommand = command.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerCommand.includes(key)) {
        return response;
      }
    }

    return 'I can help you with health, legal, employment, civic issues, or account management. What would you like to do?';
  }, []);

  return {
    isAIActive,
    currentContext,
    aiSuggestions,
    activateAI,
    deactivateAI,
    getContextualHelp,
    processVoiceCommand
  };
};
