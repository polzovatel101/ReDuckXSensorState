import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StoreHelperService} from './services/store-helper/store-helper.service';
import {WebSocketService} from './services/websocket/web-socket.service';
import {SensorWsUrl} from './constants/web-socket-urls';
import {SensorState} from './interfaces/sensor-state.interface';
import {CacheWatcherService} from './services/cache-watcher/cache-watcher.service';

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
  sensor: string;

  private currentWS: WebSocket;

  constructor(private storeHelperService: StoreHelperService,
              private webSocketService: WebSocketService,
              private cacheWatcherService: CacheWatcherService) {
  }

  ngOnInit(): void {
    this.webSocketService.openNewWebSocket(SensorWsUrl);
    this.currentWS = this.webSocketService.getWebSocket(SensorWsUrl);
    this.currentWS.onopen = () => this.onOpenWS();
    this.currentWS.onmessage = (event: MessageEvent) => this.onNewMessage(event);
  }

  private onOpenWS() {
    this.cacheWatcherService.watchCache(10000);
  }

  private onNewMessage(newState: MessageEvent) {
    let newData;
    try {
      newData = JSON.parse(newState.data);
    } catch (e) {
      console.error('Problem with response');
    }
    this.storeHelperService.addNewItem(newData.sensor, newData);
    this.setNewSensorState(newData);
  }

  private setNewSensorState(newSensorState: SensorState) {
    this.sensor = newSensorState.sensor;
    this.currentTemperature = newSensorState.temperature + 'C';
    this.currentPressure = newSensorState.pressure + 'atm';
    this.currentHumidity = newSensorState.humidity + '%';
  }
}
