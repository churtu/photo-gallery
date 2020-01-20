import { PhotoListComponent } from './../photo-list/photo-list.component';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PhotoService} from '../../services/photo.service';
import {IPhoto} from '../../interfaces/Photo';
@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  constructor(private activateRoute:ActivatedRoute, 
    private router:Router,
    private photoService:PhotoService
    ) { }
  id: string;
  photo:IPhoto;
  ngOnInit() {
    this.activateRoute.params.subscribe(params=>{
      this.id = params.id;
      this.photoService.getPhoto(this.id).subscribe(
        res => {this.photo = res; console.log(res)},
        err => console.log(err)
      )
    })
  }

  deletePhoto(id: string){
    this.photoService.deletePhoto(id).subscribe(
      res => {console.log(res); this.router.navigate(['/photos']);},
      err => console.log(err)
    );
  }

  updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement):boolean{
    this.photoService.updatePhoto(this.id,title.value,description.value).subscribe(
      res => {this.router.navigate(['/photos']);},
      err => console.log(err)
    )
    return false;
  }

}
