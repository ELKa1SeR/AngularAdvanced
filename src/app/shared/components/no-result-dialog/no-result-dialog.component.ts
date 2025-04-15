import { Component } from '@angular/core';

@Component({
  selector: 'app-no-result-dialog',
  templateUrl: './no-result-dialog.component.html',
  styleUrl: './no-result-dialog.component.scss'
})
export class NoResultDialogComponent {
  message: string = "No characters with these criteria were found.";
}
