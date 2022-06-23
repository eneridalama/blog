import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../core/model/user.model';
import { AuthService } from '../../authentication/auth.service';
import { PostEntity } from '../../core/model/post.model';

@Component({
  selector: 'app-profile-side-panel',
  templateUrl: './profile-side-panel.component.html',
  styleUrls: ['./profile-side-panel.component.scss'],
})
export class ProfileSidePanelComponent implements OnInit {
  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);
  constructor() {}

  ngOnInit(): void {}
}
