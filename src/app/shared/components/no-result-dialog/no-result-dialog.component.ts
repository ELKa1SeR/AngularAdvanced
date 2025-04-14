import { Component } from '@angular/core';

@Component({
  selector: 'app-no-result-dialog',
  templateUrl: './no-result-dialog.component.html',
  styleUrl: './no-result-dialog.component.scss'
})
export class NoResultDialogComponent {
  message: string = "No se encontraron personajes con esos criterios.";
}
