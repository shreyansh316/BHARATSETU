
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Settings, 
  Bell, 
  Download, 
  Shield, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  FileText,
  Heart,
  Scale,
  Briefcase,
  AlertCircle,
  Cloud,
  HardDrive,
  Eye,
  LogOut,
  Edit3,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UserDashboardProps {
  isVisible: boolean;
  onClose: () => void;
  userData?: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    kycStatus: 'Verified' | 'Pending' | 'Rejected';
    joinDate: string;
    storageUsed: number;
    storageLimit: number;
  };
}

const UserDashboard: React.FC<UserDashboardProps> = ({ 
  isVisible, 
  onClose,
  userData = {
    name: 'Raj Kumar Singh',
    email: 'raj.kumar@example.com',
    phone: '+91 9876543210',
    kycStatus: 'Verified',
    joinDate: '15 March 2024',
    storageUsed: 2.8,
    storageLimit: 12
  }
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const recentActivities = [
    { 
      service: 'SwasthyaMitra', 
      action: 'Health checkup booked', 
      date: '2 hours ago',
      icon: Heart,
      color: 'text-red-500'
    },
    { 
      service: 'KanoonSathi', 
      action: 'Legal document verified', 
      date: '1 day ago',
      icon: Scale,
      color: 'text-blue-500'
    },
    { 
      service: 'YuvaRojgar', 
      action: 'Job application submitted', 
      date: '3 days ago',
      icon: Briefcase,
      color: 'text-green-500'
    },
    { 
      service: 'SamasyaReport', 
      action: 'Civic issue reported', 
      date: '1 week ago',
      icon: AlertCircle,
      color: 'text-orange-500'
    }
  ];

  const storageData = [
    { service: 'SwasthyaMitra', used: 0.8, color: 'bg-red-500' },
    { service: 'KanoonSathi', used: 0.6, color: 'bg-blue-500' },
    { service: 'YuvaRojgar', used: 0.4, color: 'bg-green-500' },
    { service: 'PathShaala+', used: 0.5, color: 'bg-purple-500' },
    { service: 'KrishiBandhu', used: 0.3, color: 'bg-yellow-500' },
    { service: 'SamasyaReport', used: 0.2, color: 'bg-orange-500' }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged Out Successfully",
      description: "You have been securely logged out of your account",
    });
    onClose();
    navigate('/');
  };

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing feature will be available soon",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-end z-50 p-4">
      <div className="w-full max-w-md h-full bg-white rounded-l-2xl shadow-2xl overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">My Dashboard</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ×
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{userData.name}</h3>
              <p className="text-blue-100 text-sm">{userData.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    userData.kycStatus === 'Verified' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {userData.kycStatus}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'storage', label: 'Storage', icon: Cloud },
            { id: 'activity', label: 'Activity', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Profile Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{userData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Member since {userData.joinDate}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Government Verified Account</span>
                  </div>
                  
                  <Button 
                    onClick={handleEditProfile}
                    variant="outline" 
                    className="w-full mt-4"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Downloads
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Privacy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'storage' && (
            <>
              {/* Storage Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Cloud className="w-5 h-5 mr-2" />
                    Cloud Storage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Used Storage</span>
                      <span className="font-medium">
                        {userData.storageUsed}GB / {userData.storageLimit}GB
                      </span>
                    </div>
                    
                    <Progress 
                      value={(userData.storageUsed / userData.storageLimit) * 100} 
                      className="h-2"
                    />
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <HardDrive className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600">
                        {userData.storageLimit - userData.storageUsed}GB available
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Storage by Service */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Storage by Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {storageData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-sm">{item.service}</span>
                        </div>
                        <span className="text-sm font-medium">{item.used}GB</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'activity' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.service}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-2">
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              BharatSetu • Secure & Private
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
