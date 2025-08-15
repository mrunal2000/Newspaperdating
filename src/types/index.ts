export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  title: string;
  location: string;
  description: string;
  image?: string;
  interests: string[];
  instagram?: string;
  twitter?: string;
  discord?: string;
  phoneNumber?: string;
  createdAt: Date;
  comments: Comment[];
}
