import { Injectable } from '@angular/core';
import {SensorState} from '../../interfaces/sensor-state.interface';

@Injectable({
  providedIn: 'root'
})
export class SaveInMemoryService {

  constructor(private localStorage: Storage) { }

  saveInMemory(key: string, newItem: SensorState): void {
    this.localStorage.setItem(key, newItem.toString());
  }

  getFromMemory(key: string): SensorState {
    const savedItem: string = this.localStorage.getItem(key);
    return JSON.parse(savedItem);
  }
}
