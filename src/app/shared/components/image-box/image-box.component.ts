import { Component, OnInit, Input, ViewChild, OnChanges, AfterViewInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'my-image-box',
  templateUrl: './image-box.component.html',
  styleUrls: ['./image-box.component.scss']
})
export class ImageBoxComponent implements OnInit,  OnChanges {
  @Input() customForm: FormGroup;
  @Input('customFormControl') customFormControl:string;
  @Input('currentImage') currentImage:string;
  @ViewChild('imgeBox') imgeBox;
  imageSrc:any='/src/assets/images/bg-upload.png';
  initial=true;
  url = environment.imageUrl;
  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if(this.currentImage) {
      this.imageSrc = this.url + this.currentImage;
    }
  }

  uploadimage(event) {
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
    this.customForm.get(this.customFormControl).setValue(myReader.result);
      this.imageSrc = myReader.result;
    };
    myReader.readAsDataURL(event.target.files[0]);
  }



}
