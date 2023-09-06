import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ChatMessage} from "../entities/chat-message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public createEventSourceForChatMessages() {
    return this.createGenericEventSource<ChatMessage>('http://localhost:8080/api/v1/chat-messages/stream-reactive', true);
  }

  public createEventSourceForTestObjects(): Observable<ChatMessage> {
    return this.createGenericEventSource<ChatMessage>('http://localhost:8080/api/v1/testobjects/stream-reactive', false);
  }

  private createGenericEventSource<Type>(fullURI: string, parseAsJSON: boolean): Observable<Type> {

    //Natives Objekt/Klasse vom Browser, nicht von Angular!
    return new Observable(o => {
      const eventSource = new EventSource(fullURI);
      eventSource.addEventListener('chat-message-event', (event) => {
        let entity = event.data;
        if (parseAsJSON) {
          entity = JSON.parse(entity);
        }
        o.next(entity);
      });
    });
  }

}
