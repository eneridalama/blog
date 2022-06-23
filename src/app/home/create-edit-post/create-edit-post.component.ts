import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
        console.log('item undefiend ', item)
        this.createPostForm = this.initializeForm(item);
        console.log('forma ', this.createPostForm);
        
      }
    });
  }

  @ViewChild('contentRef') contentControl!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('imageRef') imageControl!: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createPostForm = this.initializeForm(null);
  }

  initializeForm(value: any): FormGroup {
    return this.formBuilder.group({
      description: new FormControl(value?.description, Validators.required),
      imageUrl: new FormControl(value?.imageUrl, Validators.required),
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
