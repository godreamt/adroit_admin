import { Component, OnInit } from '@angular/core';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.scss']
})
export class UpdateReviewComponent implements OnInit {
  form: FormGroup;
  reviewId: any;
  currentImage: any;

  constructor(private fb: FormBuilder, private alert: AlertService, private _serv: DataService, private router: Router, private route: ActivatedRoute) { 
    this.reviewId = route.snapshot.params.id;
    if(this.reviewId){
      this.getReview();
    }
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      subTitle: [''],
      review: ['']
    })
  }

  ngOnInit() {
  }

  getReview() {
    this._serv.url = "site-manager/review/"+this.reviewId;
    this._serv.get().subscribe(response => {
      let data = response;
      this.currentImage = data['featuredImage'];
      console.log(this.currentImage);
      
      data['featuredImage']="";
      this.form.patchValue(data);
    })
  }

  updateReview(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.form);
    if(this.form.invalid)return;
    this._serv.url = "site-manager/review";
    this._serv.create(this.form.value).subscribe(response => {
      this.alert.success(response[0]);
      this.router.navigate(['/site-manager/review']);
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })
  }

}
