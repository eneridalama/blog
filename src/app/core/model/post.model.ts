import { CommentEntity } from './comment.model';
import { UserModel } from './user.model';
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

export class PostClass implements PostEntity<UserModel> {
  id = 1;
  imageUrl = '';
  description = '';
  noComment = false;
  comments = [];
  user = {
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    token: '',
    role: '',
  };
  votes = [];
}
