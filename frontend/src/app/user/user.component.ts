import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  constructor(private router: Router) {}

  username;
  ngOnInit(): void {
    this.username = localStorage.getItem("username");
  }

  public Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.username = null;
    this.router.navigate(["/signup"]);
  }
}
