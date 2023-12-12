import { IsInt, IsString, IsOptional } from 'class-validator'

export class ActivityType {
  @IsString()
  name: string

  @IsInt()
  points: number

  @IsInt()
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
