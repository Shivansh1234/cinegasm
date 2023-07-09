import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

// Components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CsvToArrayPipe } from './pipes/csv-to-array.pipe';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, CsvToArrayPipe],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [CsvToArrayPipe]
})
export class SharedModule { }
