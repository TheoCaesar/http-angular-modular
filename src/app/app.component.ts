import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(this.apiUrl+"posts.json", postData).subscribe((data)=>{
      console.log(data)
    })
  }

  onFetchPosts() {
    this.http.get(this.apiUrl+'posts.json')
    .pipe(
      map((data)=>{
        const postArray = [];
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
