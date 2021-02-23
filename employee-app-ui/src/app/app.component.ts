import { Component } from '@angular/core';

@Component({
  // the selector name should start with app name(em-employee management) and should end with a name thats represents this component(root)
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle  = 'Employee Management';
}
