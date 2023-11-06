import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }

  data=new BehaviorSubject(null)
}
