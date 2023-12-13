import { IsInt, IsString, IsOptional } from 'class-validator'

export class UpdateActivityDto {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsInt()
  points: number

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  mainImg?: string

  @IsOptional()
  @IsInt()
  status?: number

  @IsOptional()
  @IsInt()
  ongId: number

  @IsOptional()
  @IsInt()
  userId?: number

  @IsOptional()
  @IsString()
  realizationField?: string
}
