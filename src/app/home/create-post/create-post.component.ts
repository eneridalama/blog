import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { PostEntity } from 'src/app/core/model/post.model';
import { UserModel } from 'src/app/core/model/user.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  display = false;
  user = JSON.parse(localStorage.getItem('user')!);
  disableButton: boolean = true;
  isOff: boolean = false;
  image: string = '';
  content: string = '';
  @Input() currentUser: UserModel;
  @Output() post: EventEmitter<PostEntity<UserModel>> = new EventEmitter<
    PostEntity<UserModel>
  >();

  @ViewChild('contentRef') contentControl!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('imageRef') imageControl!: ElementRef<HTMLInputElement>;

  constructor(private postService: PostService) {
    this.currentUser = {
      id: 1,
      firstName: '',
      lastName: '',
      email: '',
      token: '',
      role: '',
    };
  }

  ngOnInit(): void {
  
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }

  createPost() {
    const content = this.contentControl.nativeElement.value;
    const image = this.imageControl.nativeElement.value;

    this.contentControl.nativeElement.value = '';
    this.imageControl.nativeElement.value = '';

    if (content && image) {
      this.postService
        .savePost({
          imageUrl: image,
          description: content,
          noComment: this.isOff,
        })
        .subscribe((res) => console.log(res));
      this.post.emit({
        id: 0,
        imageUrl: image,
        description: content,
        noComment: this.isOff,
        comments: [],
        user: this.currentUser,
        votes: [],
      });
    }
    this.display = false;
  }

  handleChange(e: any) {
    this.isOff = e.checked;
    console.log(e);
  }

  showDialog() {
    this.display = true;
  }

  
}
