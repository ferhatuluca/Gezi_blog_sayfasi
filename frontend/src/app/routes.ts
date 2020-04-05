import { CreateComponent } from "./create/create.component";
import { UpdateComponent } from "./update/update.component";
import { MyTripsComponent } from "./my-trips/my-trips.component";
import { DetailComponent } from "./detail/detail.component";
import { AuthGuard } from "./auth/auth.guard";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { UserComponent } from "./user/user.component";
import { HomeComponent } from "./home/home.component";
import { Routes } from "@angular/router";
import { SignInComponent } from "./user/sign-in/sign-in.component";

export const appRoutes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "update/:id",
    component: UpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "create",
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "detail/:id",
    component: DetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "myTrips",
    component: MyTripsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "signup",
    component: UserComponent,
    children: [{ path: "", component: SignUpComponent }],
  },
  {
    path: "login",
    component: UserComponent,
    children: [{ path: "", component: SignInComponent }],
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];
