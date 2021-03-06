import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'
import { ModalModule } from 'ng2-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent, HomeComponent, UserAdminHomeComponent, UserItemComponent,
   MealItemComponent, AddUpdateMealComponent, AddUpdateUserComponent,
   TimeRangeFilterComponent } from './components';
import { AuthGuard, LoginGuard, NotFoundGuard } from './guards';
import { UserService, UserCrudService, MealService } from './services';
import { UserHomeResolve, AdminHomeResolve } from './resolves';

const appRoutes: Routes = [
  { path: 'user/:userId/meals', component: HomeComponent, canActivate: [AuthGuard],
    resolve: { meals: UserHomeResolve }
  }, { path: 'admin/all-users', component: UserAdminHomeComponent, canActivate: [AuthGuard],
    resolve: { users: AdminHomeResolve }
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  //this guard always redirects so doesn't matter what component goes here
  { path: '**', component: LoginComponent, canActivate: [NotFoundGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MealItemComponent,
    AddUpdateMealComponent,
    UserAdminHomeComponent,
    UserItemComponent,
    AddUpdateUserComponent,
    TimeRangeFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot()
  ],
  providers: [LoginGuard, AuthGuard, NotFoundGuard, UserHomeResolve, AdminHomeResolve,
     UserService, MealService, UserCrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
