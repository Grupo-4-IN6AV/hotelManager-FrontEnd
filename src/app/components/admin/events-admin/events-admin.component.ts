import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { EventRestService } from 'src/app/services/eventRest/event-rest.service';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events-admin',
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.css']
})
export class EventsAdminComponent implements OnInit {

  //Variables de TypeScript//
  events: any;
  searchEvent: any;
  event: EventModel;
  hotels: any;
  showTableEvents: boolean = false;
  reset: any;

  //MOSTRAR FECHAS//
  newDates: any;

  constructor
  (
    public hotelRest : HotelRestService,
    public eventRest : EventRestService
  ) 
  {
    this.event = new EventModel('','','','','','');
  }

  ngOnInit(): void 
  {
    this.getHotels();
    this.getEvents();
  }

  saveEvent(eventAddForm : any)
  {
    this.eventRest.saveEvent(this.event).subscribe
    ({
      next: (res: any) => {
        Swal.fire
          ({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
        //this.getServices();
        eventAddForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        eventAddForm.reset();
      },
    })
    eventAddForm.reset();
  }

  getEvents()
  {
    this.eventRest.getEvents().subscribe({
      next: (res: any) => 
      {
        this.events = res.events
        var arrayDates = [];
        for(var key=0; key<this.events.length; key++)
        {
            var actualDate = this.events[key].date;
            var splitActualDate = actualDate.split('T');
            arrayDates.push(splitActualDate[0]);
        }
        this.newDates = arrayDates;
      },
      error: (err) => console.log(err)
    })
  }

  getHotels()
  {
    this.hotelRest.getHotels().subscribe({
      next: (res: any) => 
      {
        this.hotels = res.hotels
      },
      error: (err) => console.log(err)
    })
  }

  showTable()
  {
    this.showTableEvents =! this.showTableEvents;
  }
}
