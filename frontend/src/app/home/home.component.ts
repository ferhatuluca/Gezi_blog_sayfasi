import { UserService } from "./../shared/user.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private userservice: UserService) {
    this.getTrips();
  }

  username = localStorage.getItem("username");
  public trips;
  isUser: boolean;

  ngOnInit(): void {}

  public Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.router.navigate(["/login"]);
  }

  getTrips() {
    this.userservice.getTrips().subscribe(
      data => {
        this.trips = data;
      },
      err => console.log(err)
    );
  }
  OnClick(tripid) {
    this.router.navigate(["/detail", tripid]);
  }
}
