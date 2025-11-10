import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Min,
} from "class-validator";

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class ResetPasswordDto {
  @IsInt()
  @Min(1)
  userId!: number;

  @IsString()
  @IsNotEmpty()
  token!: string;

  @IsStrongPassword()
  @IsNotEmpty()
  newPassword!: string;
}
