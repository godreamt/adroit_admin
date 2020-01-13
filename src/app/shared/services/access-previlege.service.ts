import { Injectable } from '@angular/core';

const previlege = {
  admin : {
    allEvent: "full",
    newEvent: "full",
    eventVolunteer: "full",
    shiftPlan: "full",
    allUser: "full",
    newUser: "full",
    employeeLeaves: "full",
    employeeWorkLoad: "full",
    employeeParameters: "full",
    pensumMaster: "full",
    workPercentage: "full",
    publicHoliday: "full",
    resetPassWord: "full",
    volunteerRequest: "full",
    swapRequest: "denied",
    notifications: "full"
  },
  employee : {
    allEvent: "read",
    newEvent: "denied",
    editEvent: "read",
    eventVolunteer: "read",
    shiftPlan: "full",
    allUser: "read",
    newUser: "denied",
    employeeLeaves: "read",
    employeeWorkLoad: "read",
    employeeParameters: "read",
    pensumMaster: "denied",
    workPercentage: "denied",
    publicHoliday: "read",
    resetPassWord: "full",
    volunteerRequest: "denied",
    swapRequest: "full",
    notifications: "full"
  },
  volunteer : {
    allEvent: "read",
    newEvent: "denied",
    editEvent: "read",
    eventVolunteer: "read",
    shiftPlan: "full",
    allUser: "denied",
    newUser: "denied",
    employeeLeaves: "denied",
    employeeWorkLoad: "denied",
    employeeParameters: "denied",
    pensumMaster: "denied",
    workPercentage: "denied",
    publicHoliday: "read",
    resetPassWord: "full",
    volunteerRequest: "denied",
    swapRequest: "denied",
    notifications: "full"
  },
  cook : {
    allEvent: "read",
    newEvent: "denied",
    editEvent: "read",
    eventVolunteer: "read",
    shiftPlan: "full",
    allUser: "denied",
    newUser: "denied",
    employeeLeaves: "denied",
    employeeWorkLoad: "denied",
    employeeParameters: "denied",
    pensumMaster: "denied",
    workPercentage: "denied",
    publicHoliday: "read",
    resetPassWord: "full",
    volunteerRequest: "denied",
    swapRequest: "denied",
    notifications: "full"
  },
  temp_emp : {
    allEvent: "read",
    newEvent: "denied",
    editEvent: "read",
    eventVolunteer: "read",
    shiftPlan: "full",
    allUser: "denied",
    newUser: "denied",
    employeeLeaves: "denied",
    employeeWorkLoad: "denied",
    employeeParameters: "denied",
    pensumMaster: "denied",
    workPercentage: "denied",
    publicHoliday: "read",
    resetPassWord: "full",
    volunteerRequest: "denied",
    swapRequest: "denied",
    notifications: "full"

  },
  zivi : {
    allEvent: "read",
    newEvent: "denied",
    editEvent: "read",
    eventVolunteer: "read",
    shiftPlan: "full",
    allUser: "denied",
    newUser: "denied",
    employeeLeaves: "denied",
    employeeWorkLoad: "denied",
    employeeParameters: "denied",
    pensumMaster: "denied",
    workPercentage: "denied",
    publicHoliday: "read",
    resetPassWord: "full",
    volunteerRequest: "denied",
    swapRequest: "denied",
    notifications: "full"

  }
}

@Injectable({
  providedIn: 'root'
})
export class AccessPrevilegeService {

  constructor() { }

  getPrevileges() {
    let role = localStorage.getItem('roles');
    return previlege[role];
  }
}
