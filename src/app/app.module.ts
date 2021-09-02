import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login/login.component'
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { LeaveManagerComponent } from './leave-manager/leave-manager.component';
import { LeaveListComponent } from './leave-manager/leave-list/leave-list.component';
import { ProfileComponent } from './profile/profile.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DateDialogComponent } from './leave-manager/date-dialog/date-dialog.component';
import { AuthService } from './services/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user-service';
import { LeaveService } from './services/leave-service';
import { EmployeeManagerComponent } from './employee-manager/employee-manager.component';
import { MatMenuModule } from '@angular/material/menu';
import { EmpidDialogComponent } from './employee-manager/empid-dialog/empid-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SidebarComponent,
    ProfileInfoComponent,
    LeaveManagerComponent,
    LeaveListComponent,
    ProfileComponent,
    DateDialogComponent,
    EmployeeManagerComponent,
    EmpidDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatNativeDateModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [
    AuthService,
    UserService,
    LeaveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
