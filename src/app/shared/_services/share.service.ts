import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private subject = new Subject<any>();
  sendClickEvent() {
    // @ts-ignore
    this.subject.next();
  }
  getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }
}
