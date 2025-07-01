
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Mic, 
  MicOff, 
  X,
  Sparkles, 
  Bot, 
  Zap,
  TrendingUp,
  Filter,
  ArrowRight,
  Brain,
  History,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MobileOptimizedSearchProps {
  onSearch: (query: string) => void;
  isFullScreen?: boolean;
  onClose?: () => void;
}

const MobileOptimizedSearch: React.FC<MobileOptimizedSearchProps> = ({ 
  onSearch, 
  isFullScreen = false,
  onClose 
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Health symptoms check', 'Legal document help', 'Job opportunities', 'Report issue'
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const smartSuggestions = [
    { text: 'Find doctors near me', module: 'swasthya-mitra', category: 'Health', icon: '🏥' },
    { text: 'Legal aid help', module: 'kanoon-sathi', category: 'Legal', icon: '⚖️' },
    { text: 'Government jobs', module: 'yuva-rojgar', category: 'Employment', icon: '💼' },
    { text: 'Report civic issue', module: 'samasya-report', category: 'Civic', icon: '🏛️' },
    { text: 'AI study classes', module: 'pathshaala-plus', category: 'Education', icon: '📚' },
    { text: 'Farming assistance', module: 'krishi-bandhu', category: 'Agriculture', icon: '🌾' },
    { text: 'Accessibility map', module: 'able-access-map', category: 'Accessibility', icon: '♿' },
  ];

  const categories = ['All', 'Health', 'Legal', 'Employment', 'Civic', 'Education', 'Agriculture', 'Accessibility'];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleSearch(transcript);
      };

      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
    }
  }, []);

  const handleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "Voice Search Active",
          description: "Speak now...",
        });
      } else {
        toast({
          title: "Voice Search Unavailable",
          description: "Voice search not supported in this browser",
          variant: "destructive"
        });
      }
    }
  };

  const processWithAI = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const matchedSuggestion = smartSuggestions.find(s => 
        s.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery.toLowerCase().includes(s.text.toLowerCase().split(' ')[0])
      );

      if (matchedSuggestion) {
        navigate(`/${matchedSuggestion.module}`);
        toast({
          title: "Smart Navigation",
          description: `Redirecting to ${matchedSuggestion.text}`,
        });
      }
    } catch (error) {
      console.error('AI processing error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setRecentSearches(prev => [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 4));
      setShowSuggestions(false);
      await processWithAI(searchQuery);
    }
  };

  const updateSuggestions = (value: string) => {
    if (value.length > 1) {
      const filtered = smartSuggestions.filter(suggestion => {
        const matchesText = suggestion.text.toLowerCase().includes(value.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || suggestion.category === selectedCategory;
        return matchesText && matchesCategory;
      });
      setSuggestions(filtered.map(s => s.text).slice(0, 6));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    updateSuggestions(value);
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const SearchContainer = ({ children }: { children: React.ReactNode }) => {
    if (isFullScreen) {
      return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Smart Search</h2>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      );
    }
    return <div className="w-full">{children}</div>;
  };

  return (
    <SearchContainer>
      <div className="p-4 space-y-4">
        {/* Mobile-Optimized Search Bar */}
        <div className="relative">
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
            {/* Category Filter - Mobile Optimized */}
            <div className="flex items-center space-x-2 p-3 border-b border-gray-100 overflow-x-auto">
              <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="flex space-x-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap text-xs flex-shrink-0 ${
                      selectedCategory === category 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Search Input - Mobile Optimized */}
            <div className="flex items-center p-4 space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex-shrink-0">
                <Search className="w-5 h-5 text-white" />
              </div>
              
              <Input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything..."
                value={query}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="border-0 bg-transparent placeholder:text-gray-500 focus:ring-0 text-base font-medium flex-1"
                onFocus={() => setShowSuggestions(true)}
              />
              
              {isLoading && (
                <Brain className="w-5 h-5 animate-spin text-blue-500 flex-shrink-0" />
              )}
              
              {/* Voice Search - Mobile Optimized */}
              <Button
                type="button"
                onClick={handleVoiceSearch}
                size="sm"
                className={`rounded-full w-10 h-10 p-0 flex-shrink-0 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Voice Listening Indicator */}
        {isListening && (
          <Card className="p-4 bg-red-50 border-red-200 animate-pulse">
            <div className="flex items-center justify-center space-x-3 text-red-600">
              <Mic className="w-5 h-5 animate-bounce" />
              <span className="text-base font-semibold">Listening... Speak now</span>
            </div>
          </Card>
        )}

        {/* Mobile-Optimized Suggestions */}
        {showSuggestions && (
          <Card className="bg-white/98 backdrop-blur-xl border-2 border-gray-200 shadow-xl">
            <CardContent className="p-4">
              {query.length > 1 ? (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Bot className="w-5 h-5 text-blue-500" />
                    <span className="text-base font-semibold text-gray-800">AI Suggestions</span>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Smart
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => selectSuggestion(suggestion)}
                        className="flex items-center justify-between p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl cursor-pointer transition-all duration-300 group border border-gray-100 hover:border-blue-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
                          <span className="text-gray-700 group-hover:text-blue-700 font-medium text-sm">{suggestion}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <History className="w-5 h-5 text-green-500" />
                    <span className="text-base font-semibold text-gray-800">Recent</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {recentSearches.map((search, index) => (
                      <div
                        key={index}
                        onClick={() => selectSuggestion(search)}
                        className="flex items-center space-x-3 p-3 hover:bg-green-50 rounded-lg cursor-pointer transition-colors group"
                      >
                        <History className="w-4 h-4 text-gray-400 group-hover:text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 group-hover:text-green-700 text-sm">{search}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-5 h-5 text-purple-500" />
                      <span className="text-base font-semibold text-gray-800">Popular</span>
                    </div>
                    <div className="space-y-2">
                      {smartSuggestions.slice(0, 4).map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => selectSuggestion(suggestion.text)}
                          className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg cursor-pointer transition-colors group border border-gray-100 hover:border-purple-200"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{suggestion.icon}</span>
                            <div>
                              <span className="text-gray-700 group-hover:text-purple-700 font-medium text-sm block">{suggestion.text}</span>
                              <Badge variant="outline" className="text-xs mt-1">
                                {suggestion.category}
                              </Badge>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Mobile Search Tips */}
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            <Mic className="w-3 h-3 mr-1 text-purple-500" />
            Voice Search
          </Badge>
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            <Bot className="w-3 h-3 mr-1 text-blue-500" />
            AI Powered
          </Badge>
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
            Smart Results
          </Badge>
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            <Zap className="w-3 h-3 mr-1 text-yellow-500" />
            Instant
          </Badge>
        </div>
      </div>
    </SearchContainer>
  );
};

export default MobileOptimizedSearch;
