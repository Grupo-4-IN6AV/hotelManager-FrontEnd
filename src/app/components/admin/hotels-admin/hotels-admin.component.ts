import { Component, OnInit } from '@angular/core';
import { HotelModel } from 'src/app/models/hotel.model';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotels-admin',
  templateUrl: './hotels-admin.component.html',
  styleUrls: ['./hotels-admin.component.css']
})
export class HotelsAdminComponent implements OnInit 
{

   //Variables de TypeScript//
   hotels: any;
   hotel: HotelModel;
   hotelUpdate: any;
   hotelView: any;
   searchHotel:any
   users: any;

   showTableHotels: boolean = false;
   reset: any; 

  constructor
  ( 
    private userRest: UserRestService,
    private hotelRest: HotelRestService
  )
  {    
    this.hotel = new HotelModel('', '','','','','','');
  }

  ngOnInit(): void 
  {
    this.getUsersAdminHotel();
    this.getHotels();
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

  saveHotel(addHotelForm : any)
  {
    this.hotelRest.saveHotel(this.hotel).subscribe
    ({
      next: (res: any) => {
        Swal.fire
          ({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
        this.getHotels();
        addHotelForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addHotelForm.reset();
      },
    })
    addHotelForm.reset();
  }

  getHotel(id : string)
  {
    this.hotelRest.getHotel(id).subscribe({
      next: (res: any) => {
        this.hotelView = res.hotel;
        this.hotelUpdate = res.hotel;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  updateHotel()
  {
    this.hotelRest.updateHotel(this.hotelUpdate._id, this.hotelUpdate).subscribe({

      next: (res:any)=> 
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getHotels();
      },
      error: (err)=>
      {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    })
  }

  deleteHotel(id: string) 
  {
    Swal.fire({
      title: 'Do you want to delete this Hotel?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.hotelRest.deleteHotel(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getHotels();
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getHotels();
      } else if (result.isDenied) 
      {
        Swal.fire('Hotel Not Deleted','', 'info')
      }
    })
  }

  getUsersAdminHotel()
  {
    this.userRest.getUsersAdminHotel().subscribe({
      next: (res: any) => 
      {
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  showTable()
  {
    this.showTableHotels =! this.showTableHotels;
  }

}
