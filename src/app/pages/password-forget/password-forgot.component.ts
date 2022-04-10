import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthUserService} from "../../services/auth-user.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-password-forget',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {
  form: FormGroup;
  //username: string;
  isValid = false;
  submitted: boolean;

  constructor(
    private authUserService: AuthUserService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.submitted = false;
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {

  }

  get passwordForm() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    // verify if email is valid using regex
    if (this.form.invalid) {
      return;
    }

    this.isValid = true;
    const formData = {
      username : this.form.value.username,
      password: ''
    }

    this.authUserService.forgotPassword(formData).subscribe(({message, status : string}) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: message});
        this.router.navigate(['/login']);
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: "Sorry, Something went wrong"});
        this.router.navigate(['/login']);
        console.log(error);
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
