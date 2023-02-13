import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class CoreOutput {
  @IsBoolean()
  ok: boolean;

  @IsString()
  @IsOptional()
  error?: string;
}
