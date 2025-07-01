
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, TrendingUp, Globe } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '10M+',
      label: 'Citizens Empowered',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      value: '50K+',
      label: 'Health Consultations',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      value: '75%',
      label: 'Issue Resolution Rate',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      value: '12',
      label: 'Languages Supported',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsSection;
