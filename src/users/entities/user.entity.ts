import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IsBoolean, IsEmail, IsPhoneNumber, IsString, Matches, IsJWT } from 'class-validator';
import { Transform } from 'class-transformer';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}
@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId })
  @Transform(({ value }) => value.toString())
  @IsString()
  _id: string;

  @Prop({ type: String, required: true })
  @IsString()
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

  @Prop({ type: String, required: false, unique: true })
  @IsPhoneNumber('KR')
  phoneNum: string;

  @Prop({ type: String, required: false, default: '한국' })
  @IsString()
  region: string;

  @Prop({ type: String, enum: UserRole, required: false, default: UserRole.User })
  @IsString()
  role: UserRole;

  @Prop({ type: String, required: false })
  @IsJWT()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
