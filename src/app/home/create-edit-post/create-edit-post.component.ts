import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostClass, PostEntity } from 'src/app/core/model/post.model';
import { UserModel } from 'src/app/core/model/user.model';

@Component({
  selector: 'app-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.scss']
})
export class CreateEditPostComponent implements OnInit {

  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);
  createPostForm: FormGroup = new FormGroup({});
  @Output() addedPost = new EventEmitter<PostEntity<UserModel>>();
  @Output() openModal = new EventEmitter<boolean>();
  editForm: PostEntity<UserModel> = new PostClass;
  @Input() 
  set object(item: any) {
    console.log('item ', item)
    setTimeout(() => {
      if (item !== undefined) {
        this.createPostForm = this.initializeForm(item);
      }
    });
  }

  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createPostForm = this.initializeForm(this.object);
  }

  initializeForm(value: any): FormGroup {
    return this.formBuilder.group({
      description: new FormControl(value?.title, Validators.required),
      imageUrl: new FormControl(value?.image, Validators.required),
    });
    
  }

  addPost() {
    this.addedPost.emit({
      id: 0,
        imageUrl: this.createPostForm.value.imageUrl,
        description: this.createPostForm.value.description,
        noComment: false,
        comments: [],
        user: this.currentUser,
        votes: [],
    });
    this.openModal.emit(false);
  }

  handleChange(event: boolean){
  }

  close() {
    this.openModal.emit(false);
  }
}
