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
  { id: '1', name: 'Amisha Rana', role: 'Owner', status: 'Active', micOn: true, cameraOn: true, isSpeaking: false, handRaised: false },
  { id: '2', name: 'Sonika', role: 'Admin', status: 'Active', micOn: false, cameraOn: true, isSpeaking: false, handRaised: false },
  { id: '3', name: 'Priya', role: 'Member', status: 'Active', micOn: true, cameraOn: true, isSpeaking: false, handRaised: false },
  { id: '4', name: 'olibha', role: 'Member', status: 'Active', micOn: false, cameraOn: false, isSpeaking: false, handRaised: false },
  { id: '5', name: 'Amrit', role: 'Member', status: 'Active', micOn: true, cameraOn: true, isSpeaking: false, handRaised: false },
  { id: '6', name: 'Abhishek', role: 'Member', status: 'Active', micOn: false, cameraOn: true, isSpeaking: false, handRaised: false }
];
