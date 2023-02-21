import { IsOptional, IsString, IsBoolean, IsObject, IsNotEmptyObject } from 'class-validator';

export class CoreOutput {
  @IsBoolean({ message: '성공 여부는 불리언이어야 합니다.' })
  ok: boolean;

  @IsOptional()
  @IsString({ message: '에러는 문자열이어야 합니다.' })
  @IsObject({ message: '에러는 객체이어야 합니다.' })
  @IsNotEmptyObject({}, { message: '에러는 비어있으면 안됩니다.' })
  error?: string | Error;

  @IsOptional()
  @IsObject({ message: '메시지는 객체이어야 합니다.' })
  @IsNotEmptyObject({}, { message: '메시지는 비어있으면 안됩니다.' })
  message?: {
    text: string;
    statusCode?: number;
  };
}
