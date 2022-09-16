export interface IComment {
  comment_id: number;
  body: string;
  vote?: 0;
  author: string;
  article_id: number | string;
  created_at?: string;
  justSubmitted?: boolean;
}
