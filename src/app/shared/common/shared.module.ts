import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SharedMaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    SharedMaterialModule,
    SweetAlert2Module,
    NgOptimizedImage,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavigationBarComponent,
  ],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, NavigationBarComponent],
})
export class SharedModule {}
