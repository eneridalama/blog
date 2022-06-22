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
import { NgForm } from '@angular/forms';
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
  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);
  @Output() post: EventEmitter<PostEntity<UserModel>> = new EventEmitter<
    PostEntity<UserModel>
  >();

  @ViewChild('contentRef') contentControl!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('imageRef') imageControl!: ElementRef<HTMLInputElement>;

  constructor(private postService: PostService) {
    
  }

  ngOnInit(): void {
  
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }

  createPost(createPostForm: NgForm) {
  
    if (createPostForm.value.image && createPostForm.value.content) {
      this.postService
        .savePost({
          imageUrl: createPostForm.value.image,
          description: createPostForm.value.content,
          noComment: this.isOff,
        })
        .subscribe((res) => console.log(res));
      this.post.emit({
        id: 0,
        imageUrl: createPostForm.value.image,
        description: createPostForm.value.content,
        noComment: this.isOff,
        comments: [],
        user: this.currentUser,
        votes: [],
      });
    }
    createPostForm.reset();
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
