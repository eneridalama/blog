import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPostsPipe } from './pipes/sort-posts.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';

const comp = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
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
  ConfirmDialogModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  CardModule,
  DividerModule,
  MenuModule,
  DialogModule,
  MenubarModule,
  HttpClientModule,
  ReactiveFormsModule,
  ToastModule,
  InputSwitchModule,
  ConfirmDialogModule,
  SelectButtonModule,
  TableModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, comp],
  exports: [CommonModule, comp],
  providers: [SortPostsPipe],
})
export class SharedModule {}
