import { Component, OnInit } from '@angular/core';
import { typeRoomModel } from 'src/app/models/typeRoom.model';
import { HotelModel } from 'src/app/models/hotel.model';
import { TypeRoomRestService } from 'src/app/services/typeRoomRest/type-room-rest.service';

import Swal from 'sweetalert2';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';

@Component({
  selector: 'app-type-room-admin',
  templateUrl: './type-room-admin.component.html',
  styleUrls: ['./type-room-admin.component.css']
})
export class TypeRoomAdminComponent implements OnInit {

  //Variables TypeScript//
  typeRooms: any;
  typeRoom: typeRoomModel;
  searchTypeCompany: any;
  typeRoomId:any
  typeRoomUpdate: any;
  searchTypeRoom: any
  showButtons: boolean = false;

  showTableTypeRooms: boolean = false;

  //VARIABLES HOTELES//
  hotels: any;
  hotel: HotelModel;
  searchHotel: any
  users: any;
  hotelId:any;
  showHotels: boolean = true;
  typeRoomView:any;


  showTableHotels: boolean = false;
  reset: any;

  constructor(
    private typeRoomRest: TypeRoomRestService,
    private hotelRest: HotelRestService
  ) {
    this.typeRoom = new typeRoomModel('', '', '', 0);
    this.hotel = new HotelModel('', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getHotels();
  }

  getTypeRooms() {
    this.typeRoomRest.getTypeRooms(this.hotelId).subscribe({
      next: (res: any) => {this.typeRooms = res.typeRooms},
      error: (err) => console.log(err)
    })
  }

  saveTypeRoom(addTypeRoomForm: any) {
    var data = {
      name: this.typeRoom.name,
      description: this.typeRoom.description,
      numberPersons: this.typeRoom.numberPersons,
      hotel: this.hotelId
    }
    this.typeRoomRest.saveTypeRoom(data).subscribe
      ({
        next: (res: any) => {
          Swal.fire
            ({
              icon: 'success',
              title: res.message,
              confirmButtonColor: '#28B463'
            });
          this.getTypeRooms();
          addTypeRoomForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          addTypeRoomForm.reset();
        },
      })
    addTypeRoomForm.reset();
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

  getHotel(id : string)
  {
    this.hotelId = id;
    this.showButtons = !this.showButtons;
    this.showHotels = !this.showHotels;
    this.getTypeRooms();
  }

  getTypeRoom(id:string){
    this.typeRoomRest.getTypeRoom(id).subscribe({
      next: (res: any) => {
        this.typeRoomId = id;
        this.typeRoomView = res.typeRoom;
        this.typeRoomUpdate = res.typeRoom;
      },
      error: (err) => console.log(err.error.message)
    })
  }

  updateTypeRoom()
  {
    var data = {
      name: this.typeRoomUpdate.name,
      description: this.typeRoomUpdate.description,
      numberPersons: this.typeRoomUpdate.numberPersons,
      hotel: this.hotelId
    }
    this.typeRoomRest.updateTypeRoom(this.typeRoomUpdate._id, data).subscribe({

      next: (res:any)=> 
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        console.log(res)
        this.getTypeRooms();
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
  
  deleteTypeRoom(id:string)
  {
    Swal.fire({
      title: 'Do you want to delete this Type Room?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.typeRoomRest.deleteTypeRoom(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getTypeRooms();
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getTypeRooms();
      } else if (result.isDenied) 
      {
        Swal.fire('Type Room Not Deleted','', 'info')
      }
    })
  }



  showTable() {
    this.showTableTypeRooms = !this.showTableTypeRooms;
  }

}
