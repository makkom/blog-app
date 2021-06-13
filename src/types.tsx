export type Post = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  body: string;
  like?: number;
};

export type Posts = {
  posts: Post[];
};

export type User = {
  user: {
    email: any;
    password: any;
    auth: boolean;
  };
};
