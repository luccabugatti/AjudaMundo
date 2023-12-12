import { IsInt, IsString, IsOptional } from 'class-validator'

export class UpdateActivityDto {
  @IsString()
  name: string

  @IsInt()
  points: number

  @IsString()
  description: string

  @IsOptional()
  @IsString()
  mainImg?: string

  @IsOptional()
  @IsInt()
  status?: number

  @IsInt()
  ongId: number

  @IsOptional()
  @IsInt()
  userId?: number

  @IsOptional()
  @IsString()
  realizationField?: string
}
