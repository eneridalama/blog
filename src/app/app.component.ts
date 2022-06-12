import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SocialApp';
  value = 'Clear me';
  items: MenuItem[] = [];
  

  ngOnInit() {
      this.items = [
          {
              label:'Home',
              icon:'pi pi-home',
              routerLink: ['/home'],
              
          },
          {
              label:'Trending',
              icon:'pi pi-chart-line',
              routerLink: ['/trending']
          },
          {
              label:'Notifications',
              icon:'pi pi-bell',
              routerLink: ['/notifications']
          }
      ];
  }    
}
