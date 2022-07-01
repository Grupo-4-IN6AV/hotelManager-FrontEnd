import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit
{

  //Variables de TypeScript//
  users: any;
  user: UserModel;
  searchUser: any
  userView: any;
  userUpdate: any;
  showTableUsers: boolean = false;
  userNameUp: any;
  userNameDown: any;
  userSurnameUp: any;
  userSurnameDown: any;
  reset: any;


  constructor
  (
    private userRest: UserRestService,
  )
  {
    this.user = new UserModel('', '','','','','','','');
  }

  ngOnInit(): void 
  {
    this.getUsers();
  }

  //METÓDOS DEL CRUD DE USERS//
  getUsers() 
  {
    this.userRest.getUsers().subscribe({
      next: (res: any) => this.users = res.users,
      error: (err) => console.log(err)
    })
  }

  saveUser(addUserForm : any)
  {
    this.userRest.saveUser(this.user).subscribe
    ({
      next: (res: any) => {
        Swal.fire
          ({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
        this.getUsers();
        addUserForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addUserForm.reset();
      },
    })
    addUserForm.reset();
  }

  getUser(id: string) 
  {
    this.userRest.getUser(id).subscribe({
      next: (res: any) => {
        this.userView = res.user;
        this.userUpdate = res.user;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  updateUser()
  {
    this.userUpdate.password = undefined;
    this.userRest.updateUser(this.userUpdate._id, this.userUpdate).subscribe({
      next: (res:any)=> 
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getUsers();
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

  deleteUser(id: string) 
  {
    Swal.fire({
      title: 'Do you want to delete this User?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userRest.deleteUser(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getUsers();
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getUsers();
      } else if (result.isDenied) 
      {
        Swal.fire('User Not Deleted','', 'info')
      }
    })
  }

  showTable()
  {
    this.showTableUsers =! this.showTableUsers;
  }

  getUsersByUp()
  {
    this.userRest.getUsersByUp().subscribe({
      next: (res: any) => 
      {
        this.userNameDown = this.reset;
        this.userSurnameUp = this.reset;
        this.userSurnameDown = this.reset;
        this.userNameUp = res.users
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  getUsersByDown()
  {
    this.userRest.getUsersByDown().subscribe({
      next: (res: any) => 
      {
        this.userNameUp = this.reset;
        this.userSurnameUp = this.reset;
        this.userSurnameDown = this.reset;
        this.userNameDown = res.users;
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  getUsersSurnameByUp()
  {
    this.userRest.getUsersSurnameByUp().subscribe({
      next: (res: any) => 
      {
        this.userNameDown = this.reset;
        this.userSurnameDown = this.reset;
        this.userNameUp = this.reset;
        this.userSurnameUp = res.users;
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  getUsersSurnameByDown()
  {
    this.userRest.getUsersSurnameByDown().subscribe({
      next: (res: any) => 
      {
        this.userNameDown = this.reset;
        this.userSurnameUp = this.reset;
        this.userNameUp = this.reset;
        this.userSurnameDown = res.users;
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  getUsersClient()
  {
    this.userRest.getUsersClient().subscribe({
      next: (res: any) => 
      {
        this.userNameDown = this.reset;
        this.userSurnameUp = this.reset;
        this.userNameUp = this.reset;
        this.userSurnameDown = this.reset;
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  getUsersAdminHotel()
  {
    this.userRest.getUsersAdminHotel().subscribe({
      next: (res: any) => 
      {
        this.userNameDown = this.reset;
        this.userSurnameUp = this.reset;
        this.userNameUp = this.reset;
        this.userSurnameDown = this.reset;
        this.users = res.users
      },
      error: (err) => console.log(err)
    })
  }

  cleanTable()
  {
    this.userNameUp = this.reset
    this.userNameDown = this.reset
    this.userSurnameUp = this.reset
    this.userSurnameDown = this.reset
    this.getUsers();
    this.searchUser = this.reset;
  }

}
