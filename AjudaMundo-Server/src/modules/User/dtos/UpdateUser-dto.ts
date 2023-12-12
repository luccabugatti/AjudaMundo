import { UserType } from '../interfaces'

import { IsInt } from 'class-validator'

export class UpdateUserDto {
  @IsInt()
  userId: number

  user: UserType
}
