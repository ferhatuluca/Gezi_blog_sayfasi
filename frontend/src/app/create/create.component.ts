import { Router } from "@angular/router";
import { UserService } from "./../shared/user.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  constructor(private userservice: UserService, private router: Router) {}

  public Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.router.navigate(["/login"]);
  }

  public username = localStorage.getItem("username");
  public users;
  imageUrl: string = "assets/images/default.png";
  fileToUpload: File = null;

  ngOnInit(): void {
    this.getId();
  }

  createTrip(form: NgForm) {
    console.log(this.fileToUpload);
    this.userservice
      .createTrip(this.users.id, this.fileToUpload, form.value)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(["/myTrips"]);
      });
  }

  getId() {
    this.userservice.getUsers().subscribe((data) => {
      this.users = data;
      for (let user of this.users) {
        if (!user.username.localeCompare(localStorage.getItem("username"))) {
          this.users = user;
          break;
        }
      }
    });
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
}
