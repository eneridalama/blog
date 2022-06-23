import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from '../authentication/auth.service';
import { ResponseModel } from '../core/model/auth.model';
import { PageOf, PostEntity } from '../core/model/post.model';
import { UserModel } from '../core/model/user.model';
import { PostService } from '../core/services/post.service';

interface Language {
  name: string;
  value: string;
}
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [],
})
export class AdminDashboardComponent implements OnInit {
  isLoading: boolean = false;
  posts: PostEntity<UserModel>[] = [];
  // currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);
  lang: Language[] = [{ name: '', value: '' }];
  selected: string = 'en';

  constructor(
    private postService: PostService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private translateService: TranslateService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.primengConfig.ripple = true;
    this.lang = [
      { name: 'en', value: 'EN' },
      { name: 'al', value: 'AL' },
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

  deletePost(post: PostEntity<UserModel>) {
    this.postService.deletePost(post.id).subscribe((item) => {
      this.posts = this.posts.filter((item) => item.id != post.id);
      this.deleteMessage();
    });
  }

  selectLanguage(event: any) {
    console.log(event);
    this.translateService.use(event.value);
  }

  confirm(post: PostEntity<UserModel>) {
    this.confirmationService.confirm({
      message: this.translateService.instant('deletePostMessage'),
      accept: () => {
        this.deletePost(post);
      },
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
}
