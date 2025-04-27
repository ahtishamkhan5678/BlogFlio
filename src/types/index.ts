export interface ContentSection {
  type: 'text' | 'image' | 'quote' | 'highlight';
  content: string;
  style?: string;
  layout?: 'full' | 'left' | 'right' | 'center';
  imageUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  imageUrl: string;
  sections: ContentSection[];
}

export type BlogPostInput = Omit<BlogPost, 'id' | 'date'>;

export interface BlogState {
  posts: BlogPost[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
}

export type BlogAction = 
  | { type: 'ADD_POST'; payload: BlogPost }
  | { type: 'UPDATE_POST'; payload: BlogPost }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'SET_POSTS'; payload: BlogPost[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };