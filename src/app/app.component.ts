import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular-ecommerce';

  // productCategory: string[] = [
  //   'Books',
  //   'Coffe Mugs',
  //   'Mouse Pads',
  //   'Luggage Tags'
  // ]


    constructor(private route: Router){

    }




}

