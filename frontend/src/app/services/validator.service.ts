import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  // Check if email is valid with regex
  isValidEmail(email: string) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  // Check if password has min 8 characters and max 14 characters, at least one uppercase letter, one number and one special character with regex
  isValidPassword(password: string) {
    const regex1 = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?\/|\\-]).{8,14}$/;
    
    const regex2 = /(.)\1/;

    return regex1.test(password) && !regex2.test(password);
  }

  // Check if two neighbouring characters are the same including special characters with regex
  areTwoNeighbouringCharactersTheSame(password: string) {
    const regex = /(.)\1/;
    return regex.test(password);
  }

}
