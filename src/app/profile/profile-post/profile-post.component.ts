import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { ResponseModel } from 'src/app/core/model/auth.model';
import { PageOf, PostClass, PostEntity } from 'src/app/core/model/post.model';
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
  @Input() post: PostEntity<UserModel> = new PostClass;

  items: MenuItem[] = [];
  display: boolean = false;

  constructor(
    private postService: PostService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.primengConfig.ripple = true;

    this.initializeMenuItems();
  }

  initializeMenuItems(){
    this.items = [
      {
        label: this.translateService.instant('options'),
        items: [
          {
            label: this.translateService.instant('edit'),
            icon: 'pi pi-pencil',
            command: () => {
              if (this.post) {
                this.display = true;
                this.openEdit = true
              }
            },
          },
          {
            label: this.translateService.instant('delete'),
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

  editPost(event: PostEntity<UserModel>) {
    console.log(event);
    if (this.openEdit) {
      const index = this.posts.indexOf(this.post);
      this.posts.map((item, indx) => {
        console.log(index);
        if (index === indx) {
          this.posts[index] = event;
        }
      });
      this.post.description = event.description;
      this.post.imageUrl = event.imageUrl;
      this.postService.editPost(this.post);
      this.openEdit = false;
    }
  }

  confirm() {
    this.confirmationService.confirm({
      message: this.translateService.instant('deletePostMessage'),
      accept: () => {
        this.deletePost(this.post);
        this.deleteMessage();
      },
      key: "profilePost"
    });
    this.display = false;
  }

  deletePost(post: PostEntity<UserModel>) {
    this.postService.deletePost(post.id).subscribe((item) => {
      this.posts = this.posts.filter((item) => item.id != post.id);
    });
    this.display = false;
  }

  deleteMessage() {
    this.messageService.add({
      key: 'deleteToast',
      severity: 'success',
      summary: this.translateService.instant('deleted'),
      detail: this.translateService.instant('deletedDetail'),
    });
  }

  showModal(event: boolean){
    this.display = event;
  }
}
