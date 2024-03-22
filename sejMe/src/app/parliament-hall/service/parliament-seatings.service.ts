import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParliamentSeatingData } from '../model/parlament-seating-data';
import { AVAILABLE_SEATINGS } from '../data/available-seatings.data';

@Injectable({ providedIn: 'root' })
export class ParliamentSeatService {
  constructor(private http: HttpClient) {}

  getSeatingData(seatingDate: (typeof AVAILABLE_SEATINGS)[number]) {
    return this.http.get<ParliamentSeatingData>(
      `/assets/parliament-seats-layout/${seatingDate}.json`
    );
  }

  getLastSeatingData() {
    const lastSeatingDate = AVAILABLE_SEATINGS[AVAILABLE_SEATINGS.length - 1];
    return this.getSeatingData(lastSeatingDate);
  }
}
