import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResponseModel } from 'src/app/core/model/auth.model';
import { CommentEntity } from 'src/app/core/model/comment.model';
import { PageOf, PostEntity } from 'src/app/core/model/post.model';
import { UserModel } from 'src/app/core/model/user.model';
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
  message: string = 'View';
  selectedComment: CommentEntity;
  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);

  @Input() post: PostEntity<UserModel> = {
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

  user: UserModel = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    token: '',
    role: '',
  };

  comment: CommentEntity = {
    id: 1,
    comment: '',
    user: this.user,
    post: this.post,
  };

  @ViewChild('commentRef') commentControl!: ElementRef<HTMLInputElement>;

  constructor(private commentService: CommentService) {
    this.selectedComment = {
      id: 1,
      comment: '',
      user: this.user,
      post: this.post,
    };
  }

  ngOnInit(): void {
    this.commentNumber = this.post.comments.length;
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  postComment() {
    const comment = this.commentControl.nativeElement.value;
    this.commentService
      .addComment(this.post, { comment })
      .subscribe((res) => console.log(res));
    this.reloadCurrentPage();
  }

  viewComments() {
    this.view = !this.view;
    this.view ? (this.message = 'Hide') : (this.message = 'View');
  }

  deleteComment(comment: CommentEntity) {
    this.commentService.deleteComment(this.post.id, comment.id).subscribe(res => console.log(res));
    this.reloadCurrentPage();
  }
}
