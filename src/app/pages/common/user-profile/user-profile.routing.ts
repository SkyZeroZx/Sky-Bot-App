import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';

export const userProfileRouter: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    data: { animation: 'user-profile' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(userProfileRouter)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
