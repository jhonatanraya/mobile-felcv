import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { ALERT } from '../shared/alert.interface';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import  { Platform } from '@ionic/angular'
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  user:any;
  alertRequest:ALERT
  constructor(private activatedRoute: ActivatedRoute,
    private auth:AuthService,
    private alert:AlertService,
    private geolocation: Geolocation,
    private platform: Platform) { 
      this.platform.ready().then((readySource) => {
        console.log("Platform ready!");
        
      });
      this.geolocation.getCurrentPosition().then((resp)=>{ 
      console.log(resp)  
      })
    }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUser()
    this.getAlert();
  }
  getUser(){
    this.user = this.auth.getUser()
  }
  getAlert(){
    this.alert.getAlert(this.user.documentoId).subscribe(res=>{
      console.log(res)
      this.alertRequest = res
    })
  }
  sendAlert(){
    // if(navigator.geolocation){
    //   var success = function(position){
    //   var latitude = position.coords.latitude,
    //   longitude = position.coords.longitude;
    //   }
    //   navigator.geolocation.getCurrentPosition(resp=>{
    //   console.log( resp );
    //   let data = {
    //     victima:this.user,
    //     ubicacion:{
    //       lat:resp.coords.latitude,
    //       lng:resp.coords.longitude
    //     },
    //     estado:"Recibido"
    //   } 
    //   this.alert.createAlert(data);
    //   });
    // }
    
      this.geolocation.getCurrentPosition().then((resp)=>{ 
        console.log( resp );
        let data = {
          victima:this.user,
          ubicacion:{
            lat:resp.coords.latitude,
            lng:resp.coords.longitude
          },
          estado:"Recibido"
        }
        console.log("alert sended", data);
        this.alert.createAlert(data);
        }).catch((error)=>{
          console.log(error)
        })
      
    
  }
}
