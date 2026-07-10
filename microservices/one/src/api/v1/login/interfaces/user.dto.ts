import { Exclude } from 'class-transformer';

export class UserDTO {
  constructor(_id, username, password, accessToken) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.accessToken = accessToken;
  }
  _id?: string;
  username: string;
  accessToken?: string;

  @Exclude()
  password: string;
}
