import { PostClass, PostEntity } from './post.model';
import { UserModel, UserModelClass } from './user.model';

export interface CommentEntity {
  id: number;
  comment: string;
  user: UserModel;
  post: PostEntity<UserModel>;
}

export interface CreateComment {
  comment: string;
  postId: number;
}

export interface OmitType {
  comment: string;
}

export class CommentEntityClass implements CommentEntity {
  id = 1;
  comment = '';
  user!: UserModelClass;
  post!: PostClass;
}
