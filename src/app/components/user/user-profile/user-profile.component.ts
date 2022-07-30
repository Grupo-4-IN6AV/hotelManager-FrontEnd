import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';
import { CredentialsRestService } from 'src/app/services/credentialsRest/credentials-rest.service';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor
  (
    private userRest: UserRestService,
    private credentialRest: CredentialsRestService,
    public router: Router
  )
  {
  }

  //Usuario Logueado//
  user:any;
  updateUser:any;
  filesToUpload: any;
  //Mostrar Fotografía//
  userImage: any
  uri: any
  reloadImage: any
  //Password
  password:any;
  newPassword:any;
  reset:any;

  hotel:any;

  ngOnInit(): void
  {
    this.userLogin();
  }

  cleanForm()
  {
    this.password = this.reset;
    this.newPassword = this.reset;
  }

  userLogin()
  {
    this.userRest.getUser(this.credentialRest.getIdentity()._id).subscribe({
      next: (res: any) => {
        this.user = res.user;
        this.updateUser = res.user
        this.userImage = this.user.image;
        this.uri = environment.baseURI + 'user/getImage/' + this.userImage;
      },
      error: (err) => {alert(err.error.message)}
    })
  }

  //UPLOAD IMAGE//
  filesChange(inputFile: any) {
    this.filesToUpload = <Array<File>>inputFile.target.files;
  }

  uploadImage()
  {
    this.userRest.requestFiles(this.credentialRest.getIdentity()._id, this.filesToUpload, 'image')
      .then((res: any) => {
        let resClear = JSON.parse(res);
        if (!res.error)
        {
          localStorage.setItem('identity',JSON.stringify(resClear))
          this.userLogin();
          Swal.fire
            ({
              icon: 'success',
              title: 'Image added Successfully.',
              confirmButtonColor: '#28B463'
            });
        }
        else
        {
          console.log(res)
        }
      })
      .catch(error =>
        {
          Swal.fire({
            icon: 'error',
            title: error,
            confirmButtonColor: '#E74C3C'
          });
        })
    }

    updateAccount()
    {
      this.user.password = undefined;
      this.user.role = undefined;
      this.userRest.updateAccount(this.updateUser._id, this.updateUser).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
          this.userLogin();
          localStorage.setItem('identity',JSON.stringify(res.userUpdate))
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
        },
      })
    }


    changePassword()
    {
      let params =
      {
        password: this.password,
        newPassword: this.newPassword
      }
      this.userRest.changePassword(this.updateUser._id, params).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
          this.userLogin();
          this.password = this.reset;
          this.newPassword = this.reset;
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          this.userLogin();
          this.password = this.reset;
          this.newPassword = this.reset;
        },
      })
    }


  deleteUser(id: string)
  {
    Swal.fire({
      title: 'Do you want to delete your Account?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userRest.deleteAccount(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            localStorage.clear()
            this.router.navigate(['/']);
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
      } else if (result.isDenied)
      {
        Swal.fire('Account Not Deleted','', 'info')
      }
    })
  }

}
