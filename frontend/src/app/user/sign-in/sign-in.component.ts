import { User } from "./../../shared/user.model";
import { UserService } from "./../../shared/user.service";
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  isLoginError: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  public token: string;

  public token_expires: Date;

  public username: string;

  OnSubmit(userName, password) {
    this.userService.userAuthentication(userName, password).subscribe(
      (data: any) => {
        this.updateData(data["token"]);
        this.router.navigate(["/home"]);
      },
      (err: HttpErrorResponse) => {
        this.RefreshToken();
      }
    );
  }
  RefreshToken() {
    this.userService.userRefreshToken(localStorage.getItem("token")).subscribe(
      (data: any) => {
        this.updateData(data["token"]);
        this.router.navigate(["/home"]);
      },
      err => {
        this.isLoginError = true;
      }
    );
  }

  private updateData(token) {
    this.token = token;

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    console.log(this.token_expires);
    localStorage.setItem("token", this.token);
    localStorage.setItem("username", this.username);
  }
}
