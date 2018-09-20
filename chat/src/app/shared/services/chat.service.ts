import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  /**
   * Define an observable subject of type string for getting id
   */
  private idSubject: Subject<string> = new Subject<string>();
  currentId = this.idSubject.asObservable();

  constructor() { }

  /**
 * Broadcast the subject to the subscribers
 * @param id id of client in chat
 */
  public sendId(id: string) {
    this.idSubject.next(id);
  }

    /**
 * Method allowing classes to subscribe to the subject
 */
  public getId(): Observable <string> {
    return this.idSubject.asObservable();
  }



}
