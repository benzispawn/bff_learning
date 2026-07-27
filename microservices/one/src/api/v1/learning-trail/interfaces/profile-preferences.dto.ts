import { IsOptional, IsString } from 'class-validator';

export class UpdateProfilePreferencesDTO {
  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsString()
  language?: string;
}
