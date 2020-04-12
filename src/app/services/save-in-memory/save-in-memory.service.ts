import { Injectable } from '@angular/core';
import {SensorState} from '../../interfaces/sensor-state.interface';

@Injectable({
  providedIn: 'root'
})
export class SaveInMemoryService {

  constructor() { }

  saveInMemory(key: string, newItem: SensorState): void {
    localStorage.setItem(key, JSON.stringify(newItem));
  }

  getFromMemory(key: string): SensorState {
    const savedItem: string = localStorage.getItem(key);
    let parsedItem: SensorState;

    if (savedItem) {
      try {
        parsedItem = JSON.parse(savedItem);
      } catch (e) {
        console.error('Error in parsing value', e);
      }
    }

    return parsedItem;
  }

  removeFromMemory(key: string) {
    localStorage.removeItem(key);
  }
}
