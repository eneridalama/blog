import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './authentication/auth-interceptor.service';
import { MenuComponent } from './shared/components/loading-spinner/menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileSidePanelComponent } from './home/profile-side-panel/profile-side-panel.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SharedModule } from './shared/shared.module';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import {ToastModule} from 'primeng/toast';
import {SplitButtonModule} from 'primeng/splitbutton';
import { CommentSectionComponent } from './home/comment-section/comment-section.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {AccordionModule} from 'primeng/accordion';
import { LikeComponent } from './home/like/like.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import {TableModule} from 'primeng/table';
import { ProfilePostComponent } from './profile/profile-post/profile-post.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './authentication/auth.guard';
import { CreateEditPostComponent } from './home/create-edit-post/create-edit-post.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
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
    SelectButtonModule,
    TableModule,
    DropdownModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader:{

        
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    TranslateService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
