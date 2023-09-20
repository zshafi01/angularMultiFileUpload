import { Component } from '@angular/core';
import { AngularFireStorage,AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularMultiFileUpload';
  files:File[] =[];
  fileName:string='';
  uploadTask!:AngularFireUploadTask;
  downloadUrls:string[] = [];

  // snapshot:Observable<any>;
  // downloadUrl:Observable<string>;
  // isComplated:Observable<boolean>;

  constructor(private fireStorage:AngularFireStorage){ }

   onFileChange(event:any){
  this.files= event.target.files;
  console.log(this.files);
  const currentYear = new Date().getFullYear();


  for (const file of this.files){

    console.log(file);
    const path= `demoMulti/${currentYear}/${file.name}`;
    const ref=this.fireStorage.ref(path);
    this.uploadTask = this.fireStorage.upload(path, file);
    this.uploadTask.then(()=>{
      const downloadUrl= ref.getDownloadURL();
        downloadUrl.subscribe(url=> {
          this.downloadUrls.push(url);
          
        
        console.log("downloadUrl:", url);
    })
  })
     
  
   }
  }
}

