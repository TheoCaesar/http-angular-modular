import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const dummyRequest = req.clone()
        dummyRequest.headers.append('custom-header', 'hi mother socker')
        console.log(dummyRequest.headers)
        return next.handle(dummyRequest).pipe(
            tap((response)=>{
                if (response.type === HttpEventType.Response) {
                    // console.dir(response.statusText)
                }
            })
        )
    }
}