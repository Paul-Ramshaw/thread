export interface IComment {
  comment_id: number;
  body: string;
  vote?: 0;
  author: string;
  article_id: number;
  created_at?: string;
  justSubmitted?: boolean;
}
