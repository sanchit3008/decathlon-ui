import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagerComponent } from './employee-manager/employee-manager.component';
import { LeaveManagerComponent } from './leave-manager/leave-manager.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'leaves', component: LeaveManagerComponent },
  { path: 'employee', component: EmployeeManagerComponent},
  { path: 'employee/:empId', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
