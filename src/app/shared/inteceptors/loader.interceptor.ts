import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoaderService} from "@shared/services/loaderService/loader.service";
import {forkJoin} from "rxjs";

@Injectable() export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private loaderService: LoaderService) { }
  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    this.requests.splice(i, 1);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.isLoading.next(false);
    // We create a new observable which we return instead of the original
    return Observable.create((observer: any) => {
      // And subscribe to the original observable to ensure the HttpRequest is made
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => { this.loaderService.isLoading.next(true); observer.error(err); },
          () => { this.loaderService.isLoading.next(true); observer.complete(); });
      // return teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
