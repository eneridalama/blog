import { PostEntity} from "./post.model";
import { UserModel } from "./user.model";

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