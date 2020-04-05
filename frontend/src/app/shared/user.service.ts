import { User, Trip } from "./user.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Form } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  baseurl = "http://127.0.0.1:8080";
  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  httpHeaders_auth = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "JWT " + localStorage.getItem("token"),
  });
  httpHeaders_auth_create = new HttpHeaders({
    Authorization: "JWT " + localStorage.getItem("token"),
  });

  registerUser(user: User) {
    const body = {
      username: user.UserName,
      password: user.Password,
      email: user.Email,
      first_name: user.FirstName,
      last_name: user.LastName,
    };
    return this.http.post(this.baseurl + "/users/", body, {
      headers: this.httpHeaders,
    });
  }

  userAuthentication(userName, password) {
    var data = {
      username: userName,
      password: password,
    };
    return this.http.post(this.baseurl + "/token-auth/", data, {
      headers: this.httpHeaders,
    });
  }

  userRefreshToken(token) {
    var data = {
      token: token,
    };
    return this.http.post(this.baseurl + "/token-refresh/", data, {
      headers: this.httpHeaders,
    });
  }

  getTrips() {
    return this.http.get(this.baseurl + "/trips/", {
      headers: this.httpHeaders_auth,
    });
  }

  getTrip(id) {
    return this.http.get(this.baseurl + "/trips/" + id + "/", {
      headers: this.httpHeaders_auth,
    });
  }

  getUsers() {
    return this.http.get(this.baseurl + "/users/", {
      headers: this.httpHeaders_auth,
    });
  }

  deleteTrip(id) {
    return this.http.delete(this.baseurl + "/trips/" + id + "/", {
      headers: this.httpHeaders_auth_create,
    });
  }

  updateTrip(trip_id, image, trip: Trip) {
    const form_data = new FormData();
    for (var key in trip) {
      form_data.append(key, trip[key]);
    }
    form_data.append("image", image, image.name);

    return this.http.put(this.baseurl + "/trips/" + trip_id + "/", form_data, {
      headers: this.httpHeaders_auth_create,
    });
  }

  createTrip(user_id, image, trip: Trip) {
    const form_data = new FormData();
    for (var key in trip) {
      form_data.append(key, trip[key]);
    }
    form_data.append("owner_id", user_id);
    form_data.append("image", image, image.name);

    return this.http.post(this.baseurl + "/trips/", form_data, {
      headers: this.httpHeaders_auth_create,
    });
  }
}
