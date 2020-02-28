import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeepInMemoryService {

  constructor() { }

  shouldSaveInMemory10Percents(numOfItemCalls: number, numOfAllCalls: number): boolean {
    return numOfItemCalls < numOfAllCalls * 0.1;
  }

  shouldSaveInMemory5Percents(numOfItemCalls: number, numOfAllCalls: number): boolean {
    return numOfItemCalls < numOfAllCalls * 0.05;
  }
}
