export interface Language {
  code: string;
  name: string;
  flag: string;
  usage: 'Primary' | 'Active' | 'Supported';
  status: 'Active' | 'Beta' | 'Coming Soon';
  translationMode: 'Text & Voice' | 'Text Only';
}

export const mockLanguages: Language[] = [
  { code: 'hi', name: 'Hindi (हिंदी)', flag: '🇮🇳', usage: 'Primary', status: 'Active', translationMode: 'Text & Voice' },
  { code: 'en', name: 'English', flag: '🇬🇧', usage: 'Primary', status: 'Active', translationMode: 'Text & Voice' },
  { code: 'ta', name: 'Tamil (தமிழ்)', flag: '🇮🇳', usage: 'Active', status: 'Active', translationMode: 'Text & Voice' },
  { code: 'ur', name: 'Urdu (اردو)', flag: '🇵🇰', usage: 'Active', status: 'Active', translationMode: 'Text & Voice' },
  { code: 'ja', name: 'Japanese (日本語)', flag: '🇯🇵', usage: 'Active', status: 'Active', translationMode: 'Text & Voice' }
];
