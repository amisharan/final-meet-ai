export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  languages: string[];
  status: 'Live' | 'Scheduled' | 'Completed';
  type: string;
}

export const mockMeetings: Meeting[] = [
  { id: '101', title: 'MCA Project Discussion', date: 'Today', time: '10:00 AM', duration: '45 min', participants: 4, languages: ['en', 'hi'], status: 'Completed', type: 'Translation Meeting' },
  { id: '102', title: 'Global Team Sync', date: 'Today', time: '02:00 PM', duration: '60 min', participants: 12, languages: ['en', 'fr', 'es'], status: 'Live', type: 'Standard Meeting' },
  { id: '103', title: 'Client Presentation', date: 'Tomorrow', time: '11:00 AM', duration: '30 min', participants: 3, languages: ['en', 'ja'], status: 'Scheduled', type: 'Presentation' },
  { id: '104', title: 'Architecture Review', date: 'Oct 12', time: '04:00 PM', duration: '90 min', participants: 6, languages: ['en'], status: 'Completed', type: 'Standard Meeting' },
  { id: '105', title: 'Interview with Maria', date: 'Oct 15', time: '09:30 AM', duration: '45 min', participants: 2, languages: ['en', 'es'], status: 'Scheduled', type: 'Interview' },
];
