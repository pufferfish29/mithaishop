import { IsEmail, IsString, Length } from "class-validator";
import {
  COLUMN_DEFAULT_LENGTH,
  EMAIL_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../constants/constants";

export class CreateUserDto {
  @IsString()
  @Length(USERNAME_MIN_LENGTH, COLUMN_DEFAULT_LENGTH)
  username: string;

  @IsEmail()
  @Length(EMAIL_MIN_LENGTH, COLUMN_DEFAULT_LENGTH)
  email: string;

  @Length(PASSWORD_MIN_LENGTH, COLUMN_DEFAULT_LENGTH)
  password: string;
}
