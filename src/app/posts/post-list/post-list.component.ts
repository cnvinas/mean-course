import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  private postSub: Subscription;
  
  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostsUpdateListener()
    .subscribe((posts: Post[])=>{
      this.isLoading = false;
      this.posts = posts;
    });
    
  }

  constructor(public postsService: PostsService){}

  onDelete(postId){
    this.postsService.deletePost(postId);
  }

  onEdit(id){
    console.log(id);
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
