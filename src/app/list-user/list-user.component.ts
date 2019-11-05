import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  addressbook: User[];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.addressbook = data;
      });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id)
      .subscribe( data => {
        this.addressbook = this.addressbook.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    localStorage.removeItem("edit-id");
    localStorage.setItem("edit-id", user.id.toString());

    localStorage.removeItem("edit-firstName");
    localStorage.setItem("edit-firstName", user.firstName);

    localStorage.removeItem("edit-lastName");
    localStorage.setItem("edit-lastName", user.lastName);

    localStorage.removeItem("edit-emailId");
    localStorage.setItem("edit-emailId", user.emailId);

    localStorage.removeItem("edit-workPhone");
    localStorage.setItem("edit-workPhone", user.workPhone);

    localStorage.removeItem("edit-cellPhone");
    localStorage.setItem("edit-cellPhone", user.cellPhone);

    localStorage.removeItem("edit-dateOfBirth");
    localStorage.setItem("edit-dateOfBirth", user.dateOfBirth);

    localStorage.removeItem("edit-street");
    localStorage.setItem("edit-street", user.street);

    localStorage.removeItem("edit-city");
    localStorage.setItem("edit-city", user.city);

    localStorage.removeItem("edit-state");
    localStorage.setItem("edit-state", user.state);

    localStorage.removeItem("edit-zipCode");
    localStorage.setItem("edit-zipCode", user.zipCode);

    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}
