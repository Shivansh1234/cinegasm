import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  error(message: string, action: string) {
    return this._snackBar.open(message, action, {panelClass: ['snackbar-error'], duration: 3000});
  }

  success(message: string, action: string) {
    return this._snackBar.open(message, action, {panelClass: ['snackbar-success'], duration: 3000});
  }

  info(message: string, action: string) {
    return this._snackBar.open(message, action, {panelClass: ['snackbar-info'], duration: 3000});
  }
}
