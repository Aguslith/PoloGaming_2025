
export interface User {
  name: string;
  role: string;
  avatar: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  type: 'tournament' | 'workshop' | 'release';
  description: string;
  image: string;
}

export interface PCComponent {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  specs: Record<string, string>;
}
