import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventServiceService } from 'src/app/Utilities/APIServices/event-service.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  
  
  id:any;
  event:any;
  editEventForm: FormGroup = this._fb.group({
    eventName: [''],
    eventCategory: [''],
    eventVenue: [''],
    eventDate: [''],
    eventTime: [''],
    eventPrice: [''],
    eventDescription: ['']
  });

  constructor(
    private _fb:FormBuilder,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    private _eventService:EventServiceService
  ) {}


  ngOnInit(): void {

  if(sessionStorage.getItem("login") == null || 
     sessionStorage.getItem("role")!="organizer") {
    this._router.navigate(["/page_not_found"]);
  }

  this._activatedRoute.params.subscribe(params => {
    this.id = params['id'];

    this._eventService.getEvent(this.id).subscribe((response:any) => {

      console.log("Event Data:", response);

      this.editEventForm.patchValue({
        eventName: response.name,
        eventCategory: response.category,
        eventVenue: response.venue,
        eventDate: response.date,
        eventTime: response.time,
        eventPrice: response.price,
        eventDescription: response.description
      });

      this.event = response;
    });
  });
}
  editEvent() {

  const updatedEvent = {
    eventId: this.id,
    name: this.editEventForm.value.eventName,
    category: this.editEventForm.value.eventCategory,
    venue: this.editEventForm.value.eventVenue,
    date: this.editEventForm.value.eventDate,
    time: this.editEventForm.value.eventTime,
    price: this.editEventForm.value.eventPrice,
    description: this.editEventForm.value.eventDescription,
    user: { userId: Number(sessionStorage.getItem("id")) }
  };

  this._eventService.editEvent(updatedEvent)
    .subscribe((response:any) => {
      console.log("Updated:", response);
      this._router.navigate(['/organizer_account_show_events']);
    });
}
}
