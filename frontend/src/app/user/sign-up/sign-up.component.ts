import { UserService } from "./../../shared/user.service";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/user.model";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  constructor(
    private UserService: UserService,
    private toastr: ToastrService
  ) {}

  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.user = {
      UserName: "",
      Password: "",
      LastName: "",
      Email: "",
      FirstName: "",
    };
  }

  OnSubmit(form: NgForm) {
    this.UserService.registerUser(form.value).subscribe(
      (data: any) => {
        console.log(data.key);
        if (data.key !== "") {
          this.resetForm(form);
          this.toastr.success("User Registration Successful");
        } else {
          this.toastr.error("Registration Failed!");
        }
      },
      (response) => {
        console.log(response);
      }
    );
  }
}
