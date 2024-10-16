import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  getPcProcess: Subject<any[]> = new Subject();
  getPcBootTime: Subject<string> = new Subject();
  socket: WebSocket;
  constructor() {
    this.socket = new WebSocket(environment.websocketApi);
  }

  subscribeToSocketEvent() {
    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify({ event: 'join', clientId: 'client' }));
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      switch (data.event) {
        case 'process':
          this.getPcProcess.next(data.process);
          break;

        case 'status':
          this.getPcBootTime.next(data.status);
          break;

        default:
          break;
      }
    });
  }
}
