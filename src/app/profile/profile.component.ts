import { Component, OnInit } from '@angular/core';
import { ResponseModel } from '../core/model/auth.model';
import { PageOf, PostClass, PostEntity } from '../core/model/post.model';
import { UserModel } from '../core/model/user.model';
import { PostService } from '../core/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);
  posts: PostEntity<UserModel>[] = [];
  display: boolean = false;
  selectedPost: PostEntity<UserModel> = new PostClass;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService
      .getPost()
      .subscribe((res: ResponseModel<PageOf<PostEntity<UserModel>[]>>) => {
        this.posts = res.data && res.data.list.filter(item => item.user.id === this.currentUser.id);
        console.log('res1 ',res.data);
      });
  }

  displayDialog(post: PostEntity<UserModel>){
    this.display = true;
    this.selectedPost = post;
    console.log(this.selectedPost);
  }
}
