export interface Language {
  code: string;
  name: string;
  flag: string;
  usage: 'Primary' | 'Active' | 'Supported';
  status: 'Active' | 'Beta' | 'Coming Soon';
  translationMode: 'Text & Voice' | 'Text Only';
}

export const mockLanguages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧', usage: 'Primary', status: 'Active', translationMode: 'Text & Voice' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', usage: 'Active', status: 'Active', translationMode: 'Text & Voice' },
  { code: 'fr', name: 'French', flag: '🇫🇷', usage: 'Active', status: 'Active', translationMode: 'Text & Voice' },
  { code: 'de', name: 'German', flag: '🇩🇪', usage: 'Supported', status: 'Active', translationMode: 'Text & Voice' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', usage: 'Supported', status: 'Active', translationMode: 'Text & Voice' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', usage: 'Supported', status: 'Active', translationMode: 'Text Only' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', usage: 'Supported', status: 'Beta', translationMode: 'Text & Voice' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', usage: 'Supported', status: 'Beta', translationMode: 'Text & Voice' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', usage: 'Supported', status: 'Beta', translationMode: 'Text & Voice' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', usage: 'Supported', status: 'Active', translationMode: 'Text Only' }
];
