import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/authentication/auth.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('user')!);
  username = this.currentUser.firstName + ' ' + this.currentUser.lastName;
  items: MenuItem[] = [];
  isDarkMode: boolean = false;
  lang: any;
  selected: string = 'en';

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService,
    private authService: AuthService
  ) {}

  selectLanguage(event: any) {
    this.translateService.use(event.value);
  }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initializeMenuItems();
  });
    this.lang = [
      { name: 'en', value: 'EN' },
      { name: 'al', value: 'AL' },
    ];
    
    this.initializeMenuItems();
    
  }

  initializeMenuItems(){
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
              this.authService.logout();
              this.themeService.switchTheme('lara-light-blue');
            }
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
