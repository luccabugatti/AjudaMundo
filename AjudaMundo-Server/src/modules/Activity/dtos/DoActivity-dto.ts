import { IsString, IsOptional } from 'class-validator'

export class DoActivityDto {
  @IsOptional()
  @IsString()
  realizationField: string
}
