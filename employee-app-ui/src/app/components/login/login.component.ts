import {Component} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  public employee: null;
  constructor(private loginService: LoginService) {
  }
  // testEmployee(id: number): boolean{
  //   this.getEmployee(id);
  //   if (this.employee == null){
  //     console.log('employee: false');
  //     return false;
  //   }
  //   console.log('employee: true');
  //   return true;
  // }
  // getEmployee(id: number): void{
  //   this.loginService.getEmployee(id).subscribe(
  //     data => {this.employee = data; },
  //     error => console.log(error),
  //     () => console.log('employee loaded')
  //   );
  // }

  onLogin(f: NgForm): void{
    // the login validation will be on server
    console.log(f.value);
  }
}
