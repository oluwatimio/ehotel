export class User {
  private readonly _firstName: string;
  private readonly _lastName: string;
  private readonly _email: string;
  private readonly _ssn: string;
  constructor(firstName: string, lastName: string, email: string, ssn: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._ssn = ssn;
  }

  get firstName() {
    return this._firstName;
  }
  get lastName() {
    return this._lastName;
  }
  get email() {
    return this._email;
  }
  get ssn() {
    return this._ssn;
  }
}
