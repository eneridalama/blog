import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostEntity } from 'src/app/core/model/post.model';
import { UserModel } from 'src/app/core/model/user.model';

@Component({
  selector: 'app-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.scss']
})
export class CreateEditPostComponent implements OnInit {

  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);
  createPostForm: FormGroup = new FormGroup({});
  isOff: boolean = false;
  
  @Output() addedPost = new EventEmitter<PostEntity<UserModel>>();
  @Output() openModal = new EventEmitter<boolean>();
  @Input() 
  set object(item: any) {
    setTimeout(() => {
      if (item !== undefined) {
        this.createPostForm = this.initializeForm(item);
      }
    });
  }

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
        noComment: this.isOff,
        comments: [],
        user: this.currentUser,
        votes: [],
    });
    this.openModal.emit(false);
  }

  handleChange(e: any) {
    this.isOff = e.checked;
  }

  close() {
    this.openModal.emit(false);
  }
}
