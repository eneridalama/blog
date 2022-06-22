import { CommentEntity } from './comment.model';
import { VoteEntity } from './vote.model';

export interface CreatePost {
  imageUrl: string;
  description: string;
  noComment: boolean;
}

export interface PageOf<MODEL> {
  list: MODEL;
  pageNo: number;
  pageSize: number;
  totalElements: number;
}

export interface PostEntity<MODEL> {
  id: number;
  imageUrl: string;
  description: string;
  noComment: boolean;
  comments: CommentEntity[];
  user: MODEL;
  votes: VoteEntity[];
}

export interface OnEdit {
  isDirty: boolean;
}
