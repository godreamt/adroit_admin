import { DataService } from 'src/app/shared/services/data.service';
import { AlertService } from './../../shared/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  form: FormGroup;
  userId: any;
  currentImage: any;
  mainCategory: any[]=[];
  countryList;
  stateList;
  regionList;
  areaList;
  userData;

  constructor(private fb: FormBuilder, private alert: AlertService, private _serv: DataService, private router: Router, private route: ActivatedRoute) { 
    this.userId = this.route.snapshot.params.id;
    

    this.form = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required]],
      password: [''],
      isActive: ['yes', [Validators.required]],
      roles: ['', [Validators.required]],
      monthlySalary: [''],
      salesTarget: [''],
      collectionTarget: [''],
      fatherName: [''],
      motherName: [''],
      alternativeMobileNumber: [''],
      alternativeEmail: [''],
      alternativeAddress: [''],
      panNumber: [''],
      adharNumber: [''],
      drivingLicence: [''],
      dateOfBirth: [null],
      country_id: [''],
      state_id: [''],
      region_id: [''],
      area_id: [''],
      address: [''],
    })

    if(this.userId) {
      this.route.data.subscribe(response => {
        this.userData = response['user'];
        this.processResponse();
    })
    }

  }

  ngOnInit() {
    this.getCountries();
  }

  processResponse() {
    this.form.patchValue({
      id: this.userData.id,
      firstName:this.userData.firstName,
      lastName:this.userData.lastName,
      email:this.userData.email,
      mobileNumber:this.userData.mobileNumber,
      password:this.userData.password,
      isActive:(this.userData.isActive)?"yes":"no",
      roles:this.userData.roles,
      monthlySalary:this.userData.monthlySalary,
      salesTarget:this.userData.salesTarget,
      collectionTarget:this.userData.collectionTarget,
      country_id:this.userData.country_id,
      state_id:this.userData.state_id,
      region_id:this.userData.region_id,
      area_id:this.userData.area_id,
      address:this.userData.address,
    })

    if(this.userData.extraInfo) {
      this.form.patchValue({
        fatherName:this.userData.extraInfo.fatherName,
        motherName:this.userData.extraInfo.motherName,
        alternativeMobileNumber:this.userData.extraInfo.alternativeMobileNumber,
        alternativeEmail:this.userData.extraInfo.alternativeEmail,
        alternativeAddress:this.userData.extraInfo.alternativeAddress,
        panNumber:this.userData.extraInfo.panNumber,
        adharNumber:this.userData.extraInfo.adharNumber,
        drivingLicence:this.userData.extraInfo.drivingLicence,
        dateOfBirth:this.userData.extraInfo.dateOfBirth,
      })
    }
    if(this.userData.country_id) {
      this.getStates();
    }
    if(this.userData.state_id) {
      this.getRegions();
    }
    if(this.userData.region_id) {
      this.getArea();
    }
  }

  updateUser(event) {
    event.preventDefault();
    this._serv.markFormGroupTouched(this.form);
    console.log(this.form);
    
    if(this.form.invalid)return;
    this._serv.url = "user";
    let data = this.form.value;
    if(data.dateOfBirth instanceof Object){
      data.dateOfBirth = data.dateOfBirth.year + "-" + data.dateOfBirth.month + "-" + data.dateOfBirth.day
    }
    this._serv.create(this.form.value).subscribe(response => {
      this.alert.success(response[0]);
      this.router.navigate(['/user-manager/list']);
    }, error => {
      this.alert.showApiError(error)
    })
  }

  get roles() {
    return this.form.get('roles').value;
  }

  

  getCountries() {
    this._serv.url="countrys";
    this._serv.get().subscribe(response => {
      this.countryList = response;
    })
  }

  getStates() {
    let data = this.form.value;
    this._serv.url = "states?country_id="+data.country_id;
    this._serv.get().subscribe(response => {
      this.stateList = response;
    })
  }

  getRegions() {
    let data = this.form.value;
    this._serv.url = "regions?country_id="+data.country_id+"&state_id="+data.state_id;
    this._serv.get().subscribe(response => {
      this.regionList = response;
    })
  }


  getArea() {
    let data = this.form.value;
    this._serv.url = "areas?country_id="+data.country_id+"&state_id="+data.state_id+"&region_id="+data.region_id;
    this._serv.get().subscribe(response => {
      this.areaList = response;
    })
  }
}
