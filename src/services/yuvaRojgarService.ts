export interface SocialProfile {
  id: string;
  platform: 'linkedin' | 'github' | 'twitter' | 'portfolio' | 'other';
  url: string;
  username?: string;
  isVerified: boolean;
  isPublic: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  isVerified: boolean;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  experienceLevel: 'entry' | 'mid' | 'senior';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  postedDate: string;
  closingDate?: string;
  contactEmail: string;
  applyLink?: string;
  skills: string[];
  benefits: string[];
  isRemote: boolean;
  isFeatured: boolean;
  views: number;
  applications: number;
  companyLogo?: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  provider: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  cost: number;
  eligibilityCriteria: string[];
  skillsCovered: string[];
  certificationOffered: boolean;
  applicationDeadline: string;
  contactEmail: string;
  website?: string;
  isOnline: boolean;
  isSponsored: boolean;
  seatsAvailable: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  ministry: string;
  benefits: string[];
  eligibilityCriteria: string[];
  applicationProcess: string;
  website: string;
  startDate: string;
  endDate?: string;
  targetAudience: string[];
  budgetAllocation: number;
  successRate: number;
  contactEmail: string;
  helplineNumber: string;
  isAccessibleOnline: boolean;
}

export interface CareerCounselor {
  id: string;
  name: string;
  specialization: string[];
  experience: number;
  qualifications: string[];
  certifications: string[];
  languages: string[];
  availability: {
    days: string[];
    hours: string;
  };
  contactEmail: string;
  phone: string;
  address: string;
  rating: number;
  reviews: number;
  consultationFee: number;
  isOnlineConsultationAvailable: boolean;
  socialProfiles: SocialProfile[];
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  educationLevel: string;
  skills: string[];
  experienceYears: number;
  preferredJobTypes: string[];
  resumeLink?: string;
  socialProfiles: SocialProfile[];
  certifications: Certification[];
  interests: string[];
  careerGoals: string[];
  isSeekingJob: boolean;
  lastUpdated: string;
}

export class YuvaRojgarService {
  private static aiModel = 'yuva-rojgar-ai-v1';

  static async getRecommendedJobs(userProfile: UserProfile): Promise<JobListing[]> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const recommendedJobs: JobListing[] = [
      {
        id: 'job1',
        title: 'Software Engineer',
        company: 'TechCorp',
        location: 'Bangalore',
        description: 'Develop high-quality software solutions...',
        requirements: ['Bachelor\'s degree in Computer Science', '3+ years of experience'],
        responsibilities: ['Design, develop, and test software', 'Collaborate with team members'],
        salaryRange: { min: 800000, max: 1500000 },
        experienceLevel: 'mid',
        employmentType: 'full-time',
        postedDate: '2024-01-01',
        closingDate: '2024-02-01',
        contactEmail: 'hr@techcorp.com',
        skills: ['Java', 'Python', 'SQL'],
        benefits: ['Health insurance', 'Paid time off'],
        isRemote: false,
        isFeatured: true,
        views: 1200,
        applications: 150,
        companyLogo: 'https://example.com/techcorp-logo.png'
      },
      {
        id: 'job2',
        title: 'Data Analyst',
        company: 'DataSolutions',
        location: 'Mumbai',
        description: 'Analyze large datasets to provide insights...',
        requirements: ['Bachelor\'s degree in Statistics', '2+ years of experience'],
        responsibilities: ['Collect and analyze data', 'Create reports and visualizations'],
        salaryRange: { min: 600000, max: 1200000 },
        experienceLevel: 'mid',
        employmentType: 'full-time',
        postedDate: '2024-01-05',
        closingDate: '2024-02-05',
        contactEmail: 'hr@datasolutions.com',
        skills: ['SQL', 'Python', 'Tableau'],
        benefits: ['Health insurance', 'Paid time off'],
        isRemote: true,
        isFeatured: false,
        views: 900,
        applications: 100,
        companyLogo: 'https://example.com/datasolutions-logo.png'
      }
    ];

