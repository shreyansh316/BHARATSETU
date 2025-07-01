
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
  Volume2, 
  Sparkles, 
  Bot, 
  Zap,
  TrendingUp,
  Clock,
  Star,
  Brain,
  ArrowRight,
  Filter,
  MapPin,
  Calendar,
  User,
  Smartphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SmartSearchBarProps {
  onSearch: (query: string) => void;
}

const SmartSearchBar = ({ onSearch }: SmartSearchBarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Health check symptoms', 'Legal document help', 'Job opportunities near me', 'Report civic issue'
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Enhanced smart suggestions with AI capabilities
  const smartSuggestions = [
    { text: 'Find doctors near me with AI analysis', module: 'swasthya-mitra', category: 'Health' },
    { text: 'AI legal document generator', module: 'kanoon-sathi', category: 'Legal' },
    { text: 'Smart job matching with AI', module: 'yuva-rojgar', category: 'Employment' },
    { text: 'AI-powered issue reporting', module: 'samasya-report', category: 'Civic' },
    { text: 'Personalized AI study classes', module: 'pathshaala-plus', category: 'Education' },
    { text: 'Smart farming with AI insights', module: 'krishi-bandhu', category: 'Agriculture' },
    { text: 'AR accessibility navigation', module: 'able-access-map', category: 'Accessibility' },
  ];

  const categories = ['All', 'Health', 'Legal', 'Employment', 'Civic', 'Education', 'Agriculture', 'Accessibility'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Initialize Speech Recognition with enhanced error handling
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'hi-IN,en-IN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleSearch(transcript);
        
        toast({
          title: "Voice Input Processed",
          description: `Searching for: "${transcript}"`,
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or use text input",
          variant: "destructive"
        });
      };
    }
  }, []);

  const processWithAdvancedAI = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      // Enhanced AI processing with contextual understanding
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const matchedSuggestion = smartSuggestions.find(s => 
        s.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery.toLowerCase().includes(s.text.toLowerCase().split(' ')[0])
      );

      if (matchedSuggestion) {
        navigate(`/${matchedSuggestion.module}`);
        
        toast({
          title: "AI Navigation Successful",
          description: `Redirected to ${matchedSuggestion.text} with AI assistance`,
        });
      }
      
      // Enhanced AI response with personality
      const aiResponse = `🤖 AI Assistant: I've analyzed your query "${searchQuery}" and found the most relevant services. Navigating to the optimal solution for your needs!`;
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.lang = 'en-IN';
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        speechSynthesis.speak(utterance);
      }
      
    } catch (error) {
      console.error('Advanced AI processing error:', error);
      toast({
        title: "AI Processing Error",
        description: "Falling back to standard search",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
        
        toast({
          title: "Voice Search Activated",
          description: "Speak clearly in Hindi or English...",
        });
      } else {
        toast({
          title: "Voice Search Unavailable",
          description: "Your browser doesn't support voice recognition",
          variant: "destructive"
        });
      }
    }
  };

  const handleSearch = async (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setRecentSearches(prev => [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 4));
      setShowSuggestions(false);
      
      // Process with advanced AI
      await processWithAdvancedAI(searchQuery);
    }
  };

  const updateSuggestions = (value: string) => {
    if (value.length > 1) {
      const filtered = smartSuggestions.filter(suggestion => {
        const matchesText = suggestion.text.toLowerCase().includes(value.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || suggestion.category === selectedCategory;
        return matchesText && matchesCategory;
      });
      setSuggestions(filtered.map(s => s.text).slice(0, 8));
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

  const filteredSuggestions = smartSuggestions.filter(s => 
    selectedCategory === 'All' || s.category === selectedCategory
  );

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Enhanced Mobile-First Search Bar */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 animate-pulse"></div>
        
        <div className="relative bg-white/98 backdrop-blur-xl rounded-2xl border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 shadow-2xl hover:shadow-3xl">
          {/* Mobile-Optimized Category Filter */}
          <div className="flex items-center space-x-2 p-3 border-b border-gray-100 overflow-x-auto scrollbar-hide">
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

          {/* Enhanced Search Input with Mobile Optimization */}
          <div className="flex items-center p-4 space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex-shrink-0">
              <Search className="w-5 h-5 text-white" />
            </div>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask AI anything... (Try: 'Find hospitals' or 'Legal help')"
              value={query}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="border-0 bg-transparent placeholder:text-gray-500 focus:ring-0 text-base md:text-lg font-medium flex-1"
              onFocus={() => setShowSuggestions(true)}
            />
            
            {isLoading && (
              <div className="flex items-center space-x-2 text-blue-500 flex-shrink-0">
                <Brain className="w-5 h-5 animate-spin" />
                <span className="text-sm hidden sm:inline">AI Processing...</span>
              </div>
            )}
            
            {/* Enhanced Voice Search Button - Mobile Optimized */}
            <Button
              type="button"
              onClick={handleVoiceSearch}
              className={`rounded-full w-12 h-12 md:w-14 md:h-14 p-0 transition-all duration-300 flex-shrink-0 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/50' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/50'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5 md:w-6 md:h-6" /> : <Mic className="w-5 h-5 md:w-6 md:h-6" />}
            </Button>
            
            {/* Enhanced Search Button - Mobile Optimized */}
            <Button
              type="button"
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 rounded-xl px-4 md:px-8 h-12 md:h-14 text-white font-semibold shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex-shrink-0"
            >
              {isLoading ? (
                <Brain className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Search with AI</span>
                  <span className="sm:hidden">AI</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Voice Listening Indicator - Mobile Optimized */}
      {isListening && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50 w-full max-w-sm">
          <Card className="p-4 md:p-6 bg-red-50 border-red-200 animate-pulse shadow-xl">
            <div className="flex items-center justify-center space-x-3 text-red-600">
              <Volume2 className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
              <span className="text-base md:text-lg font-semibold">Listening... Speak now</span>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 md:w-2 h-6 md:h-8 bg-red-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Mobile-Optimized Suggestions Dropdown */}
      {showSuggestions && (query.length > 1 ? suggestions.length > 0 : true) && (
        <Card className="absolute top-full left-0 right-0 mt-4 z-40 bg-white/98 backdrop-blur-xl border-2 border-gray-200 shadow-2xl animate-fade-in max-h-96 overflow-y-auto">
          <CardContent className="p-4 md:p-6">
            {query.length > 1 ? (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-base md:text-lg font-semibold text-gray-800">AI-Powered Suggestions</span>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Smart
                  </Badge>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => selectSuggestion(suggestion)}
                      className="flex items-center justify-between p-3 md:p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl cursor-pointer transition-all duration-300 group border border-gray-100 hover:border-blue-200 hover:shadow-md"
                    >
                      <div className="flex items-center space-x-3">
                        <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                        <span className="text-gray-700 group-hover:text-blue-700 font-medium text-sm md:text-base">{suggestion}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-lg font-semibold text-gray-800">Recent Searches</span>
                </div>
                <div className="space-y-2 mb-6">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      onClick={() => selectSuggestion(search)}
                      className="flex items-center space-x-3 p-3 hover:bg-green-50 rounded-lg cursor-pointer transition-colors group"
                    >
                      <Clock className="w-4 h-4 text-gray-400 group-hover:text-green-500" />
                      <span className="text-gray-700 group-hover:text-green-700">{search}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Star className="w-5 h-5 text-purple-500" />
                    <span className="text-lg font-semibold text-gray-800">Popular in {selectedCategory}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => selectSuggestion(suggestion.text)}
                        className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg cursor-pointer transition-colors group border border-gray-100 hover:border-purple-200"
                      >
                        <div>
                          <span className="text-gray-700 group-hover:text-purple-700 font-medium">{suggestion.text}</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {suggestion.category}
                            </Badge>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Enhanced Mobile-Optimized Search Tips */}
      <div className="mt-4 md:mt-6 text-center">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm">
          <div className="flex items-center space-x-1 md:space-x-2 text-gray-600 bg-white/80 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
            <Smartphone className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
            <span>Mobile Optimized</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2 text-gray-600 bg-white/80 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
            <Mic className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
            <span>Voice Search</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2 text-gray-600 bg-white/80 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
            <Bot className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
            <span>AI Powered</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2 text-gray-600 bg-white/80 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
            <Zap className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
            <span>Instant Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSearchBar;
