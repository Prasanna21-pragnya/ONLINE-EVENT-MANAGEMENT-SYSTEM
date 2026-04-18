import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../Model/Event';
@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private _httpClient:HttpClient) { }
  BASE_URL:string="http://localhost:8089/event";

  getAllEvents():Observable<Event[]>{
    return this._httpClient.get<Event[]>(this.BASE_URL+"/getAllEvents");
  }

  addEvent(event:any) {
    return this._httpClient.post(this.BASE_URL+"/addEvent",event,{responseType:'JSON' as 'text'});
  }

  getEvent(eventId:number){
    return this._httpClient.get<any>(this.BASE_URL+"/getEvent/"+eventId);
  }

  editEvent(event:any){
    return this._httpClient.put(
      this.BASE_URL + "/updateEvent/" + event.eventId,
      event
    );
  }

  deleteEvent(eventId:number){
    return this._httpClient.delete(
      this.BASE_URL+"/deleteEvent/"+eventId,
      {responseType: 'JSON' as 'text'}
    );
  }

  getEventOrganizedByOrganizer(organizerId: number): Observable<Event[]> {
    return this._httpClient.get<Event[]>(
      this.BASE_URL + "/getEventByOrganizer/" + organizerId
    );
  }
}