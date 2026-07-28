import { IsOptional, IsString } from 'class-validator';

export class UpdateProfilePreferencesDTO {
  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsString()
  language?: string;
}

export class ProfilePreferencesResponseDTO {
  theme?: string;
  language?: string;
}
