import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./app.component";

@Injectable({
    providedIn : 'root'
})
export class PostService{
    apiUrl = "https://simple-angular-posts-default-rtdb.firebaseio.com/posts.json"
    constructor(private http: HttpClient){}
    fetchPosts() {
      const subscr = this.http.get<{[key:string]: Post}>(this.apiUrl)      
        return subscr;
    }
    
    createPost(postData: Post){
        let customParams = new HttpParams()        
        .set('pretty', 'print')
        .append('next', 'second')      
        
        const configObject = { 
            headers : new HttpHeaders ({
                'custom-header': 'hello mother sucker'
            }),
            params : customParams,
        }
        const subscr = this.http.post<Post>(this.apiUrl, postData,
             configObject );
        return subscr;
    }

    deletePosts(){
        return this.http.delete(this.apiUrl);
    }
}