import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
  loadedPosts = [];
  apiUrl = "https://simple-angular-posts-default-rtdb.firebaseio.com/"
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http.post<Post>(this.apiUrl+"posts.json", postData).subscribe((data)=>{
      console.log(data)
    })
  }

  onFetchPosts() {
    this.http.get<{[key:string]: Post}>(this.apiUrl+'posts.json')
    .pipe(
      map((data: {[key:string]: Post}):Post[]=>{
        const postArray: Post[] = [];
        for (const eachKey in data){
          if (data.hasOwnProperty(eachKey))
          postArray.push({...data[eachKey], id :eachKey})
        }
        return postArray;
      })
    )
    .subscribe((data)=>
    console.log(data))
  }

  onClearPosts() {
    // Send Http request
  }
}
