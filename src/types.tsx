export type Post = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  body: string;
  comment?: any;
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
