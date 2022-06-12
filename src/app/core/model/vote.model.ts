import { PostEntity } from './post.model';
import { UserModel } from './user.model';

export interface VoteEntity {
  id: number;
  vote: number;
  user: UserModel;
  post: PostEntity<UserModel>;
}
