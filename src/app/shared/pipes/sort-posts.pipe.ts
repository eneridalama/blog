import { Pipe, PipeTransform } from '@angular/core';
import { PostEntity } from '../../core/model/post.model';
import { UserModel } from '../../core/model/user.model';

@Pipe({
  name: 'sortPosts'
})
export class SortPostsPipe implements PipeTransform {

  transform(posts: PostEntity<UserModel>[]): PostEntity<UserModel>[] {

    const sortedPosts = posts.reverse();
    console.log('posts ',posts)

    console.log('sortedPosts',sortedPosts)
    return sortedPosts;
  }

}
