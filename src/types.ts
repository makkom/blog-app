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
