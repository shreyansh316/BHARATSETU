import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Eye, 
  Camera, 
  Fingerprint, 
  CheckCircle,
  AlertCircle,
  Bot,
  RefreshCw
} from 'lucide-react';

interface HumanVerificationProps {
  onVerificationComplete: (verified: boolean) => void;
  verificationLevel: 'basic' | 'advanced' | 'biometric';
}

const HumanVerification = ({ onVerificationComplete, verificationLevel }: HumanVerificationProps) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [verificationSteps, setVerificationSteps] = useState<boolean[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [mathChallenge, setMathChallenge] = useState({ question: '', answer: 0 });

  useEffect(() => {
    generateMathChallenge();
    initializeVerificationSteps();
  }, [verificationLevel]);

  const initializeVerificationSteps = () => {
    const stepCount = verificationLevel === 'basic' ? 2 : verificationLevel === 'advanced' ? 4 : 6;
    setVerificationSteps(new Array(stepCount).fill(false));
  };

  const generateMathChallenge = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer = 0;
    let question = '';
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        answer = Math.max(num1, num2) - Math.min(num1, num2);
        question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
        break;
      case '*':
        answer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
    }
    
    setMathChallenge({ question, answer });
  };

  const verifyMathChallenge = () => {
    const userAnswer = parseInt(captchaAnswer);
    if (userAnswer === mathChallenge.answer) {
      completeStep(0);
      setCaptchaAnswer('');
      generateMathChallenge();
    }
  };

  const completeStep = (stepIndex: number) => {
    const newSteps = [...verificationSteps];
    newSteps[stepIndex] = true;
    setVerificationSteps(newSteps);

    if (newSteps.every(step => step)) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onVerificationComplete(true);
      }, 2000);
    }
  };

  const simulateBiometricCheck = async (type: string) => {
    setIsProcessing(true);
    // Simulate biometric processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    
    if (type === 'fingerprint') {
      completeStep(4);
    } else if (type === 'face') {
      completeStep(5);
    }
  };

  const verificationChallenges = [
    {
      title: 'Math Challenge',
      description: 'Solve the simple math problem',
      icon: Bot,
      component: (
        <div className="space-y-4">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold mb-4">What is {mathChallenge.question}?</p>
            <div className="flex space-x-2 justify-center">
              <input
                type="number"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                className="w-20 p-2 border border-gray-300 rounded text-center"
                placeholder="?"
              />
              <Button onClick={verifyMathChallenge} size="sm">
                Verify
              </Button>
              <Button onClick={generateMathChallenge} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Pattern Recognition',
      description: 'Select all images with traffic lights',
      icon: Eye,
      component: (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              onClick={() => completeStep(1)}
              className="aspect-square bg-gray-200 rounded cursor-pointer hover:bg-blue-100 flex items-center justify-center text-xs"
            >
              {i === 3 || i === 6 ? '🚦' : '🏢'}
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Behavioral Analysis',
      description: 'Mouse movement pattern verification',
      icon: Shield,
      component: (
        <div className="p-6 bg-green-50 rounded-lg text-center">
          <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-sm text-gray-600 mb-4">Move your cursor in a natural pattern</p>
          <div
            className="w-full h-32 border-2 border-dashed border-green-300 rounded-lg cursor-crosshair flex items-center justify-center"
            onMouseMove={() => setTimeout(() => completeStep(2), 2000)}
          >
            <p className="text-green-600">Move cursor here</p>
          </div>
        </div>
      )
    },
    {
      title: 'Time-based Challenge',
      description: 'Human reaction time verification',
      icon: AlertCircle,
      component: (
        <div className="text-center space-y-4">
          <p className="text-gray-600">Click the button when it turns green</p>
          <Button
            className="w-32 h-16 bg-red-500 hover:bg-green-500 transition-colors duration-1000"
            onClick={() => completeStep(3)}
            onMouseEnter={(e) => {
              setTimeout(() => {
                e.currentTarget.className = e.currentTarget.className.replace('bg-red-500', 'bg-green-500');
              }, 1000);
            }}
          >
            Wait...
          </Button>
        </div>
      )
    },
    {
      title: 'Fingerprint Scan',
      description: 'Biometric fingerprint verification',
      icon: Fingerprint,
      component: (
        <div className="text-center space-y-4">
          <Fingerprint className="w-16 h-16 text-blue-500 mx-auto" />
          <p className="text-gray-600">Place your finger on the scanner</p>
          <Button
            onClick={() => simulateBiometricCheck('fingerprint')}
            disabled={isProcessing}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isProcessing ? 'Scanning...' : 'Start Fingerprint Scan'}
          </Button>
        </div>
      )
    },
    {
      title: 'Face Recognition',
      description: 'Facial biometric verification',
      icon: Camera,
      component: (
        <div className="text-center space-y-4">
          <Camera className="w-16 h-16 text-purple-500 mx-auto" />
          <p className="text-gray-600">Look directly at your camera</p>
          <Button
            onClick={() => simulateBiometricCheck('face')}
            disabled={isProcessing}
            className="bg-purple-500 hover:bg-purple-600"
          >
            {isProcessing ? 'Analyzing...' : 'Start Face Verification'}
          </Button>
        </div>
      )
    }
  ];

  const activeChallenge = verificationChallenges[currentChallenge];
  const availableChallenges = verificationChallenges.slice(0, verificationSteps.length);

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Human Verification</span>
          </CardTitle>
          <Badge variant="outline" className="bg-blue-50">
            {verificationLevel.charAt(0).toUpperCase() + verificationLevel.slice(1)} Security
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Verification Progress</span>
            <span>{verificationSteps.filter(Boolean).length}/{verificationSteps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(verificationSteps.filter(Boolean).length / verificationSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Verification Steps */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {availableChallenges.map((challenge, index) => (
            <div
              key={index}
              className={`p-3 border rounded-lg text-center cursor-pointer transition-all ${
                verificationSteps[index]
                  ? 'border-green-500 bg-green-50'
                  : currentChallenge === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setCurrentChallenge(index)}
            >
              <challenge.icon className={`w-6 h-6 mx-auto mb-2 ${
                verificationSteps[index] ? 'text-green-500' : 'text-gray-500'
              }`} />
              <p className="text-xs font-medium">{challenge.title}</p>
              {verificationSteps[index] && (
                <CheckCircle className="w-4 h-4 text-green-500 mx-auto mt-1" />
              )}
            </div>
          ))}
        </div>

        {/* Active Challenge */}
        {!verificationSteps.every(Boolean) && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <activeChallenge.icon className="w-4 h-4" />
                <span>{activeChallenge.title}</span>
              </CardTitle>
              <p className="text-sm text-gray-600">{activeChallenge.description}</p>
            </CardHeader>
            <CardContent>
              {activeChallenge.component}
            </CardContent>
          </Card>
        )}

        {/* Completion State */}
        {verificationSteps.every(Boolean) && (
          <div className="text-center space-y-4">
            {isProcessing ? (
              <div>
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-600">Finalizing verification...</p>
              </div>
            ) : (
              <div>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800">Verification Complete!</h3>
                <p className="text-sm text-gray-600">You have been verified as a human user</p>
              </div>
            )}
          </div>
        )}

        {/* Security Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold">Enhanced Security</h4>
              <p className="text-xs text-gray-600">
                This verification helps protect against automated attacks and ensures secure access to BharatSetu services.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HumanVerification;
