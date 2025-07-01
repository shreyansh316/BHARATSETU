
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Phone, 
  Mail, 
  Shield, 
  Settings, 
  LogOut,
  Edit,
  CheckCircle,
  Calendar,
  MapPin,
  FileText,
  ArrowLeft,
  Bell,
  Eye,
  Download,
  Share2,
  Award,
  TrendingUp,
  Wallet,
  Heart,
  Scale,
  Briefcase,
  AlertCircle,
  Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAdvancedAI } from '@/hooks/useAdvancedAI';
import AIContextualHelp from '@/components/AIContextualHelp';

const Account = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { activateAI, deactivateAI, isAIActive } = useAdvancedAI();
  const [showAIHelp, setShowAIHelp] = useState(false);
  
  const [user] = useState({
    name: 'Raj Kumar',
    email: 'raj.kumar@example.com',
    phone: '+91 9876543210',
    joinDate: '15 March 2024',
    kycStatus: 'Verified',
    accountType: 'DigiLocker Verified',
    location: 'Mumbai, Maharashtra',
    services: ['Aadhaar Services', 'PAN Services', 'Passport Services'],
    profileCompletion: 85,
    totalServices: 12,
    documentsIssued: 8,
    issuesReported: 3,
    healthCheckups: 5,
    jobApplications: 2,
    recentActivity: [
      { action: 'Health checkup completed', date: '2 days ago', type: 'health' },
      { action: 'PAN card application submitted', date: '1 week ago', type: 'legal' },
      { action: 'Job application for Software Developer', date: '2 weeks ago', type: 'employment' },
      { action: 'Civic issue reported - Street light', date: '3 weeks ago', type: 'civic' }
    ]
  });

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const handleEditProfile = () => {
    toast({
      title: "Coming Soon",
      description: "Profile editing feature will be available soon",
    });
  };

  const toggleAIHelp = () => {
    if (showAIHelp) {
      setShowAIHelp(false);
      deactivateAI();
    } else {
      setShowAIHelp(true);
      activateAI('account');
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'health': return <Heart className="w-4 h-4 text-red-500" />;
      case 'legal': return <Scale className="w-4 h-4 text-blue-500" />;
      case 'employment': return <Briefcase className="w-4 h-4 text-green-500" />;
      case 'civic': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full flex items-center justify-center border-2 border-gray-300">
                  <span className="text-blue-600 font-bold text-sm">भ</span>
                </div>
                <h1 className="text-lg font-bold text-gray-900">My Account</h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={toggleAIHelp}
                className={`${showAIHelp ? 'bg-purple-50 border-purple-300' : ''}`}
              >
                <Bot className="w-4 h-4 mr-2" />
                AI Help
              </Button>
              
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Profile Header with Stats */}
          <Card className="overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative">
                    <User className="w-10 h-10 text-white" />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {user.kycStatus}
                      </Badge>
                      <Badge variant="outline">
                        {user.accountType}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Profile Completion</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Progress value={user.profileCompletion} className="w-32" />
                        <span className="text-sm font-medium">{user.profileCompletion}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
                  <Button onClick={handleEditProfile} className="bg-gradient-to-r from-blue-500 to-purple-600">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{user.totalServices}</p>
                  <p className="text-sm text-gray-600">Services Used</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{user.documentsIssued}</p>
                  <p className="text-sm text-gray-600">Documents Issued</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{user.issuesReported}</p>
                  <p className="text-sm text-gray-600">Issues Reported</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Wallet className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">₹0</p>
                  <p className="text-sm text-gray-600">Savings Made</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{user.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="font-medium">{user.joinDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.date}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Account Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">KYC Verification</p>
                      <p className="text-sm text-gray-600">Identity verified via DigiLocker</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">SMS verification enabled</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Account Type</p>
                      <p className="text-sm text-gray-600">Government verified account</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Premium</Badge>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    <Settings className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Health checkup reminder</p>
                        <p className="text-xs text-gray-600">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Document processed</p>
                        <p className="text-xs text-gray-600">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Civic issue update</p>
                        <p className="text-xs text-gray-600">3 days ago</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Notifications
                  </Button>
                </CardContent>
              </Card>

              {/* Available Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Available Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {user.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Services
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* AI Contextual Help */}
      <AIContextualHelp
        currentPage="account"
        isVisible={showAIHelp}
        onClose={() => setShowAIHelp(false)}
      />
    </div>
  );
};

export default Account;
