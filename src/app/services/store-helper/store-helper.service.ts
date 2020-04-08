import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SensorState} from '../../interfaces/sensor-state.interface';
import {ALL_KEY, defaultMapCallTimesValue} from '../../constants/item-keys.constant';

@Injectable({
  providedIn: 'root'
})
export class StoreHelperService {
  private mapOfBehaviourSubjects: Map<string, BehaviorSubject<SensorState>> = new Map<string, BehaviorSubject<SensorState>>();
  private mapNumOfCallTimes: Record<string, number> = {...defaultMapCallTimesValue};

  addNewItem(key: string, value: SensorState): Observable<SensorState> {
    this.addNewItemIntoBehaviourSubject(key, value);
    return this.getBehaviourSubjectAsObservable(key);
  }

  getValuesThread(key: string): Observable<SensorState> {
    return this.getBehaviourSubjectAsObservable(key);
  }

  getMapNumOfCallTimes(): Record<string, number> {
    return {...this.mapNumOfCallTimes};
  }

  clearMapNumOfCallTimes() {
   this.mapNumOfCallTimes = {...defaultMapCallTimesValue};
  }

  removeItem(key: string) {
    this.mapOfBehaviourSubjects.delete(key);
  }

  private getBehaviourSubjectAsObservable(key: string): Observable<SensorState> {
    try {
      this.mapNumOfCallTimes[key]++;
      this.mapNumOfCallTimes[ALL_KEY]++;
      const currentSubject = this.mapOfBehaviourSubjects.get(key);
      if (currentSubject) {
        return currentSubject.asObservable();
      } else {
        throw new Error('fail to get current subject');
      }
    } catch (err) {
      console.error('Failed to get Behaviour subject, ', err);
      return null;
    }
  }

  private addNewValueToBehaviourSubject(key: string, newValue: SensorState): boolean {
    try {
      this.mapOfBehaviourSubjects.get(key).next(newValue);
      return true;
    } catch (e) {
      console.error('Failed to add new Item', e);
      return false;
    }
  }

  private addNewItemIntoBehaviourSubject(newKey: string, newItem: SensorState): boolean {
    try {
      this.mapNumOfCallTimes[newKey] = 0;
      this.mapOfBehaviourSubjects.set(newKey, new BehaviorSubject<SensorState>(newItem));
      return true;
    } catch (err) {
      console.error('Failed to set new item into Behaviour subject, ', err);
      return false;
    }
  }
}
