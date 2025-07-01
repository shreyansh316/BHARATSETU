
export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  category: 'roads' | 'water' | 'electricity' | 'waste' | 'safety' | 'other';
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  photos: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'reported' | 'acknowledged' | 'in_progress' | 'resolved';
  reportedBy: string;
  reportedDate: string;
  estimatedResolution?: string;
  municipality: string;
}

export interface IssueUpdate {
  id: string;
  issueId: string;
  message: string;
  timestamp: string;
  author: string;
  type: 'status_update' | 'comment' | 'resolution';
}

export interface Municipality {
  id: string;
  name: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  responseTime: string;
  rating: number;
}

export class SamasyaReportService {
  static async reportIssue(issueData: Partial<CivicIssue>): Promise<CivicIssue> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newIssue: CivicIssue = {
      id: `issue_${Date.now()}`,
      title: issueData.title || '',
      description: issueData.description || '',
      category: issueData.category || 'other',
      location: issueData.location || {
        address: 'Unknown location',
        coordinates: { lat: 28.6139, lng: 77.2090 }
      },
      photos: issueData.photos || [],
      priority: this.calculatePriority(issueData.category || 'other'),
      status: 'reported',
      reportedBy: 'user123',
      reportedDate: new Date().toISOString(),
      municipality: 'Delhi Municipal Corporation'
    };

    return newIssue;
  }

  static async uploadPhoto(file: File): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate photo upload and return URL
    return `https://example.com/photos/${file.name}`;
  }

  static async trackIssue(issueId: string): Promise<{
    issue: CivicIssue;
    updates: IssueUpdate[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const issue: CivicIssue = {
      id: issueId,
      title: 'Pothole on Main Road',
      description: 'Large pothole causing traffic issues',
      category: 'roads',
      location: {
        address: 'Main Road, Sector 15, Delhi',
        coordinates: { lat: 28.6139, lng: 77.2090 }
      },
      photos: ['photo1.jpg', 'photo2.jpg'],
      priority: 'high',
      status: 'in_progress',
      reportedBy: 'user123',
      reportedDate: '2024-01-10T10:00:00Z',
      estimatedResolution: '2024-01-20',
      municipality: 'Delhi Municipal Corporation'
    };

    const updates: IssueUpdate[] = [
      {
        id: 'update_1',
        issueId,
        message: 'Issue reported and forwarded to road maintenance department',
        timestamp: '2024-01-10T10:30:00Z',
        author: 'System',
        type: 'status_update'
      },
      {
        id: 'update_2',
        issueId,
        message: 'Site inspection completed. Work order issued.',
        timestamp: '2024-01-12T14:00:00Z',
        author: 'Municipal Engineer',
        type: 'status_update'
      }
    ];

    return { issue, updates };
  }

  static async getNearbyIssues(coordinates: { lat: number; lng: number }): Promise<CivicIssue[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: 'issue_nearby_1',
        title: 'Broken Street Light',
        description: 'Street light not working since last week',
        category: 'electricity',
        location: {
          address: 'Park Street, Near coordinates',
          coordinates: { lat: coordinates.lat + 0.001, lng: coordinates.lng + 0.001 }
        },
        photos: [],
        priority: 'medium',
        status: 'acknowledged',
        reportedBy: 'user456',
        reportedDate: '2024-01-08T09:00:00Z',
        municipality: 'Local Municipal Corporation'
      }
    ];
  }

  static async getMunicipalityInfo(location: string): Promise<Municipality> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: 'muni_1',
      name: 'Delhi Municipal Corporation',
      contactInfo: {
        phone: '+91-11-23239370',
        email: 'info@dmc.gov.in',
        website: 'www.dmc.gov.in'
      },
      responseTime: '3-5 business days',
      rating: 4.2
    };
  }

  private static calculatePriority(category: string): 'low' | 'medium' | 'high' {
    const highPriorityCategories = ['safety', 'water'];
    const mediumPriorityCategories = ['electricity', 'roads'];
    
    if (highPriorityCategories.includes(category)) return 'high';
    if (mediumPriorityCategories.includes(category)) return 'medium';
    return 'low';
  }
}
