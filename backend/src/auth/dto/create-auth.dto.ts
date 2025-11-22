import { OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "../../user/dto/create-user.dto";

export class SignupUserDto extends CreateUserDto {}
export class SigninUserDto extends OmitType(CreateUserDto, ["username"]) {}
