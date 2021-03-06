import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
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

  constructor(private postService: PostService,
    private messageService: MessageService,
    private translateService: TranslateService) { }

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

  deleteMessage() {
    this.messageService.add({
      key: 'deleteToast',
      severity: 'success',
      summary: this.translateService.instant('deleted'),
      detail: this.translateService.instant('deletedDetail'),
    });
  }


  displayDialog(post: PostEntity<UserModel>){
    this.display = true;
    this.selectedPost = post;
    console.log(this.selectedPost);
  }

  showModal(event: boolean){
    this.display = event;
    this.deleteMessage();
  }
}
