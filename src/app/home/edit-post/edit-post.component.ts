import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,EventEmitter 
} from '@angular/core';
import { PostEntity } from 'src/app/core/model/post.model';
import { UserModel } from 'src/app/core/model/user.model';
import { PostService } from 'src/app/core/services/post.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  isOff: boolean = false;
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

  @Output() display = new EventEmitter<boolean>();
  @ViewChild('contentRef') contentControl!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('imageRef') imageControl!: ElementRef<HTMLInputElement>;

  user = JSON.parse(localStorage.getItem('user')!);

  constructor(private postService: PostService) {}

  ngOnInit(): void {
  }

  savePost() {
    this.post.description = this.contentControl.nativeElement.value;
    this.post.noComment = this.isOff;
    this.post.imageUrl = this.imageControl.nativeElement.value;
    console.log('edited event', this.post)
    this.postService.editPost(this.post);
    this.display.emit(false);
  }

  
  handleChange(e: any) {
    this.isOff = e.checked;
    console.log(e);
  }

}
