import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user')!);
  username = this.user.firstName + ' ' + this.user.lastName;
  items: MenuItem[] = [];
  isDarkMode: boolean = false;
  lang: any;
  selected: string = 'en';

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService
  ) {}

  selectLanguage(event: any) {
    console.log(event);
    this.translateService.use(event.value);
  }

  ngOnInit(): void {
    this.lang = [
      { name: 'en', value: 'EN' },
      { name: 'al', value: 'AL' },
    ];

    this.items = [
      {
        icon: 'pi pi-user',
        label: this.username,
        items: [
          {
            label: this.translateService.instant('profile'),
            routerLink: ['/profile'],
          },
          {
            label: this.translateService.instant('switchTheme'),
            command: (e) => this.handleChange(),
          },
          {
            label: this.translateService.instant('logout'),
            command: (e) => {
              localStorage.removeItem('user');
              this.themeService.switchTheme('lara-light-blue');
            },
            routerLink: ['/login'],
          },
        ],
      },
    ];
  }

  handleChange() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.themeService.switchTheme('vela-blue');
    } else {
      this.themeService.switchTheme('lara-light-blue');
    }
  }
}
