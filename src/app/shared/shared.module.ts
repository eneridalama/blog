import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromNowPipe } from './pipes/from-now.pipe';
import { TabViewModule } from 'primeng/tabview';
import { SortPostsPipe } from './pipes/sort-posts.pipe';




const comp = [TabViewModule]

@NgModule({
  declarations: [ FromNowPipe],
  imports: [
    CommonModule,
    comp
  ],
  exports: [FromNowPipe],
  providers: [SortPostsPipe]
})
export class SharedModule { }
