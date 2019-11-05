import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [localStorage.getItem("edit-id"), Validators.required],
      email: [localStorage.getItem("edit-emailId"), Validators.required],
      firstName: [localStorage.getItem("edit-firstName"), Validators.required],
      lastName: [localStorage.getItem("edit-lastName"), Validators.required],
      workPhone: [localStorage.getItem("edit-workPhone"), Validators.required],
      cellPhone: [localStorage.getItem("edit-cellPhone"), Validators.required],
      dateOfBirth: [localStorage.getItem("edit-dateOfBirth"), Validators.required],
      street: [localStorage.getItem("edit-street"), Validators.required],
      city: [localStorage.getItem("edit-city"), Validators.required],
      state: [localStorage.getItem("edit-state"), Validators.required],
      zipCode: [localStorage.getItem("edit-zipCode"), Validators.required]
    });
    this.userService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }
  navigateToListView(){
    this.router.navigate(['list-user']);
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          alert(error);
        });
  }

}
