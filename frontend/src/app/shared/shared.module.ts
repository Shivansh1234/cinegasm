import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

// Components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule
  ]
})
export class SharedModule { }
