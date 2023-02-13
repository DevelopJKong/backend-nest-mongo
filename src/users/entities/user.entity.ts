import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsBoolean, IsEmail, IsPhoneNumber, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  @IsEmail()
  name: string;

  @Prop({ type: String, required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ type: String, required: true, unique: true })
  @IsString()
  username: string;

  @Prop({ type: String, required: true })
  @Transform(params => params.value.trim())
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{5,20}$/)
  @IsString()
  password: string;

  @Prop({ type: String, required: false, default: 'avatar' })
  @IsString()
  avatar: string;

  @Prop({ type: String, required: false, default: false })
  @IsBoolean()
  socialOnly: boolean;

  @Prop({ type: String, required: false })
  @IsPhoneNumber('KR')
  phoneNum: string;

  @Prop({ type: String, required: false, default: '한국' })
  @IsString()
  region: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
