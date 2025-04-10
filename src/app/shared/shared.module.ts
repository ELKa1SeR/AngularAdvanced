import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HighlightDirective } from './directives/highlight.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CancelDialogComponent } from './components/cancel-dialog/cancel-dialog.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    HighlightDirective,
    CapitalizePipe,
    HeaderComponent,
    CancelDialogComponent,
    SuccessDialogComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatDialogModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    HighlightDirective,
    CapitalizePipe,
    HeaderComponent,]
})
export class SharedModule {}
