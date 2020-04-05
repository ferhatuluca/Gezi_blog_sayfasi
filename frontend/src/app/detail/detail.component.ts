import { UserService } from "../shared/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private router2: Router,
    private userservice: UserService
  ) {}

  public Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.router2.navigate(["/login"]);
  }

  public trip;
  public trip_id;
  public username = localStorage.getItem("username");
  public image;

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.getTrip(params.get("id"));
      this.trip_id = params.get("id");
    });
  }

  getTrip(trip_id) {
    this.userservice.getTrip(trip_id).subscribe(
      (data) => {
        this.trip = data;
        this.image = data["image"];
      },
      (err) => console.log(err)
    );
  }

  delete() {
    this.userservice.deleteTrip(this.trip_id).subscribe((err) => {
      console.log(err);
    });
    this.router2.navigate(["/myTrips"]);
  }

  isUserName() {
    if (this.trip.owner.localeCompare(localStorage.getItem("username"))) {
      return false;
    }
    return true;
  }

  sendId() {
    this.router2.navigate(["/update", this.trip_id]);
  }

  handleFileInput(file: FileList) {
    this.image = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
    reader.readAsDataURL(this.image);
  }
}
