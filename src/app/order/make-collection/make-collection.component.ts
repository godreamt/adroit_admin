import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { _ } from 'underscore';

@Component({
  selector: 'app-make-collection',
  templateUrl: './make-collection.component.html',
  styleUrls: ['./make-collection.component.scss']
})
export class MakeCollectionComponent implements OnInit {
  form: FormGroup;
  orderId;
  constructor(private fb: FormBuilder, private alert: AlertService, private _serv: DataService, private router: Router, private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.params.id;
    this.form = this.fb.group({
      order_id: [this.orderId],
      collectionAmount: ['', [Validators.required]],
      paymentMethod: ['cash', [Validators.required]],
      relatedInfo: [''],
      comments: [''],
    })
   }

  ngOnInit() {
  }

  makeNewCollection(event){
    event.preventDefault();
    if(this.form.invalid)return;
    this._serv.url="collection";
    this._serv.create(this.form.value).subscribe(response => {
      this.alert.success(response[0]);
      this.router.navigate(['/order-manager/view/'+this.orderId]);
    }, error => {
      this.alert.showApiError(error); 
    })
  }

}
