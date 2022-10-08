import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ALERT } from '../shared/alert.interface';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
private alertCollection:AngularFirestoreCollection<ALERT>
private alerts:Observable<ALERT[]>
  constructor(private fb:AngularFirestore) { 
    this.alertCollection = this.fb.collection('alerts');
    this.alerts = this.alertCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ))
  }
  getAlerts(){
    return this.alerts;
  }
  getAlert(id:string){
    return this.alertCollection.doc(id).valueChanges();
  }
  createAlert(data){
    return this.alertCollection.doc(data.victima.documentoId).set(data, {merge:true})
  }
}
