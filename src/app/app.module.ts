import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './authentication/auth-interceptor.service';
import { MenuComponent } from './shared/components/loading-spinner/menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileSidePanelComponent } from './home/profile-side-panel/profile-side-panel.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SharedModule } from './shared/shared.module';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { CommentSectionComponent } from './home/comment-section/comment-section.component';
import { LikeComponent } from './home/like/like.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilePostComponent } from './profile/profile-post/profile-post.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { CreateEditPostComponent } from './home/create-edit-post/create-edit-post.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    PageNotFoundComponent,
    ProfileSidePanelComponent,
    LoginComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    CommentSectionComponent,
    LikeComponent,
    AdminDashboardComponent,
    ProfileComponent,
    ProfilePostComponent,
    CreateEditPostComponent,
  ],
  imports: [
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    TranslateService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
