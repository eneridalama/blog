import { Component, OnInit } from '@angular/core';
import { CreatePost, PageOf, PostEntity } from '../core/model/post.model';
import { PostService } from '../core/services/post.service';
import { UserModel } from '../core/model/user.model';
import { ResponseModel } from '../core/model/auth.model';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class HomeComponent implements OnInit {
  posts: PostEntity<UserModel>[] = [];
  display: boolean = false;
  items: MenuItem[] = [];
  selectedPost: PostEntity<UserModel>;
  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);
  scrollDistance = 1;  
  scrollUpDistance = 2;  
  throttle = 10;

  constructor(
    private postService: PostService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.selectedPost = {
      id: 1,
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
  }

  ngOnInit() {
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
              if (this.selectedPost) {
                this.display = true;
              }
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
              this.confirm();
              console.log(this.selectedPost);
            },
          },
        ],
      },
    ];
  }

  showModal(event: boolean){
    this.display = event;
  }
  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete this post?',
        accept: () => {
          this.deletePost(this.selectedPost);
          this.deleteMessage();
        }
    });
}

  getPosts() {
    this.postService
      .getPost()
      .subscribe((res: ResponseModel<PageOf<PostEntity<UserModel>[]>>) => {
        this.posts = res.data && res.data.list;
        console.log('res1 ',res.data);
      });
  }

  createPost(event: PostEntity<UserModel>) {
    console.log('eventi ', event);
    this.posts.unshift(event);
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  share(id: number) {
    this.postService
      .getPostId(id)
      .subscribe((res: ResponseModel<PostEntity<UserModel>>) =>
        console.log(res)
      );
  }

  deletePost(post: PostEntity<UserModel>) {
    this.postService.deletePost(post.id).subscribe((item) =>{
    this.posts =  this.posts.filter(item => item.id != post.id)
    this.display = false;
    });
    // this.reloadCurrentPage();
  }

  onScrollDown() {  
    console.log('scrolled!!')
    
  }  

  deleteMessage() {
    this.messageService.add({
      key: 'deleteToast',
      severity: 'success',
      summary: 'Deleted',
      detail: 'Your post was deleted',
    });
}
}
