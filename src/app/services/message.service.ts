import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ChatMessage} from "../entities/chat-message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  /**
   * creates observable which notifies about new chat message
   */
  public createEventSourceForChatMessages() {
    return this.createGenericEventSource<ChatMessage>('http://localhost:8080/api/v1/chat-messages/stream-reactive', 'chat-message-event', true);
  }

  /**
   * internal helper for creating observables from event source
   * @param fullURI
   * @param parseAsJSON
   * @private
   */
  private createGenericEventSource<Type>(fullURI: string, eventNameFromBackend: string, parseAsJSON: boolean): Observable<Type> {

    //Natives Objekt/Klasse vom Browser, nicht von Angular!
    return new Observable(o => {
      const eventSource = new EventSource(fullURI);
      eventSource.addEventListener(eventNameFromBackend, (event) => {
        let entity = event.data;
        if (parseAsJSON) {
          entity = JSON.parse(entity);
        }
        o.next(entity);
      });
    });
  }

}
