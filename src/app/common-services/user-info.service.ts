import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor() { }

  // storeRegistrationData(data:any=[]) {
  //   localStorage.setItem('userData', JSON.stringify(data));
  // }

  storeRegistrationData(data: any) {
    // Get the existing data from localStorage
    const existingDataString = localStorage.getItem('userData');
    let existingData = [];
  
    if (existingDataString) {
      // Parse the existing data from a JSON string
      existingData = JSON.parse(existingDataString);
    }
  
    // Ensure existingData is an array
    if (!Array.isArray(existingData)) {
      existingData = [];
    }
  
    // Add the new data to the existing data
    existingData.push(data);
  
    // Store the updated data in localStorage
    localStorage.setItem('userData', JSON.stringify(existingData));
  }
  

  // Retrieve registration data from localStorage
  getRegistrationData() {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
  }
}
