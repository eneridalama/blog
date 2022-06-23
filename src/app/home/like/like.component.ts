import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-like',
  template: `<i
    (click)="likePost()"
    [ngClass]="liked ? 'pi pi-heart-fill likeButton' : 'pi pi-heart'"
  ></i>`,
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent{
  liked: boolean = false;

  likePost() {
    this.liked = !this.liked;
  }
}
