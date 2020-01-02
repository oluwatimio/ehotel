import {isDevMode} from '@angular/core';

const BASE_USER = '/user';
const EMPLOYEE = '/employee';
const ADD = '/add';
const ALL = '/all';

export function API_BASE() {
  return isDevMode() === false ? 'https://e-hotels.appspot.com' : 'http://localhost:8080';
}
