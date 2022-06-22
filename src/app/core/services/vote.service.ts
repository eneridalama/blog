import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseModel } from '../model/auth.model';
import { PageOf } from '../model/post.model';
import { environment } from 'src/environments/environment';
import { VoteEntity } from '../model/vote.model';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl + '/post';
  }

  getVote(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id);
    return this.httpClient.get<ResponseModel<PageOf<VoteEntity>>>(
      this.url + `/${id}` + '/vote'
    );
  }

  upVote(postId: number) {
    return this.httpClient.patch<ResponseModel<VoteEntity>>(
      this.url + `/${postId}` + '/vote' + `/upVote`,
      this.upVote
    );
  }

  downVote(postId: number, voteId: number) {
    return this.httpClient.patch<ResponseModel<VoteEntity>>(
      this.url + `/${postId}` + '/vote' + `/downVote`,
      voteId
    );
  }
}
