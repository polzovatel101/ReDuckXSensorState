import {Component, OnInit} from '@angular/core';
import {StoreHelperService} from './store/store-helper/store-helper.service';
import {WebSocketService} from './store/websocket/web-socket.service';
import {FirstSensorWsUrl} from './constants/web-socket-urls';
import {SensorState} from './interfaces/sensor-state.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ReDuckX';
  currentTemperature: string;
  currentPressure: string;
  currentHumidity: string;

  private currentWS: WebSocket;

  constructor(private storeHelperService: StoreHelperService,
              private webSocketService: WebSocketService,
              ) {
  }

  ngOnInit(): void {
    this.webSocketService.openNewWebSocket(FirstSensorWsUrl);
    this.currentWS = this.webSocketService.getWebSocket(FirstSensorWsUrl);
    this.currentWS.onopen = this.onOpenWS;
    this.currentWS.onmessage = this.onNewMessage;
  }

  private onOpenWS() {
    this.storeHelperService
      .addNewItem(FirstSensorWsUrl, {} as any)
      .subscribe((newValue: SensorState) => {
        this.setNewSensorState(newValue);
      });
  }

  private onNewMessage(newState: MessageEvent) {
    this.storeHelperService.addNewValue(FirstSensorWsUrl, newState.data);
  }

  private setNewSensorState(newSensorState: SensorState) {
    this.currentTemperature = newSensorState.temperature + 'C';
    this.currentPressure = newSensorState.pressure + 'atm';
    this.currentHumidity = newSensorState.humidity + '%';
  }
}
