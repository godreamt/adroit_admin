import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable()
class UrlServ {
  url="";
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl:String =environment.url;
  url=""
  constructor(private http: HttpClient) {
   }

  get(){
    return this.http.get(this.apiUrl+this.url);
  }

  create(formData){
    return this.http.post(this.apiUrl+this.url, formData);
  }

  update(id,formData){
    return this.http.put(this.apiUrl+this.url+"/"+id, formData);
  }
  
  delete(id){
    return this.http.delete(this.apiUrl+this.url+"/"+id);
  }
  
  getBy(id){
    return this.http.get(this.apiUrl+this.url+"/"+id);
  }

  getByURL(url){
    return this.http.get(this.apiUrl+this.url+"/"+url);
  }

  postByURL(url,formData={}){
    return this.http.post(this.apiUrl+this.url+"/"+url, formData );
  }

  deleteByURL(url,id){
    return this.http.delete(this.apiUrl+this.url+"/"+url+"/"+id);
  }
  
  
  createFormData(object: Object, form?: FormData, namespace?: string): FormData {
    const formData = form || new FormData();
    for (let property in object) {
        if (!object.hasOwnProperty(property) || !object[property]) {
          continue;
        }
        const formKey = namespace ? `${namespace}[${property}]` : property;
        if (object[property] instanceof Date) {
          formData.append(formKey, object[property].toISOString());
        } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
          this.createFormData(object[property], formData, formKey);
        } else {
          formData.append(formKey, object[property]);
        }
    }


    return formData;
}

  
  formatDate(date, f='y') {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if(f == 'y')
      return [year, month, day].join('-');
    else
      return [month, day, year].join('-');
  }

  convertObjectToArray(data={}){
    
    var res = Object.keys(data).map(elem => {
      return data[elem];
    });
    return res;
  }

  // get all values of the formGroup, loop over them
  // then mark each field as touched
  public markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      if ('controls' in control) {
        this.markFormGroupTouched(control as FormGroup);
          // control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  // return list of error messages
  public validationMessages() {
    const messages = {
      required: 'This field is required',
      email: 'This email address is invalid',
      invalid_characters: (matches: any[]) => {

        let matchedCharacters = matches;

        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let string = characterString;
          string += character;

          if (matchedCharacters.length !== index + 1) {
            string += ', ';
          }

          return string;
        }, '');

        return `These characters are not allowed: ${matchedCharacters}`;
      },
    };

    return messages;
  }

  // Validate form instance
  // check_dirty true will only emit errors if the field is touched
  // check_dirty false will check all fields independent of
  // being touched or not. Use this as the last check before submitting
  public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
    const form = formToValidate;

    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);

        const messages = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              if (key && key !== 'invalid_characters') {
                formErrors[field] = formErrors[field] || messages[key];
              } else {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
            }
          }
        }
      }
    }

    return formErrors;
  }
}
