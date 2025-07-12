import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HighlightDirective } from './directives/highlight.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CancelDialogComponent } from './components/cancel-dialog/cancel-dialog.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { NoResultDialogComponent } from './components/no-result-dialog/no-result-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    HighlightDirective,
    CapitalizePipe,
    HeaderComponent,
    CancelDialogComponent,
    SuccessDialogComponent,
    NoResultDialogComponent,
    FooterComponent,
    AlertDialogComponent,

  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatDialogModule,
    CoreModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    NoResultDialogComponent,
    ConfirmDialogComponent,
    HighlightDirective,
    CapitalizePipe,
    HeaderComponent,
    FooterComponent,]
})
export class SharedModule {}
