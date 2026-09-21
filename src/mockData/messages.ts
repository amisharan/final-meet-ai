export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export const mockChatMessages: ChatMessage[] = [
  { id: '1', senderId: '1', senderName: 'Amisha Rana', text: 'Can everyone hear me?', timestamp: '10:01 AM' },
  { id: '2', senderId: '2', senderName: 'Rahul', text: 'Yes, I can hear you.', timestamp: '10:01 AM' },
  { id: '3', senderId: '3', senderName: 'Priya', text: 'Loud and clear. Let\'s start the presentation.', timestamp: '10:02 AM' },
];

export interface TranslationMessage {
  id: string;
  speaker: string;
  timestamp: string;
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
}

export const mockTranslations: TranslationMessage[] = [
  {
    id: 't1',
    speaker: 'Amisha Rana',
    timestamp: '10:05 AM',
    originalText: 'Welcome everyone. Today we are going to discuss our project.',
    translatedText: 'सभी का स्वागत है। आज हम अपने प्रोजेक्ट पर चर्चा करने वाले हैं।',
    sourceLang: 'en',
    targetLang: 'hi'
  },
  {
    id: 't2',
    speaker: 'Rahul',
    timestamp: '10:06 AM',
    originalText: 'क्या हम पहले आर्किटेक्चर से शुरू कर सकते हैं?',
    translatedText: 'Can we start with the architecture first?',
    sourceLang: 'hi',
    targetLang: 'en'
  },
  {
    id: 't3',
    speaker: 'Amisha Rana',
    timestamp: '10:07 AM',
    originalText: 'Yes, absolutely. Let me share my screen.',
    translatedText: 'हाँ, बिल्कुल। मुझे अपनी स्क्रीन साझा करने दें।',
    sourceLang: 'en',
    targetLang: 'hi'
  }
];
