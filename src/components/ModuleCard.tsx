
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  features: string[];
}

interface ModuleCardProps {
  module: Module;
}

const ModuleCard = ({ module }: ModuleCardProps) => {
  const IconComponent = module.icon;
  const navigate = useNavigate();

  const handleLaunchModule = () => {
    // Route to specific module pages
    const routes: { [key: string]: string } = {
      'swasthya': '/swasthya-mitra',
      'kanoon': '/kanoon-sathi',
      'yuva': '/yuva-rojgar',
      'samasya': '/samasya-report'
    };
    
    navigate(routes[module.id] || '/modules');
  };

  const handleLearnMore = () => {
    navigate('/modules');
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-l-transparent hover:border-l-blue-500 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {module.title}
              </CardTitle>
              <CardDescription className="text-sm font-medium text-gray-600 mt-1">
                {module.subtitle}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Star className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
        <p className="text-gray-700 mt-4 leading-relaxed">
          {module.description}
        </p>
      </CardHeader>

      <CardContent className="relative">
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Key Features</h4>
          <div className="grid grid-cols-2 gap-2">
            {module.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button 
            onClick={handleLaunchModule}
            className="flex-1 group/btn" 
            size="sm"
          >
            Launch Module
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
