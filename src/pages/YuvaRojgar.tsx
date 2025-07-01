
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Star,
  Bot,
  BookOpen,
  Award,
  Target,
  ArrowLeft,
  Search,
  Filter,
  Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIContextualHelp from '@/components/AIContextualHelp';
import AIChat from '@/components/AIChat';
import { useAdvancedAI } from '@/hooks/useAdvancedAI';

const YuvaRojgar = () => {
  const navigate = useNavigate();
  const { activateAI, isAIActive } = useAdvancedAI();
  const [showAIHelp, setShowAIHelp] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    activateAI('yuvarujgar');
  }, [activateAI]);

  const jobCategories = [
    { id: 1, name: 'Technology', count: 1250, growth: '+15%' },
    { id: 2, name: 'Healthcare', count: 890, growth: '+12%' },
    { id: 3, name: 'Finance', count: 567, growth: '+8%' },
    { id: 4, name: 'Education', count: 423, growth: '+18%' },
    { id: 5, name: 'Manufacturing', count: 789, growth: '+10%' },
    { id: 6, name: 'Government', count: 345, growth: '+5%' }
  ];

  const featuredJobs = [
    {
      id: 1,
      title: 'Software Developer',
      company: 'Tech Innovations Pvt Ltd',
      location: 'Bangalore, Karnataka',
      salary: '₹8-12 LPA',
      type: 'Full-time',
      experience: '2-4 years',
      skills: ['React', 'Node.js', 'MongoDB'],
      rating: 4.5,
      applicants: 245
    },
    {
      id: 2,
      title: 'Digital Marketing Specialist',
      company: 'Growth Marketing Co.',
      location: 'Mumbai, Maharashtra',
      salary: '₹5-8 LPA',
      type: 'Full-time',
      experience: '1-3 years',
      skills: ['SEO', 'Google Ads', 'Analytics'],
      rating: 4.2,
      applicants: 189
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Analytics Solutions',
      location: 'Delhi, NCR',
      salary: '₹6-10 LPA',
      type: 'Full-time',
      experience: '1-2 years',
      skills: ['Python', 'SQL', 'Tableau'],
      rating: 4.7,
      applicants: 156
    }
  ];

  const skillPrograms = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      duration: '6 months',
      level: 'Beginner to Advanced',
      students: 2500,
      rating: 4.8,
      certification: 'Government Certified'
    },
    {
      id: 2,
      title: 'Digital Marketing Mastery',
      duration: '4 months',
      level: 'Intermediate',
      students: 1800,
      rating: 4.6,
      certification: 'Industry Recognized'
    },
    {
      id: 3,
      title: 'Data Science & AI',
      duration: '8 months',
      level: 'Advanced',
      students: 1200,
      rating: 4.9,
      certification: 'Premium Certificate'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">YuvaRojgar</h1>
                  <p className="text-sm text-gray-600">Career & Skill Development Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAIHelp(true)}
                className="border-purple-200 hover:bg-purple-50"
              >
                <Bot className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {isAIActive ? 'AI Active' : 'AI Ready'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">12,450</p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-xs text-green-600 mt-2">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Job Seekers</p>
                  <p className="text-2xl font-bold text-gray-900">45,200</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-xs text-green-600 mt-2">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Placements</p>
                  <p className="text-2xl font-bold text-gray-900">8,760</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-xs text-green-600 mt-2">+22% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Skill Programs</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
                <Award className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-xs text-green-600 mt-2">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="jobs">Job Search</TabsTrigger>
            <TabsTrigger value="skills">Skill Development</TabsTrigger>
            <TabsTrigger value="career">Career Guidance</TabsTrigger>
            <TabsTrigger value="learn-more">Learn More</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            {/* Job Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Job Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {jobCategories.map((category) => (
                    <div key={category.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.count} jobs available</p>
                      <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                        {category.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>Featured Jobs</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredJobs.map((job) => (
                    <div key={job.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="text-sm font-semibold text-green-600">
                          {job.salary}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{job.rating}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">{job.applicants} applicants</p>
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Skill Development Programs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skillPrograms.map((program) => (
                    <Card key={program.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">{program.title}</h3>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm text-gray-600">Duration: {program.duration}</p>
                          <p className="text-sm text-gray-600">Level: {program.level}</p>
                          <p className="text-sm text-gray-600">{program.students} students enrolled</p>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">{program.rating}</span>
                          </div>
                          <Badge variant="secondary">{program.certification}</Badge>
                        </div>
                        <Button className="w-full">Enroll Now</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="career" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Career Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Get personalized career recommendations based on your skills, interests, and market trends.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
                    <Bot className="w-4 h-4 mr-2" />
                    Start Assessment
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Industry Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Stay updated with the latest industry trends and salary insights powered by AI analytics.
                  </p>
                  <Button className="w-full" variant="outline">
                    View Insights
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learn-more" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About YuvaRojgar Platform</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Mission & Vision</h3>
                    <p className="text-gray-700">
                      YuvaRojgar is India's premier digital employment and skill development platform, designed to bridge the gap between job seekers and employers while fostering continuous learning and career growth. Our mission is to empower the youth of India with the skills and opportunities needed to thrive in the modern economy.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li><strong>AI-Powered Job Matching:</strong> Advanced algorithms match candidates with suitable opportunities based on skills, experience, and preferences.</li>
                      <li><strong>Skill Development Programs:</strong> Government-certified courses and industry-recognized training programs.</li>
                      <li><strong>Career Guidance:</strong> Personalized career counseling and mentorship programs.</li>
                      <li><strong>Real-time Market Insights:</strong> Industry trends and salary benchmarking powered by AI analytics.</li>
                      <li><strong>Employer Connect:</strong> Direct communication channels with hiring managers and recruiters.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">How It Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-2">1. Profile Creation</h4>
                        <p className="text-sm text-gray-600">Create a comprehensive profile highlighting your skills, education, and career aspirations.</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold mb-2">2. Skill Assessment</h4>
                        <p className="text-sm text-gray-600">Take AI-powered assessments to identify your strengths and areas for improvement.</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold mb-2">3. Job Matching</h4>
                        <p className="text-sm text-gray-600">Receive personalized job recommendations and apply with one-click applications.</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Success Stories</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        "YuvaRojgar transformed my career journey. Through their skill development program, I learned web development and landed my dream job at a tech startup. The AI-powered job matching was incredibly accurate!" 
                      </p>
                      <p className="text-sm font-semibold">- Priya Sharma, Software Developer, Bangalore</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Government Integration</h3>
                    <p className="text-gray-700">
                      YuvaRojgar is integrated with various government schemes including Skill India, Pradhan Mantri Kaushal Vikas Yojana (PMKVY), and Digital India initiatives. This ensures that all certifications are government-recognized and contribute to the national skill development ecosystem.
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Components */}
      <AIContextualHelp 
        currentPage="yuvarujgar"
        isVisible={showAIHelp}
        onClose={() => setShowAIHelp(false)}
      />
      <AIChat />
    </div>
  );
};

export default YuvaRojgar;
