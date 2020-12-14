import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

myForm: FormGroup;


  constructor(public fb: FormBuilder) { 

    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.checkMatchingPassword("password", "confirmPassword")
    })
  }

  onSubmit(signupform: { value: any; })
  {
    console.log(signupform.value);
  }

  checkMatchingPassword(passwordKey: string, confirmPasswordKey: string)
  {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmpassword = group.controls[confirmPasswordKey];

      if(password.value == confirmpassword.value){
        return;
      }
      else{
        confirmpassword.setErrors({
          notEqualToPassword: true

        })
      }

    }
  }


  ngOnInit(): void {
  }

}
