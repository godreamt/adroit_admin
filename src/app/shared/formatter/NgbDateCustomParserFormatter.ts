import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('-');
      if (dateParts.length === 1 && !isNaN(parseInt(dateParts[0]))) {
        return {day: parseInt(dateParts[0]), month: null, year: null};
      } else if (dateParts.length === 2 && !isNaN(parseInt(dateParts[0])) && !isNaN(parseInt(dateParts[1]))) {
        return {day: parseInt(dateParts[0]), month: parseInt(dateParts[1]), year: null};
      } else if (dateParts.length === 3 && !isNaN(parseInt(dateParts[0])) && !isNaN(parseInt(dateParts[1])) && !isNaN(parseInt(dateParts[2]))) {
        return {day: parseInt(dateParts[0]), month: parseInt(dateParts[1]), year: parseInt(dateParts[2])};
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    console.log(date);

    if(date) {
      let data="";
      if(isNaN(date.day)){
        data+="00";
      }else {
        var value = date.day.toString();
        if(value.length < 2){
          data+="0"+date.day;
        }else {
          data+=date.day;
        }
      }

      data+="-";
      
      if(isNaN(date.month)){
        data+="00";
      }else {
        var value = date.month.toString();
        if(value.length < 2){
          data+="0"+date.month;
        }else {
          data+=date.month;
        }
      }

      data+="-";
      
      if(isNaN(date.year)){
        data+="00";
      }else {
        var value = date.year.toString();
        if(value.length < 2){
          data+="0"+date.year;
        }else {
          data+=date.year;
        }
      }

      return data;
    }else {
      return "";
    }
    
    // return date ?
    //     `${isNaN(date.day) ? '':(date.day).toString().padStart(2, '0')}-${isNaN(date.month) ? '':date.month.toString().padStart(2, '0')}-${date.year}` :
    //     '';
  }
}