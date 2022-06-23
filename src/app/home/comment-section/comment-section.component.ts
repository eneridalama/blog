import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommentEntity, CommentEntityClass } from 'src/app/core/model/comment.model';
import { PostClass, PostEntity } from 'src/app/core/model/post.model';
import { UserModel, UserModelClass } from 'src/app/core/model/user.model';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {
  comments: CommentEntity[] = [];
  commentNumber: number = 0;
  view: boolean = false;
  message: string = 'View';
  commentMessage: string = 'comments';
  selectedComment: CommentEntity;
  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);

  @Input() post: PostEntity<UserModel> = new PostClass;

  user: UserModel = new UserModelClass;
  comment: CommentEntity = new CommentEntityClass;

  @ViewChild('commentRef') commentControl!: ElementRef<HTMLInputElement>;

  constructor(
    private commentService: CommentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {
    this.selectedComment = {
      id: 1,
      comment: '',
      user: this.user,
      post: this.post,
    };
  }

  ngOnInit(): void {}

  postComment() {
    const comment = this.commentControl.nativeElement.value;
    this.commentService.addComment(this.post, { comment }).subscribe((res) => {
      console.log('res ', res.data);
      this.post.comments.push(res.data);
    });
    this.commentControl.nativeElement.value = '';
  }

  viewComments() {
    this.view = !this.view;
    
  }

  deleteComment(comment: CommentEntity) {
    this.commentService
      .deleteComment(this.post.id, comment.id)
      .subscribe((res) => {
        console.log(res);
        const index = this.post.comments.indexOf(comment);
        this.post.comments.splice(index, 1);
      });
  }

  confirm(comment: CommentEntity) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this comment?',
      accept: () => {
        this.deleteComment(comment);
        this.deleteMessage();
      },
    });
  }

  deleteMessage() {
    this.messageService.add({
      key: 'deleteToast',
      severity: 'success',
      summary: 'Deleted',
      detail: 'Your comment was deleted',
    });
  }
}
