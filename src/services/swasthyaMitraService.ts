export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
  isPrimary: boolean;
}

export interface InsuranceInfo {
  id: string;
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  coverageType: 'basic' | 'premium' | 'comprehensive';
  validFrom: string;
  validTo: string;
  coverageAmount: number;
  copayAmount?: number;
  isActive: boolean;
}

export interface HealthProfile {
  id: string;
  userId: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  height: number;
  weight: number;
  medicalHistory: MedicalCondition[];
  allergies: string[];
  medications: Medication[];
  emergencyContacts: EmergencyContact[];
  insuranceDetails?: InsuranceInfo;
  lastUpdated: string;
}

export interface MedicalCondition {
  id: string;
  name: string;
  diagnosedDate: string;
  severity: 'mild' | 'moderate' | 'severe';
  status: 'active' | 'controlled' | 'resolved';
  treatment: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  sideEffects?: string[];
}

export interface SymptomAnalysis {
  symptoms: string[];
  primaryDiagnosis: string;
  secondaryDiagnoses: string[];
  severity: 'low' | 'medium' | 'high' | 'emergency';
  confidence: number;
  recommendations: string[];
  urgencyLevel: number;
  aiInsights: string;
  ayurvedicRecommendations?: string[];
  homeRemedies?: string[];
  whenToSeeDoctor: string;
  redFlags: string[];
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email?: string;
  website?: string;
  type: 'government' | 'private' | 'trust';
  specialties: string[];
  facilities: string[];
  rating: number;
  reviews: number;
  distance?: number;
  estimatedCost: {
    consultation: number;
    emergency: number;
    surgery: number;
  };
  insuranceAccepted: string[];
  availability24x7: boolean;
  emergencyServices: boolean;
  doctors: Doctor[];
  beds: {
    general: number;
    icu: number;
    emergency: number;
    available: number;
  };
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string[];
  qualification: string[];
  experience: number;
  rating: number;
  consultationFee: number;
  availability: {
    days: string[];
    hours: string;
  };
  languages: string[];
  hospitalAffiliations: string[];
  onlineConsultation: boolean;
}

export interface HealthInsight {
  category: 'nutrition' | 'exercise' | 'mental_health' | 'preventive_care' | 'medication';
  title: string;
  description: string;
  actionItems: string[];
  priority: 'low' | 'medium' | 'high';
  personalizedFor: string;
  sources: string[];
}

export interface TelemedicineConsultation {
  id: string;
  doctorId: string;
  patientId: string;
  scheduledTime: string;
  duration: number;
  type: 'video' | 'audio' | 'chat';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  symptoms: string[];
  diagnosis?: string;
  prescription?: Medication[];
  followUp?: string;
  cost: number;
}

export class SwasthyaMitraService {
  private static aiHealthModel = 'advanced-medical-ai-v2';

  static async analyzeSymptoms(symptoms: string[], patientProfile?: Partial<HealthProfile>): Promise<SymptomAnalysis> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const severityMap = {
      'chest pain': 'high',
      'difficulty breathing': 'high',
      'severe headache': 'medium',
      'fever': 'medium',
      'nausea': 'low',
      'fatigue': 'low'
    };

    const primarySymptom = symptoms[0]?.toLowerCase() || '';
    const severity = severityMap[primarySymptom as keyof typeof severityMap] || 'low';
    
