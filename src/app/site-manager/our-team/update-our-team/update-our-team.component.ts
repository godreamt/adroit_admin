import { Component, OnInit } from '@angular/core';
import { _ } from 'underscore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-our-team',
  templateUrl: './update-our-team.component.html',
  styleUrls: ['./update-our-team.component.scss']
})
export class UpdateOurTeamComponent implements OnInit {
  form: FormGroup;
  enquiryId: any;
  currentImage: any;

  constructor(private fb: FormBuilder, private alert: AlertService, private _serv: DataService, private router: Router, private route: ActivatedRoute) { 
    this.enquiryId = route.snapshot.params.id;
    if(this.enquiryId){
      this.getTeamMember();
    }
    this.form = this.fb.group({
      id: [''],
      fullName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]],
      experience: [''],
      priority: [''],
      profileImage: ['']
    })
  }

  ngOnInit() {
  }

  getTeamMember() {
    this._serv.url = "site-manager/our-team/"+this.enquiryId;
    this._serv.get().subscribe(response => {
      let data = response;
      this.currentImage = data['profileImage'];
      data['profileImage']="";
      this.form.patchValue(data);
    })
  }

  updateMember(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.form);
    if(this.form.invalid)return;
    this._serv.url = "site-manager/our-team";
    this._serv.create(this.form.value).subscribe(response => {
      this.alert.success(response[0]);
      this.router.navigate(['/site-manager/our-team']);
    }, error => {
      this.alert.error(_.values(error.error.errors)[0][0]); 
    })
  }

}
