import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs:AngularFirestore,
    private router:Router) { }

  validateAccount(doc:number, telf:string){
    return new Promise((resolve, reject) => {
      let user = this.afs.collection(`cases`, ref => ref
      .where("victima.telefono", "==", telf)
      .where("victima.documentoId", "==", doc.toString()));
      user.get().subscribe(us=>{
        let data:any = {}
        us.forEach(doc =>{
          if(doc.exists){
            data = doc.data();
            //resolve(data)
          }else{
            resolve(null)
          }
        })
         if(data){
           localStorage.setItem('user', JSON.stringify(data['victima']));
           resolve(data)
         }
      })
    })
  }
  getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }
  logout(){
      localStorage.removeItem('user');
      this.router.navigate([''])
  }
}
