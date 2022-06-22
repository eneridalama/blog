import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from './authentication/auth.service';
import { UserModel } from './core/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SocialApp';
  value = 'Clear me';
  items: MenuItem[] = [];
  lang: any[] = [{ name: '', value: ''}];
  selected: string = 'en';  
  currentUser: UserModel = JSON.parse(localStorage.getItem('user')!);

  constructor(public authService: AuthService){}


  ngOnInit() {
      console.log(this.currentUser);
      

    this.lang = [
        { name: 'en', value: 'EN' },
        { name: 'al', value: 'AL' },
      ];
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
