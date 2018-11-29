import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "../localStorageService";
import { Router } from "@angular/router";
import { ToastService } from "../toast/toast.service";

export interface IUser {
  id?: number;
  username: string;
  password: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: IUser = {
    username: null,
    password: null
  };

  constructor(private router: Router, private toastService: ToastService) {}

  ngOnInit() {}

  login(user: IUser) {
    const presetUser = { username: "alex", password: "alex123" };

    if (
      user.username !== null &&
      user.password !== null &&
      user.username !== "" &&
      user.password !== ""
    ) {
      if (
        user.username === presetUser.username &&
        user.password === presetUser.password
      ) {
        // Actually logs in user
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(["contacts", user]);
      } else {
        console.log("from within else statement..");
        this.toastService.showToast(
          "warning",
          2000,
          "Username or Password is wrong!"
        );
      }
    } else {
      this.toastService.showToast("danger", 2000, "Must specify credentials");
    }
  }
}
