import { Component, OnInit } from '@angular/core';
import { BorrowerService } from '../services/borrower.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private borrowerServ: BorrowerService, private router: Router) { }

  User = new FormGroup({
    "name": new FormControl(''),
    "phone": new FormControl('***-***-****'),
    "address": new FormControl('')
  });



  isLoading = false;
  invalidInput = {
    name: false,
    phone: false,
    address: false
  };
  signUpError = false;

  ngOnInit() {
  }

  signUp = () => {
    this.isLoading = true;
    this.invalidInput = {
      name: false,
      phone: false,
      address: false
    };
    // if (!(this.User.name.length >= 2) || !(this.User.phone.length >= 10) || !(this.User.address.length >= 10)) {
    //   if (!(this.User.name.length >= 2))
    //     this.invalidInput.name = true;
    //   if (!(this.User.phone.length >= 10))
    //     this.invalidInput.phone = true;
    //   if (!(this.User.address.length >= 10))
    //     this.invalidInput.address = true;
    //   this.isLoading = false;
    //   return;
    // }
    this.borrowerServ.registerBorrower(this.User.getRawValue()).subscribe(newUser => {
      if (!newUser.hasOwnProperty("_id"))
        this.signUpError = true;
      this.borrowerServ.setBorrower(newUser);
      this.router.navigateByUrl("/home");
    }, err => {
      this.signUpError = true;
    }
    );
  }

}
