import { Router } from "@angular/router";
import { UserService } from "./../shared/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-my-trips",
  templateUrl: "./my-trips.component.html",
  styleUrls: ["./my-trips.component.css"]
})
export class MyTripsComponent implements OnInit {
  constructor(private userservice: UserService, private router: Router) {
    this.getTrips();
  }

  ngOnInit(): void {}

  public Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.router.navigate(["/login"]);
  }

  public userTrips;
  public username = localStorage.getItem("username");

  getTrips() {
    this.userservice.getUsers().subscribe(
      data => {
        this.userTrips = data;
        for (let trip of this.userTrips) {
          if (!trip.username.localeCompare(localStorage.getItem("username"))) {
            this.userTrips = trip.trips;
            break;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
