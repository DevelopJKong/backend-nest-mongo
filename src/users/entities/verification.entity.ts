import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.entity';
import { Type } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export type VerificationDocument = HydratedDocument<Verification>;

@Schema({ collection: 'verification' })
export class Verification {
  _id: mongoose.Types.ObjectId;

  @IsString()
  verificationId: string;

  @Prop({ required: true, type: String })
  @IsString()
  code: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  user: User;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);

VerificationSchema.virtual('verificationId').get(function () {
  const verificationId = this._id.toString();
  return verificationId;
});

VerificationSchema.pre('save', async function () {
  this.code = uuidv4();
});
