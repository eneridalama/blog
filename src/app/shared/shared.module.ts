import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { SortPostsPipe } from './pipes/sort-posts.pipe';




const comp = [TabViewModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    comp
  ],
  exports: [],
  providers: [SortPostsPipe]
})
export class SharedModule { }
