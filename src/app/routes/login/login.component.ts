import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { SecurityService } from 'src/app/services/security/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(
    fb : FormBuilder,
    private router: Router,
    private firestoreService: FirestoreService,
    private toastr: ToastrService,
    private securityService: SecurityService
  ) {
    this.loginForm =  fb.group({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }
  
  ngOnInit(): void {
    
  }


  submit() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.value.email;
      this.isUserOk().then((res) => {
        if (res == true) {
          this.toastr.success('Logueando');
          this.securityService.saveUser(usuario);
          this.router.navigateByUrl('home');
        } else {
          this.toastr.error('Hubo un error con sus credenciales');
        }
      });
    }
  }

  isUserOk() {
    return this.firestoreService.getUser(this.loginForm.value.email, this.loginForm.value.password);
  }

}
