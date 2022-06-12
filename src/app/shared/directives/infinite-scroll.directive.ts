import { Directive } from '@angular/core';
import { PageOf, PostEntity } from 'src/app/core/model/post.model';
import { UserModel } from 'src/app/core/model/user.model';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {

  constructor() {
    
   }

  ngOnInit(){

  }

}
