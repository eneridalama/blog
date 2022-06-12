import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FromNowPipe } from './shared/pipes/from-now.pipe';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { HomeComponent } from './home/home.component';
import { MenubarModule } from 'primeng/menubar';
import { CreatePostComponent } from './home/create-post/create-post.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './authentication/auth-interceptor.service';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { MenuComponent } from './home/menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileSidePanelComponent } from './home/profile-side-panel/profile-side-panel.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SharedModule } from './shared/shared.module';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {ToastModule} from 'primeng/toast';
import {SplitButtonModule} from 'primeng/splitbutton';
import { EditPostComponent } from './home/edit-post/edit-post.component';
import { CommentSectionComponent } from './home/comment-section/comment-section.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {AccordionModule} from 'primeng/accordion';
import { LikeComponent } from './home/like/like.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { InfiniteScrollDirective } from './shared/directives/infinite-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePostComponent,
    MenuComponent,
    PageNotFoundComponent,
    ProfileSidePanelComponent,
    LoginComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    EditPostComponent,
    CommentSectionComponent,
    LikeComponent,
    InfiniteScrollDirective,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TabViewModule,
    CardModule,
    ButtonModule,
    DividerModule,
    PanelModule,
    MenuModule,
    InputTextModule,
    DialogModule,
    MenubarModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    SplitButtonModule,
    InputTextModule,
    InputSwitchModule,
    AccordionModule,
    InfiniteScrollModule,
    ConfirmDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.clientID),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
