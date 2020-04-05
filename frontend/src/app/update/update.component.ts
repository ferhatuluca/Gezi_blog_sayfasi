import { NgForm } from "@angular/forms";
import { UserService } from "./../shared/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"]
})
export class UpdateComponent implements OnInit {
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
  public fileToUpload: File;

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.trip_id = params.get("id");
    });
    this.getTrip(this.trip_id);
  }

  getTrip(trip_id) {
    this.userservice.getTrip(trip_id).subscribe(
      data => {
        this.trip = data;
      },
      err => console.log(err)
    );
  }

  updateTrip(form: NgForm) {
    this.userservice
      .updateTrip(this.trip_id, this.fileToUpload, form.value)
      .subscribe(
        data => {
          this.trip = data;
          console.log(data);
          this.router2.navigate(["/myTrips"]);
        },
        err => console.log(err)
      );
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.trip.image = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
}
