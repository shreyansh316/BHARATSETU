
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Play, 
  Brain, 
  Trophy, 
  Users, 
  Calendar,
  Clock,
  Star,
  ArrowLeft,
  Video,
  FileText,
  Target,
  Zap,
  Globe,
  Headphones,
  Download,
  User,
  GraduationCap,
  Monitor,
  Camera,
  Mic,
  Settings,
  Share2,
  BookMarked,
  PenTool,
  Calculator,
  FlaskConical,
  MapPin,
  Languages,
  Palette,
  Music,
  Dumbbell,
  Laptop
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PathShaalaPlus = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState('10th');
  const [activeSubject, setActiveSubject] = useState('mathematics');
  const [userProfile, setUserProfile] = useState({
    name: '',
    age: '',
    class: '',
    preferredSubjects: []
  });
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showLiveClass, setShowLiveClass] = useState(false);
  const [testDifficulty, setTestDifficulty] = useState('medium');

  const grades = [
    { id: '1st', name: 'Class 1st', students: '1.2K+', subjects: 5 },
    { id: '2nd', name: 'Class 2nd', students: '1.5K+', subjects: 6 },
    { id: '3rd', name: 'Class 3rd', students: '1.8K+', subjects: 7 },
    { id: '4th', name: 'Class 4th', students: '2.1K+', subjects: 8 },
    { id: '5th', name: 'Class 5th', students: '2.5K+', subjects: 9 },
    { id: '6th', name: 'Class 6th', students: '2.8K+', subjects: 10 },
    { id: '7th', name: 'Class 7th', students: '3.0K+', subjects: 11 },
    { id: '8th', name: 'Class 8th', students: '3.2K+', subjects: 12 },
    { id: '9th', name: 'Class 9th', students: '4.5K+', subjects: 13 },
    { id: '10th', name: 'Class 10th', students: '5.8K+', subjects: 14 },
    { id: '11th', name: 'Class 11th', students: '4.2K+', subjects: 15 },
    { id: '12th', name: 'Class 12th', students: '4.1K+', subjects: 16 }
  ];

  const getAllSubjects = (gradeId: string) => {
    const baseSubjects = [
      { id: 'mathematics', name: 'Mathematics', icon: Calculator, videos: 150, difficulty: 'Medium' },
      { id: 'science', name: 'Science', icon: FlaskConical, videos: 120, difficulty: 'Hard' },
      { id: 'english', name: 'English', icon: BookOpen, videos: 90, difficulty: 'Easy' },
      { id: 'hindi', name: 'Hindi', icon: Languages, videos: 80, difficulty: 'Easy' },
      { id: 'social', name: 'Social Studies', icon: MapPin, videos: 100, difficulty: 'Medium' }
    ];

    const advancedSubjects = [
      { id: 'physics', name: 'Physics', icon: Zap, videos: 95, difficulty: 'Hard' },
      { id: 'chemistry', name: 'Chemistry', icon: FlaskConical, videos: 85, difficulty: 'Hard' },
      { id: 'biology', name: 'Biology', icon: Brain, videos: 75, difficulty: 'Medium' },
      { id: 'geography', name: 'Geography', icon: Globe, videos: 65, difficulty: 'Easy' },
      { id: 'history', name: 'History', icon: BookMarked, videos: 70, difficulty: 'Easy' },
      { id: 'computer', name: 'Computer Science', icon: Laptop, videos: 110, difficulty: 'Medium' },
      { id: 'art', name: 'Art & Craft', icon: Palette, videos: 45, difficulty: 'Easy' },
      { id: 'music', name: 'Music', icon: Music, videos: 35, difficulty: 'Easy' },
      { id: 'physical', name: 'Physical Education', icon: Dumbbell, videos: 25, difficulty: 'Easy' }
    ];

    const gradeNum = parseInt(gradeId.replace(/\D/g, ''));
    
    if (gradeNum <= 5) {
      return baseSubjects.slice(0, 5);
    } else if (gradeNum <= 8) {
      return [...baseSubjects, ...advancedSubjects.slice(0, 4)];
    } else {
      return [...baseSubjects, ...advancedSubjects];
    }
  };

  const subjects = getAllSubjects(selectedGrade);

  const features = [
    { icon: Brain, title: 'AI-Powered Learning', desc: 'Personalized study paths based on your learning style' },
    { icon: Video, title: 'AI Video Lectures', desc: 'Interactive AI teacher with 3D animations' },
    { icon: Monitor, title: 'Live AI Classes', desc: 'Real-time interactive sessions with AI tutors' },
    { icon: Target, title: 'Smart Test Generation', desc: 'AI creates tests from easy to hard difficulty' },
    { icon: Trophy, title: 'Gamified Learning', desc: 'Earn points, badges, and compete with friends' },
    { icon: Globe, title: 'Multi-language Support', desc: 'Content available in Hindi, English, and regional languages' }
  ];

  const generateAITest = () => {
    const difficulties = {
      easy: 'Easy level questions for beginners',
      medium: 'Moderate difficulty for average students',
      hard: 'Advanced questions for top performers'
    };
    
    console.log(`Generating ${testDifficulty} test for ${activeSubject} - ${selectedGrade}`);
    // Here you would integrate with AI service to generate test
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    PathShaala+
                  </h1>
                  <p className="text-sm text-gray-600">AI-Powered Smart Study Portal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                    <User className="w-4 h-4 mr-2" />
                    Setup Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Student Profile Setup
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter your age"
                        value={userProfile.age}
                        onChange={(e) => setUserProfile({...userProfile, age: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="class">Class</Label>
                      <Select value={userProfile.class} onValueChange={(value) => setUserProfile({...userProfile, class: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your class" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade.id} value={grade.id}>
                              {grade.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600"
                      onClick={() => setShowProfileDialog(false)}
                    >
                      Save Profile
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={showLiveClass} onOpenChange={setShowLiveClass}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
                    <Monitor className="w-4 h-4 mr-2" />
                    Live Class
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      <Video className="w-5 h-5 mr-2" />
                      AI Live Class - {activeSubject}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"></div>
                      <div className="text-center text-white z-10">
                        <Brain className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                        <h3 className="text-2xl font-bold mb-2">AI Teacher Active</h3>
                        <p className="text-blue-200">Interactive learning session in progress</p>
                      </div>
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <Button size="sm" variant="outline" className="bg-red-500 text-white border-red-500">
                          <Camera className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="bg-blue-500 text-white border-blue-500">
                          <Mic className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="bg-gray-500 text-white border-gray-500">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Screen
                      </Button>
                      <Button variant="outline">
                        <PenTool className="w-4 h-4 mr-2" />
                        Whiteboard
                      </Button>
                      <Button variant="destructive">
                        Leave Class
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Brain className="w-3 h-3 mr-1" />
                AI Enhanced
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete K-12 Education with AI
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From Class 1 to 12 - AI-powered personalized learning, live classes, and smart assessments
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Students', value: '50K+', icon: Users },
              { label: 'AI Lectures', value: '5K+', icon: Video },
              { label: 'Live Classes', value: '500+', icon: Monitor },
              { label: 'Success Rate', value: '95%', icon: Trophy }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Grade Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Your Class</h3>
            <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
              {grades.map((grade) => (
                <Card
                  key={grade.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedGrade === grade.id 
                      ? 'ring-2 ring-purple-500 bg-purple-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedGrade(grade.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{grade.name}</h4>
                        <p className="text-xs text-gray-600">{grade.students} students</p>
                        <p className="text-xs text-purple-600">{grade.subjects} subjects</p>
                      </div>
                      {selectedGrade === grade.id && (
                        <Zap className="w-4 h-4 text-purple-500" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Subject Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedGrade} Subjects
              </h3>
              <div className="flex items-center space-x-2">
                <Select value={testDifficulty} onValueChange={setTestDifficulty}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={generateAITest}
                  className="bg-gradient-to-r from-orange-500 to-red-600"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Test
                </Button>
              </div>
            </div>

            <Tabs value={activeSubject} onValueChange={setActiveSubject}>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-6">
                {subjects.map((subject) => (
                  <Button
                    key={subject.id}
                    variant={activeSubject === subject.id ? "default" : "outline"}
                    onClick={() => setActiveSubject(subject.id)}
                    className={`h-auto p-3 flex flex-col items-center ${
                      activeSubject === subject.id 
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600' 
                        : ''
                    }`}
                  >
                    <subject.icon className="w-6 h-6 mb-1" />
                    <span className="text-xs text-center">{subject.name}</span>
                  </Button>
                ))}
              </div>

              {subjects.map((subject) => (
                <TabsContent key={subject.id} value={subject.id}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <subject.icon className="w-6 h-6" />
                          <span>{subject.name} - {selectedGrade}</span>
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {subject.videos} AI Videos
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={
                              subject.difficulty === 'Easy' ? 'border-green-300 text-green-700' :
                              subject.difficulty === 'Medium' ? 'border-yellow-300 text-yellow-700' :
                              'border-red-300 text-red-700'
                            }
                          >
                            {subject.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* AI Video Lectures */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {[1, 2, 3, 4].map((video) => (
                          <Card key={video} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-4">
                              <div className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20"></div>
                                <div className="text-center text-purple-600 relative z-10">
                                  <Brain className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                                  <span className="text-sm font-medium">AI Teacher</span>
                                </div>
                                <Badge className="absolute top-2 right-2 bg-red-500">
                                  <Video className="w-3 h-3 mr-1" />
                                  AI
                                </Badge>
                              </div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                Chapter {video}: Interactive AI Lecture
                              </h4>
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  20 min
                                </span>
                                <span className="flex items-center">
                                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                  4.9
                                </span>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600">
                                  <Play className="w-3 h-3 mr-1" />
                                  Watch AI Lecture
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Practice Tests */}
                      <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                          AI Generated Tests & Assignments
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { name: 'Easy Level Test', questions: 15, time: '20 min', difficulty: 'Easy' },
                            { name: 'Medium Level Test', questions: 25, time: '35 min', difficulty: 'Medium' },
                            { name: 'Hard Level Test', questions: 40, time: '60 min', difficulty: 'Hard' }
                          ].map((test, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-center mb-2">
                                  <Brain className="w-5 h-5 mr-2 text-purple-500" />
                                  <h5 className="font-medium text-gray-900">{test.name}</h5>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                  <div className="flex items-center">
                                    <FileText className="w-4 h-4 mr-2" />
                                    {test.questions} AI Questions
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {test.time}
                                  </div>
                                </div>
                                <Button size="sm" className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                                  Start AI Test
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathShaalaPlus;
