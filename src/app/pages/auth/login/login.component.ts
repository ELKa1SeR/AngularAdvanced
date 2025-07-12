import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertDialogComponent } from '../../../shared/components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserRole } from '../../../core/enums/userrole.enum';
import { AUTH_CREDENTIALS } from '../../../core/enums/credentials.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const { username, password } = this.loginForm.value;

    const isValidAdmin =
      username === AUTH_CREDENTIALS.ADMIN_USERNAME &&
      password === AUTH_CREDENTIALS.ADMIN_PASSWORD;

    if (isValidAdmin) {
      this.authService.login(UserRole.ADMIN);
      this.router.navigate(['/characters']);
    } else {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Login fallido',
          message: 'Credenciales incorrectas. Inténtalo de nuevo.'
        }
      });
    }
  }
}