    return recommendedJobs;
  }

  static async getMatchingTrainingPrograms(userProfile: UserProfile): Promise<TrainingProgram[]> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const matchingPrograms: TrainingProgram[] = [
      {
        id: 'training1',
        title: 'Full Stack Web Development',
        description: 'Learn full stack web development skills...',
        provider: 'Coding Academy',
        location: 'Delhi',
        startDate: '2024-03-01',
        endDate: '2024-06-01',
        duration: '3 months',
        cost: 50000,
        eligibilityCriteria: ['Bachelor\'s degree', 'Basic programming knowledge'],
        skillsCovered: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
        certificationOffered: true,
        applicationDeadline: '2024-02-15',
        contactEmail: 'info@codingacademy.com',
        website: 'https://codingacademy.com',
        isOnline: true,
        isSponsored: false,
        seatsAvailable: 50,
        level: 'beginner'
      },
      {
        id: 'training2',
        title: 'Data Science Bootcamp',
        description: 'Intensive data science training program...',
        provider: 'DataCamp',
        location: 'Mumbai',
        startDate: '2024-04-01',
        endDate: '2024-07-01',
        duration: '3 months',
        cost: 60000,
        eligibilityCriteria: ['Bachelor\'s degree in Statistics', 'Basic programming knowledge'],
        skillsCovered: ['Python', 'SQL', 'Machine Learning', 'Data Visualization'],
        certificationOffered: true,
        applicationDeadline: '2024-03-15',
        contactEmail: 'info@datacamp.com',
        website: 'https://datacamp.com',
        isOnline: true,
        isSponsored: false,
        seatsAvailable: 40,
        level: 'intermediate'
      }
    ];

    return matchingPrograms;
  }

  static async getRelevantGovernmentSchemes(userProfile: UserProfile): Promise<GovernmentScheme[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const relevantSchemes: GovernmentScheme[] = [
      {
        id: 'scheme1',
        name: 'Pradhan Mantri Kaushal Vikas Yojana',
        description: 'Skill development scheme for youth...',
        ministry: 'Ministry of Skill Development and Entrepreneurship',
        benefits: ['Skill training', 'Certification', 'Placement assistance'],
        eligibilityCriteria: ['Indian citizen', 'Age 18-35'],
        applicationProcess: 'Online application',
        website: 'https://pmkvyofficial.org',
        startDate: '2015-07-15',
        targetAudience: ['Unemployed youth', 'School dropouts'],
        budgetAllocation: 12000000000,
        successRate: 0.75,
        contactEmail: 'info@pmkvy.org',
        helplineNumber: '1800-123-4567',
        isAccessibleOnline: true
      },
      {
        id: 'scheme2',
        name: 'Startup India Seed Fund Scheme',
        description: 'Financial assistance for startups...',
        ministry: 'Department for Promotion of Industry and Internal Trade',
        benefits: ['Seed funding', 'Mentorship', 'Incubation support'],
        eligibilityCriteria: ['Startup recognized by DPIIT', 'Less than 2 years old'],
        applicationProcess: 'Online application',
        website: 'https://startupindia.gov.in',
        startDate: '2021-04-01',
        targetAudience: ['Early-stage startups'],
        budgetAllocation: 9450000000,
        successRate: 0.60,
        contactEmail: 'info@startupindia.gov.in',
        helplineNumber: '1800-11-5566',
        isAccessibleOnline: true
      }
    ];

    return relevantSchemes;
  }

  static async findCareerCounselors(userProfile: UserProfile): Promise<CareerCounselor[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const counselors: CareerCounselor[] = [
      {
        id: 'counselor1',
        name: 'Rajesh Sharma',
        specialization: ['Software Engineering', 'Data Science'],
        experience: 10,
        qualifications: ['Master\'s in Computer Science', 'Certified Career Counselor'],
        certifications: ['Career Development Facilitator'],
        languages: ['Hindi', 'English'],
        availability: {
          days: ['Monday', 'Wednesday', 'Friday'],
          hours: '10:00 AM - 6:00 PM'
        },
        contactEmail: 'rajesh.sharma@example.com',
        phone: '+91-9876543210',
        address: 'Bangalore',
        rating: 4.5,
        reviews: 50,
        consultationFee: 1000,
        isOnlineConsultationAvailable: true,
        socialProfiles: [
          {
            id: 'social1',
            platform: 'linkedin',
            url: 'https://linkedin.com/in/rajeshsharma',
            username: 'rajeshsharma',
            isVerified: true,
            isPublic: true
          }
        ]
      },
      {
        id: 'counselor2',
        name: 'Priya Verma',
        specialization: ['Marketing', 'Business Development'],
        experience: 8,
        qualifications: ['MBA', 'Certified Career Counselor'],
        certifications: ['Global Career Development Facilitator'],
        languages: ['Hindi', 'English'],
        availability: {
          days: ['Tuesday', 'Thursday', 'Saturday'],
          hours: '11:00 AM - 7:00 PM'
        },
        contactEmail: 'priya.verma@example.com',
        phone: '+91-9988776655',
        address: 'Mumbai',
        rating: 4.8,
        reviews: 60,
        consultationFee: 1200,
        isOnlineConsultationAvailable: true,
        socialProfiles: [
          {
            id: 'social2',
            platform: 'linkedin',
            url: 'https://linkedin.com/in/priyaverma',
            username: 'priyaverma',
            isVerified: true,
            isPublic: true
          }
        ]
      }
    ];

    return counselors;
  }

  static async analyzeUserProfile(profileData: any): Promise<{
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    aiInsights: string;
    recommendedSkills: string[];
    suggestedCareerPaths: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    return {
      strengths: [
        'Strong analytical skills',
        'Excellent communication skills',
        'Proficient in programming languages'
      ],
      weaknesses: [
        'Lack of experience in leadership roles',
        'Limited knowledge of specific industry trends'
      ],
      opportunities: [
        'Growing demand for data scientists',
        'Emerging technologies in AI and machine learning'
      ],
      threats: [
        'Increasing competition in the job market',
        'Rapid technological advancements'
      ],
      aiInsights: 'Based on your profile, you have a strong foundation in technical skills. Focus on developing leadership abilities and staying updated with industry trends to enhance your career prospects.',
      recommendedSkills: [
        'Leadership skills',
        'Industry-specific knowledge',
        'Cloud computing'
      ],
      suggestedCareerPaths: [
        'Data Scientist',
        'Software Architect',
        'Technology Consultant'
      ]
    };
  }

  static async generateResume(profile: UserProfile): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const resumeContent = `
      # ${profile.firstName} ${profile.lastName}
      
      ## Contact Information
      - Email: ${profile.email}
      - Phone: ${profile.phone}
      - Address: ${profile.address}
      
      ## Summary
      A highly motivated and skilled professional with ${profile.experienceYears} years of experience in ${profile.skills.join(', ')}. Seeking a challenging role in ${profile.preferredJobTypes.join(', ')} to leverage expertise and contribute to organizational success.
      
      ## Education
      - ${profile.educationLevel}
      
      ## Skills
      - ${profile.skills.join(', ')}
      
      ## Experience
      - [Add your experience details here]
      
      ## Certifications
      - ${profile.certifications.map(cert => cert.name).join(', ')}
      
      ## Social Profiles
      - ${profile.socialProfiles.map(social => `${social.platform}: ${social.url}`).join(', ')}
    `;

    return resumeContent;
  }

  static async getJobMarketTrends(): Promise<{
    emergingRoles: string[];
    inDemandSkills: string[];
    salaryTrends: { role: string; salaryRange: string }[];
    aiInsights: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      emergingRoles: [
        'AI/ML Engineer',
        'Data Scientist',
        'Cybersecurity Analyst'
      ],
      inDemandSkills: [
        'Python',
        'Data Analysis',
        'Cloud Computing'
      ],
      salaryTrends: [
        { role: 'AI/ML Engineer', salaryRange: '₹8L - ₹25L' },
        { role: 'Data Scientist', salaryRange: '₹6L - ₹20L' },
        { role: 'Cybersecurity Analyst', salaryRange: '₹5L - ₹15L' }
      ],
      aiInsights: 'The job market is witnessing a surge in demand for AI and data science roles. Acquiring skills in these areas can significantly boost your career prospects.'
    };
  }

  static async getPersonalizedRecommendations(userProfile: UserProfile): Promise<{
    jobRecommendations: JobListing[];
    trainingRecommendations: TrainingProgram[];
    schemeRecommendations: GovernmentScheme[];
    counselorRecommendations: CareerCounselor[];
    aiInsights: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const jobRecommendations = await this.getRecommendedJobs(userProfile);
    const trainingRecommendations = await this.getMatchingTrainingPrograms(userProfile);
    const schemeRecommendations = await this.getRelevantGovernmentSchemes(userProfile);
    const counselorRecommendations = await this.findCareerCounselors(userProfile);

    return {
      jobRecommendations,
      trainingRecommendations,
      schemeRecommendations,
      counselorRecommendations,
      aiInsights: 'Based on your profile, we recommend focusing on roles in AI and data science. Consider enrolling in relevant training programs and leveraging government schemes for financial assistance.'
    };
  }
}
