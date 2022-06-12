import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user')!);
  username = this.user.firstName + ' ' + this.user.lastName;
  items: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-user',
        label: this.username,
        items: [
          {
            label: 'Log Out',
            command: (e) => localStorage.removeItem('user'),
            routerLink: ['/login'],
          },
        ],
      },
    ];
  }
}
