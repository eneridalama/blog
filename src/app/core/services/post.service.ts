import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseModel } from '../model/auth.model';
import { CreatePost, PageOf, PostEntity } from '../model/post.model';
import { environment } from 'src/environments/environment';
import { UserModel } from '../model/user.model';
import { tap } from 'rxjs';
import { SortPostsPipe } from 'src/app/shared/pipes/sort-posts.pipe';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url: string;

  constructor(
    private httpClient: HttpClient,
    private sortPostsPipe: SortPostsPipe
  ) {
    this.url = environment.baseUrl + '/post';
  }

  getPost() {
    return this.httpClient
      .get<ResponseModel<PageOf<PostEntity<UserModel>[]>>>(this.url)
      .pipe(
        tap((resp) => {
          this.sortPostsPipe.transform(resp.data.list);
        })
      );
  }

  getPostId(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id);
    return this.httpClient.get<ResponseModel<PostEntity<UserModel>>>(
      this.url + `/${id}`
    );
  }

  savePost(request: CreatePost) {
    return this.httpClient.post<ResponseModel<CreatePost>>(this.url, request);
  }

  editPost(request: PostEntity<UserModel>) {
    return this.httpClient
      .put<PostEntity<UserModel>>(this.url + `/${request.id}`, request)
      .subscribe((res) => console.log(res));
  }

  deletePost(id: number) {
    return this.httpClient.delete<ResponseModel<PostEntity<UserModel>>>(
      this.url + `/${id}`
    );
  }
}
