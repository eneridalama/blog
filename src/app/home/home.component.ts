import { Component, OnInit } from '@angular/core';
import { PageOf, PostClass, PostEntity } from '../core/model/post.model';
import { PostService } from '../core/services/post.service';
import { UserModel } from '../core/model/user.model';
import { ResponseModel } from '../core/model/auth.model';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: PostEntity<UserModel>[] = [];
  display: boolean = false;
  openEdit: boolean = false;
  openModal: boolean = false;
  items: MenuItem[] = [];
  selectedPost: PostEntity<UserModel> = new PostClass();
  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private postService: PostService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getPosts();
    this.primengConfig.ripple = true;
    this.initializeMenuItem();
  }

  initializeMenuItem() {
    this.items = [
      {
        label: this.translateService.instant('options'),
        items: [
          {
            label: this.translateService.instant('edit'),
            icon: 'pi pi-pencil',
            command: () => {
              if (this.selectedPost) {
                this.openEdit = true;
                this.openModal = true;
              }
            },
          },
          {
            label: this.translateService.instant('delete'),
            icon: 'pi pi-trash',
            command: () => {
              this.confirm();
            },
          },
        ],
      },
    ];
  }

  getPosts() {
    this.postService
      .getPost()
      .subscribe((res: ResponseModel<PageOf<PostEntity<UserModel>[]>>) => {
        this.posts = res.data && res.data.list;
        console.log('res1 ', res.data);
      });
  }

  handlePost(event: PostEntity<UserModel>) {
    console.log(event);
    if (!this.openEdit) {
      this.createPost(event);
    } else {
      this.editPost(event);
    }
  }

  createPost(event: PostEntity<UserModel>) {
    this.posts.unshift(event);
    this.postService
      .savePost({
        imageUrl: event.imageUrl,
        description: event.description,
        noComment: event.noComment,
      })
      .subscribe();
  }

  editPost(event: PostEntity<UserModel>) {
    const index = this.posts.indexOf(this.selectedPost);
    this.posts.map((item, indx) => {
      if (index === indx) {
        this.posts[index] = event;
      }
    });
    this.selectedPost.description = event.description;
    this.selectedPost.imageUrl = event.imageUrl;
    this.selectedPost.noComment = event.noComment;
    this.postService.editPost(this.selectedPost);
    this.openEdit = false;
  }

  deletePost(post: PostEntity<UserModel>) {
    if (post.id) {
      this.postService.deletePost(post.id).subscribe((item) => {
        this.posts = this.posts.filter((item) => item.id != post.id);
        this.display = false;
      });
    } else {
      this.posts = this.posts.filter((item) => item.id != 0);
    }
    this.deleteMessage();
  }

  deleteMessage() {
    this.messageService.add({
      key: 'deleteToast',
      severity: 'success',
      summary: 'Deleted',
      detail: 'Your post was deleted',
    });
  }

  confirm() {
    this.confirmationService.confirm({
      key: 'homeKey',
      message: this.translateService.instant('deletePostMessage'),
      accept: () => {
        this.deletePost(this.selectedPost);
      },
    });
  }

  showModal(value: boolean) {
    this.openModal = value;
    this.selectedPost = new PostClass();
  }

  showDialog() {
    this.display = true;
    this.openModal = true;
    this.openEdit = false;
  }
}
