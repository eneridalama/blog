import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { ResponseModel } from 'src/app/core/model/auth.model';
import { PageOf, PostEntity } from 'src/app/core/model/post.model';
import { UserModel } from 'src/app/core/model/user.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss']
})
export class ProfilePostComponent implements OnInit {
  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);
  posts: PostEntity<UserModel>[] = []
  openEdit: boolean = false;
  @Input() post: PostEntity<UserModel> = {
    id: 0,
    imageUrl: '',
    description: '',
    noComment: false,
    comments: [],
    user: {
      id: 1,
      firstName: '',
      lastName: '',
      email: '',
      token: '',
      role: '',
    },
    votes: [],
  };

  items: MenuItem[] = [];
  display: boolean = false;

  constructor(
    private postService: PostService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.primengConfig.ripple = true;

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => {
              if (this.post) {
                this.display = true;
                this.openEdit = true
              }
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
              this.confirm();
              console.log(this.post);
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

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this post?',
      accept: () => {
        this.deletePost(this.post);
        this.deleteMessage();
      },
    });
  }

  deletePost(post: PostEntity<UserModel>) {
    this.postService.deletePost(post.id).subscribe((item) => {
      this.posts = this.posts.filter((item) => item.id != post.id);
      this.display = false;
    });
  }

  deleteMessage() {
    this.messageService.add({
      key: 'deleteToast',
      severity: 'success',
      summary: 'Deleted',
      detail: 'Your post was deleted',
    });
  }

  showModal(event: boolean){
    this.display = event;
  }
}
