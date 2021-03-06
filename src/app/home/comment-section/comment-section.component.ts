import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  CommentEntity,
  CommentEntityClass,
} from 'src/app/core/model/comment.model';
import { PostClass, PostEntity } from 'src/app/core/model/post.model';
import { UserModel, UserModelClass } from 'src/app/core/model/user.model';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit {
  comments: CommentEntity[] = [];
  commentNumber: number = 0;
  view: boolean = false;
  selectedComment: CommentEntity;
  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);

  @Input() post: PostEntity<UserModel> = new PostClass();

  user: UserModel = new UserModelClass();
  comment: CommentEntity = new CommentEntityClass();

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
    this.deleteMessage();
  }

  confirm(comment: CommentEntity) {
    if (this.selectedComment) {
      this.confirmationService.confirm({
        key: 'commentKey',
        message: this.translateService.instant('deleteCommentMessage'),
        accept: () => {
          this.deleteComment(comment);
          this.confirmationService.close();
        },
        reject: () => {
          this.confirmationService.close();
        },
      });
    }
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
