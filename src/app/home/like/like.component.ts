import { Component, Input, OnInit } from '@angular/core';
import { VoteService } from 'src/app/core/services/vote.service';
import { PostEntity } from '../../core/model/post.model';
import { UserModel } from '../../core/model/user.model';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
  liked: boolean = false;
  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);
  @Input() post: PostEntity<UserModel>;

  constructor(private voteService: VoteService) {
    this.post = {
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

  ngOnInit(): void {}

  likePost(selectedPost: PostEntity<UserModel>) {
    this.liked = !this.liked;
    if (this.liked) {
      console.log();
      // this.voteService.upVote(postId: selectedPost.id)
      // this.post.votes =  [{id: 0, vote: 1, user: this.currentUser, post: selectedPost }];
      console.log(this.post.votes)
    }
  }
}
