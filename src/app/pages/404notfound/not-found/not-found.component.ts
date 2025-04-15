import { Component } from '@angular/core';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',

})
export class NotFoundComponent {

  message = "the page you are looking for does not exist";

goBack() {

  window.history.back();

}

}
