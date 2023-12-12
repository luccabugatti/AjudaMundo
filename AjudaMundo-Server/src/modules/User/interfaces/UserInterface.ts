import { IsEmail, IsInt, IsString } from 'class-validator'

export class UserType {
  @IsString()
  name: string

  @IsString()
  @IsEmail()
  email: string

  @IsInt()
  password: string

  @IsString()
  profileImg?: string
}
