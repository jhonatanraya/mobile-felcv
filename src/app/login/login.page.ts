import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
ci:number = 5959559
loginForm: FormGroup
  constructor(private auth:AuthService,
    private router:Router,
    private fb:FormBuilder) { }

  ngOnInit() {
    //this.login()
    this.initForm()
  }
  login(){
    this.auth.validateAccount(this.loginForm.value.doc, this.loginForm.value.telefono).then(res=>{
      if(res){
        this.router.navigate(['folder/inbox'])
        console.log(res)
      }
    })

    console.log(this.loginForm.value)
  }
  initForm(){
    this.loginForm =  this.fb.group({
      telefono:['', Validators.required],
      doc:['', Validators.required]
    })
  }

}
