import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from '../globals/globals.service';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(public http: HttpClient, private globals: GlobalsService) { }

  getSports() {
    return this.http.get(`${this.globals.serviceBaseUrl}/api/sportsPublic`);
  }
}
