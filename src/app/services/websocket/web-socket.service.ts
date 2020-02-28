import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private mapOfWebSockets: Map<string, WebSocket> = new Map<string, WebSocket>();

  constructor() { }

  openNewWebSocket(url: string) {
    this.mapOfWebSockets.set(url, new WebSocket(url));
  }

  getWebSocket(url: string): WebSocket {
    return this.mapOfWebSockets.get(url);
  }
}
