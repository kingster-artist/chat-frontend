import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {ChatMessage} from "../../entities/chat-message";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public messages: ChatMessage[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    const messageObserver = this.messageService.createEventSourceForChatMessages();
    messageObserver.subscribe(message => {
      this.messages.unshift(message);
      this.messages = this.messages.slice(0, 20);
    });
  }


}
