import { IsEmail, IsString, IsOptional } from 'class-validator'

export class CreateOngDto {
  @IsString()
  name: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsOptional()
  @IsString()
  profileImg?: string
}
