import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserOptionsComponent, UserPhotoComponent } from '../user-profile/components';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserProfileRoutingModule } from '../user-profile/user-profile.routing';

@NgModule({
  declarations: [UserProfileComponent, UserOptionsComponent, UserPhotoComponent],
  imports: [
    CommonModule,
    NgbModule,
    MatRippleModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage,
    SweetAlert2Module,
    UserProfileRoutingModule,
  ],
  providers: [DatePipe],
})
export class UserProfileModule {}
