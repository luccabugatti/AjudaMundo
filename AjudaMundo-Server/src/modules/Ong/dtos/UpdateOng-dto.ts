import { OngType } from '../interfaces'

import { IsInt } from 'class-validator'

export class UpdateOngDto {
  @IsInt()
  ongId: number

  ong: OngType
}
