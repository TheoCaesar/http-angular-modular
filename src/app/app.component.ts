import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostService } from './posts.service';

export interface Post {
  id?:string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createPost(postData).subscribe((data)=>{
      console.log(data)
    })
  }

  onFetchPosts() {
    this.isFetching = true;
    setTimeout(() => {
      this.postService.fetchPosts().pipe(
        map((data: {[key:string]: Post}):Post[]=>{
          const postArray: Post[] = [];
          for (const eachKey in data){
            if (data.hasOwnProperty(eachKey))
            postArray.push({...data[eachKey], id :eachKey})
          }
          return postArray;
        })
      )
      .subscribe((data)=> {
        this.isFetching = false; 
        this.loadedPosts = data
      },
      (err) => {
        console.dir(err);
        this.isFetching = false;
        this.error = err
      })
    }, 300);
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(      
      ()=>this.onFetchPosts())
  }
}
