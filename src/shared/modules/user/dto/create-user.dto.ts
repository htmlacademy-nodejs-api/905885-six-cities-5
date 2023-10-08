import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  public name: string;
  public mail: string;
  public avatar: string;
  public password: string;
  public userType: UserType;
}
