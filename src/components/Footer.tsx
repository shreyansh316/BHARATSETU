
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  Code, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Star,
  Award,
  Shield,
  Zap,
  Globe,
  ArrowUp,
  ExternalLink,
  Download,
  MessageCircle
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, label: 'Twitter', url: '#', color: 'hover:text-sky-500' },
    { icon: Linkedin, label: 'LinkedIn', url: '#', color: 'hover:text-blue-600' },
    { icon: Instagram, label: 'Instagram', url: '#', color: 'hover:text-pink-500' },
    { icon: Youtube, label: 'YouTube', url: '#', color: 'hover:text-red-500' }
  ];

  const quickLinks = [
    { name: 'About Us', url: '#' },
    { name: 'How it Works', url: '#' },
    { name: 'Careers', url: '#' },
    { name: 'Press', url: '#' },
    { name: 'Blog', url: '#' },
    { name: 'Partnership', url: '#' }
  ];

  const achievements = [
    { icon: Users, value: '10M+', label: 'Happy Citizens' },
    { icon: Award, value: '99.9%', label: 'Uptime' },
    { icon: Shield, value: '100%', label: 'Secure' },
    { icon: Star, value: '4.9/5', label: 'Rating' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Achievements Section */}
        <div className="bg-gradient-to-r from-orange-500/20 to-green-500/20 py-8 border-b border-gray-700">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {achievements.map((achievement, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {achievement.value}
                  </div>
                  <div className="text-sm text-gray-300">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6 group">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-blue-600 font-bold text-xl">भ</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                    BharatSetu
                  </h3>
                  <p className="text-sm text-gray-400">Empowering India, One Citizen at a Time</p>
                </div>
              </div>
              
              <p className="text-gray-300 max-w-md leading-relaxed mb-6">
                Building bridges between citizens and essential services through technology, 
                making governance accessible and empowering every Indian with AI-powered solutions.
              </p>

              {/* Newsletter Signup */}
              <Card className="bg-white/10 backdrop-blur-sm border-gray-600 mb-6">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 text-white flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-orange-400" />
                    Stay Updated
                  </h4>
                  <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/20 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 px-6"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>+91 1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 text-orange-400" />
                  <span>support@bharatsetu.gov.in</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6 text-orange-400 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modules & Support */}
            <div>
              <h4 className="font-semibold mb-6 text-green-400 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Core Modules
              </h4>
              <ul className="space-y-3 mb-6">
                {[
                  'SwasthyaMitra', 'KanoonSathi', 'YuvaRojgar', 'SamasyaReport',
                  'PathShaala+', 'KrishiBandhu', 'AbleAccess Map'
                ].map((module, index) => (
                  <li key={index}>
                    <a 
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <Download className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {module}
                    </a>
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold mb-4 text-blue-400 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Support
              </h4>
              <ul className="space-y-2">
                {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Bottom Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Left Side - Brand Values */}
            <div className="flex flex-wrap items-center justify-center md:justify-start space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>Made with love for India</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                <Code className="w-4 h-4 text-blue-500" />
                <span>Open Source</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                <Users className="w-4 h-4 text-green-500" />
                <span>Community Driven</span>
              </div>
            </div>
            
            {/* Right Side - Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 ${social.color} hover:scale-110`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              © 2024 BharatSetu. Empowering Digital India. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
          size="icon"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </footer>
  );
};

export default Footer;
