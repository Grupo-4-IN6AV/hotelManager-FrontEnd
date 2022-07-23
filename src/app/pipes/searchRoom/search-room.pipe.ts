import { Pipe, PipeTransform } from '@angular/core';
import { RoomAdminComponent } from 'src/app/components/admin/room-admin/room-admin.component';
import { RoomRestService } from 'src/app/services/roomRest/room-rest.service';

@Pipe({
  name: 'searchRoomPipe'
})
export class SearchRoomPipe implements PipeTransform {

  rooms: any;

  constructor
  (
    private roomRest: RoomRestService,
    private roomComponent: RoomAdminComponent,
  ){ }

  transform(rooms:any, search:any){
    if(search == undefined){
      return rooms;
    }else{
      return rooms.filter( (room:any) =>
      {
        let params = {name:search}
        this.roomRest.searchRoom(params).subscribe({
          next: (res: any) =>
          {
            this.rooms = res.rooms;
            if(this.rooms.length === 0)
            {
              this.roomComponent.notFound = true;
            }
            else if(this.rooms.length !== 0)
            {
              this.roomComponent.notFound = false;
            }
          },
          error: (err) => {alert(err.error.message)}
        })
        return room.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }

}
