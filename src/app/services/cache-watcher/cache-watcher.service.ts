import { Injectable } from '@angular/core';
import {SaveInMemoryService} from '../save-in-memory/save-in-memory.service';
import {StoreHelperService} from '../store-helper/store-helper.service';
import {first} from 'rxjs/operators';
import {SensorState} from '../../interfaces/sensor-state.interface';
import {ALL_KEY} from '../../constants/item-keys.constant';

@Injectable({
  providedIn: 'root'
})
export class CacheWatcherService {

  constructor(private saveInMemoryService: SaveInMemoryService,
              private storeHelperService: StoreHelperService) { }

  watchCache(timeToCheck: number): void {
    setInterval(() => {
      const callTimes = this.storeHelperService.getMapNumOfCallTimes();
      console.log('callTimes: ', callTimes);
      this.decideSaveToCache(callTimes, callTimes[ALL_KEY], 10);
    }, timeToCheck);
  }

  private decideSaveToCache(callTimesRecord: Record<string, number>, sumOfCalls: number, percentage: number) {
    Object.keys(callTimesRecord).forEach((recordKey: string) => {
      if (this.timeOfCallsBiggerThenNeeded(callTimesRecord[recordKey], sumOfCalls, percentage)) {
        const dataRecord = this.saveInMemoryService.getFromMemory(recordKey);
        if (dataRecord) {
          this.storeHelperService.addNewItem(recordKey, dataRecord);
          // TODO: delete from memory
        }
      } else if (recordKey !== ALL_KEY) {
        this.storeHelperService.getValuesThread(recordKey)
          .pipe(first())
          .subscribe((value: SensorState) => {
            this.saveInMemoryService.saveInMemory(recordKey, value);
            this.storeHelperService.removeItem(recordKey);
          });
      }
    });

    this.storeHelperService.clearMapNumOfCallTimes();
  }

  private timeOfCallsBiggerThenNeeded(calledTimes: number, sumOfCalls: number, percentage: number): boolean {
    return (calledTimes > (percentage / 100 * sumOfCalls));
  }
}
