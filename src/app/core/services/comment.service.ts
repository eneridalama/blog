import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseModel } from '../model/auth.model';
import { PageOf, PostEntity } from '../model/post.model';
import { environment } from 'src/environments/environment';
import { CommentEntity, OmitType } from '../model/comment.model';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl + '/post';
  }

  addComment(request: PostEntity<UserModel>, comment: OmitType) {
    return this.httpClient.post<ResponseModel<OmitType>>(this.url + `/${request.id}` + '/comment', comment);
  }

  deleteComment(postId: number, commentId: number) {
    return this.httpClient.delete<ResponseModel<CommentEntity>>(
      this.url + `/${postId}` + '/comment' + `/${commentId}`
    );
  }
}