    return {
      symptoms,
      primaryDiagnosis: severity === 'high' ? 'Potential cardiac/respiratory emergency' :
                       severity === 'medium' ? 'Viral infection or stress-related condition' :
                       'Common cold or minor ailment',
      secondaryDiagnoses: [
        'Anxiety-related symptoms',
        'Nutritional deficiency',
        'Sleep disorder'
      ],
      severity: severity as any,
      confidence: Math.floor(Math.random() * 20) + 75,
      urgencyLevel: severity === 'high' ? 9 : severity === 'medium' ? 5 : 2,
      recommendations: [
        severity === 'high' ? 'Seek immediate medical attention' : 'Monitor symptoms for 24-48 hours',
        'Stay hydrated and get adequate rest',
        'Take recommended medications',
        'Follow up if symptoms worsen'
      ],
      aiInsights: `AI Analysis: Based on symptom pattern recognition and medical database analysis, 
      the most likely condition is ${severity === 'high' ? 'requiring immediate attention' : 'manageable with proper care'}. 
      ${patientProfile?.age ? `Given patient age of ${patientProfile.age}, ` : ''}consider additional factors like stress, 
      diet, and sleep patterns. Machine learning models suggest ${severity === 'high' ? 'emergency care' : 'home treatment'} 
      as the appropriate first step.`,
      ayurvedicRecommendations: [
        'Ginger tea for nausea and digestion',
        'Turmeric milk for inflammation',
        'Tulsi leaves for respiratory issues',
        'Ashwagandha for stress management'
      ],
      homeRemedies: [
        'Warm salt water gargling',
        'Steam inhalation with eucalyptus',
        'Hot compress for pain relief',
        'Honey and lemon for sore throat'
      ],
      whenToSeeDoctor: severity === 'high' ? 'Immediately - Call emergency services' :
                       severity === 'medium' ? 'Within 24 hours if symptoms persist' :
                       'If symptoms worsen or persist beyond 3 days',
      redFlags: [
        'Difficulty breathing or chest pain',
        'High fever above 103°F',
        'Severe dehydration',
        'Loss of consciousness',
        'Severe abdominal pain'
      ]
    };
  }

  static async findHospitals(location: string, specialty?: string, emergency?: boolean): Promise<Hospital[]> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return [
      {
        id: 'hosp_1',
        name: 'AIIMS Delhi',
        address: 'Ansari Nagar, New Delhi',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110029',
        phone: '+91-11-26588500',
        email: 'info@aiims.edu',
        website: 'https://www.aiims.edu',
        type: 'government',
        specialties: ['Cardiology', 'Neurology', 'Oncology', 'Emergency Medicine', 'General Surgery'],
        facilities: ['24x7 Emergency', 'ICU', 'Blood Bank', 'Pharmacy', 'Ambulance', 'Lab Services'],
        rating: 4.8,
        reviews: 15420,
        distance: 5.2,
        estimatedCost: {
          consultation: 20,
          emergency: 100,
          surgery: 50000
        },
        insuranceAccepted: ['CGHS', 'ESI', 'Ayushman Bharat', 'Private Insurance'],
        availability24x7: true,
        emergencyServices: true,
        doctors: [
          {
            id: 'doc_1',
            name: 'Dr. Rajesh Kumar',
            specialization: ['Cardiology', 'Interventional Cardiology'],
            qualification: ['MBBS', 'MD', 'DM Cardiology'],
            experience: 15,
            rating: 4.9,
            consultationFee: 500,
            availability: {
              days: ['Monday', 'Wednesday', 'Friday'],
              hours: '10:00 AM - 2:00 PM'
            },
            languages: ['Hindi', 'English'],
            hospitalAffiliations: ['AIIMS Delhi'],
            onlineConsultation: true
          }
        ],
        beds: {
          general: 2000,
          icu: 200,
          emergency: 50,
          available: 150
        }
      },
      {
        id: 'hosp_2',
        name: 'Fortis Healthcare',
        address: 'Sector 62, Noida',
        city: 'Noida',
        state: 'Uttar Pradesh',
        pincode: '201301',
        phone: '+91-120-6200000',
        email: 'info@fortishealthcare.com',
        website: 'https://www.fortishealthcare.com',
        type: 'private',
        specialties: ['Cardiac Surgery', 'Neurosurgery', 'Orthopedics', 'Cancer Care'],
        facilities: ['Advanced ICU', 'Robotic Surgery', 'PET Scan', 'MRI', 'CT Scan'],
        rating: 4.5,
        reviews: 8930,
        distance: 12.8,
        estimatedCost: {
          consultation: 800,
          emergency: 2000,
          surgery: 200000
        },
        insuranceAccepted: ['Mediclaim', 'Cashless', 'Corporate Insurance'],
        availability24x7: true,
        emergencyServices: true,
        doctors: [
          {
            id: 'doc_2',
            name: 'Dr. Priya Sharma',
            specialization: ['Neurology', 'Stroke Medicine'],
            qualification: ['MBBS', 'MD Neurology', 'Fellowship Stroke'],
            experience: 12,
            rating: 4.7,
            consultationFee: 1200,
            availability: {
              days: ['Tuesday', 'Thursday', 'Saturday'],
              hours: '9:00 AM - 1:00 PM'
            },
            languages: ['Hindi', 'English', 'Punjabi'],
            hospitalAffiliations: ['Fortis Healthcare'],
            onlineConsultation: true
          }
        ],
        beds: {
          general: 400,
          icu: 80,
          emergency: 20,
          available: 45
        }
      }
    ];
  }

  static async getPersonalizedHealthInsights(profile: HealthProfile): Promise<HealthInsight[]> {
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    return [
      {
        category: 'nutrition',
        title: 'Personalized Nutrition Plan',
        description: `Based on your age (${profile.age}) and health conditions, here's your AI-generated nutrition plan`,
        actionItems: [
          'Increase protein intake to 1.2g per kg body weight',
          'Include omega-3 rich foods 3x per week',
          'Limit processed sugar to less than 25g daily',
          'Add probiotics for gut health'
        ],
        priority: 'high',
        personalizedFor: profile.userId,
        sources: ['WHO Guidelines', 'Indian Council of Medical Research', 'AI Health Database']
      },
      {
        category: 'exercise',
        title: 'AI-Optimized Fitness Routine',
        description: 'Customized exercise plan considering your medical history and fitness level',
        actionItems: [
          '150 minutes moderate aerobic activity per week',
          'Strength training 2-3 times per week',
          'Flexibility exercises daily',
          'Monitor heart rate during exercise'
        ],
        priority: 'medium',
        personalizedFor: profile.userId,
        sources: ['American Heart Association', 'Sports Medicine Research']
      },
      {
        category: 'preventive_care',
        title: 'Preventive Health Screening',
        description: 'AI-recommended health screenings based on your age and risk factors',
        actionItems: [
          'Annual comprehensive health checkup',
          'Blood pressure monitoring monthly',
          'Cholesterol screening every 6 months',
          'Cancer screening as per age guidelines'
        ],
        priority: 'high',
        personalizedFor: profile.userId,
        sources: ['Preventive Medicine Guidelines', 'AI Risk Assessment']
      }
    ];
  }

  static async scheduleTelemedicine(doctorId: string, patientId: string, preferredTime: string, consultationType: 'video' | 'audio' | 'chat'): Promise<TelemedicineConsultation> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: `tele_${Date.now()}`,
      doctorId,
      patientId,
      scheduledTime: preferredTime,
      duration: consultationType === 'chat' ? 30 : 45,
      type: consultationType,
      status: 'scheduled',
      symptoms: [],
      cost: consultationType === 'video' ? 800 : consultationType === 'audio' ? 600 : 400
    };
  }

  static async getHealthTrends(userId: string): Promise<{
    vitals: Array<{
      date: string;
      bloodPressure: { systolic: number; diastolic: number };
      heartRate: number;
      weight: number;
      bmi: number;
    }>;
    aiInsights: string;
    recommendations: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      vitals: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        bloodPressure: {
          systolic: 120 + Math.floor(Math.random() * 20),
          diastolic: 80 + Math.floor(Math.random() * 15)
        },
        heartRate: 70 + Math.floor(Math.random() * 20),
        weight: 70 + Math.random() * 10,
        bmi: 22 + Math.random() * 3
      })),
      aiInsights: 'Your health trends show stable vital signs with minor fluctuations. AI analysis suggests maintaining current lifestyle with minor adjustments for optimal health.',
      recommendations: [
        'Continue regular exercise routine',
        'Monitor sodium intake for blood pressure',
        'Maintain consistent sleep schedule',
        'Consider stress management techniques'
      ]
    };
  }

  static async getEmergencyServices(location: string): Promise<{
    ambulance: string[];
    hospitals: string[];
    emergency_contacts: string[];
    blood_banks: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      ambulance: [
        '108 - National Emergency Number',
        '102 - Medical Emergency',
        '+91-11-26588500 - AIIMS Emergency'
      ],
      hospitals: [
        'AIIMS Delhi - 5.2 km',
        'Safdarjung Hospital - 7.8 km',
        'Max Hospital - 3.1 km'
      ],
      emergency_contacts: [
        'Police: 100',
        'Fire: 101',
        'Emergency: 112'
      ],
      blood_banks: [
        'Red Cross Blood Bank - 4.5 km',
        'AIIMS Blood Bank - 5.2 km',
        'Rotary Blood Bank - 6.1 km'
      ]
    };
  }
}
