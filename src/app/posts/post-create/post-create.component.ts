import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { mimeType } from './mime-type.validator';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle: string = "";
  enteredContent: string = "";
  post: Post;
  isLoading: boolean = false;
  imagePreview: string;
  form: FormGroup;
  private mode: string = 'create';
  private postId: string;

  constructor(public postsService: PostsService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    })
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        
        this.postsService.getPost(this.postId).subscribe((postData)=>{
          this.isLoading = false;
          this.post = {
            id: postData._id, 
            title: postData.title, 
            content: postData.content,
            image: postData.image
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.image
          })
        });
       
      } else {
        this.mode = 'create';
        this.postId = null;
        this.isLoading = false;

      }
    })
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0]; 
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);

  }


  onSavePost(){
    debugger;
    if(this.form.invalid){
      return;
    }

    if(this.mode === 'create'){
      this.postsService.addPosts(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

}
