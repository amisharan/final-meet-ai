export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  role: 'Owner' | 'Admin' | 'Member';
  status: 'Active' | 'Inactive';
  micOn: boolean;
  cameraOn: boolean;
  isSpeaking: boolean;
  handRaised: boolean;
}

export const mockParticipants: Participant[] = [
  { id: '1', name: 'Amisha Rana', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amisha&backgroundColor=b6e3f4', role: 'Owner', status: 'Active', micOn: true, cameraOn: true, isSpeaking: false, handRaised: false },
  { id: '2', name: 'Sonika', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sonika&backgroundColor=ffd5dc', role: 'Admin', status: 'Active', micOn: false, cameraOn: true, isSpeaking: false, handRaised: false },
  { id: '3', name: 'Priya', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=c0aede', role: 'Member', status: 'Active', micOn: true, cameraOn: true, isSpeaking: false, handRaised: false },
  { id: '4', name: 'Olibha', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olibha&backgroundColor=ffdfbf', role: 'Member', status: 'Active', micOn: false, cameraOn: false, isSpeaking: false, handRaised: false },
  { id: '5', name: 'Amrit', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amrit&backgroundColor=d1d4f9', role: 'Member', status: 'Active', micOn: true, cameraOn: true, isSpeaking: false, handRaised: false },
  { id: '6', name: 'Abhishek', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abhishek&backgroundColor=c0aede', role: 'Member', status: 'Active', micOn: false, cameraOn: true, isSpeaking: false, handRaised: false }
];
