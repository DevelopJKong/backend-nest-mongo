import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNumber, IsDate } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Type } from 'class-transformer';
import { CommunityComment } from './community-comment.entity';

export type CommunityDocument = HydratedDocument<Community>;

@Schema()
export class Community {
  _id: mongoose.Types.ObjectId;

  @IsString()
  communityId: string;

  @Prop({ type: String, required: true })
  @IsString()
  title: string;

  @Prop({ type: String, required: true })
  @IsString()
  communityImgName: string;

  @Prop({ type: Number, required: true })
  @IsNumber()
  communityImgSize: number;

  @Prop({ type: String, required: true })
  @IsString()
  communityImgPath: string;

  @Prop({ type: String, required: true })
  @IsString()
  content: string;

  @Prop({ type: Number })
  @IsNumber()
  views?: number;

  @Prop({ type: Number })
  @IsNumber()
  rating?: number;

  @Prop({ required: true, type: Date, default: Date.now() })
  @IsDate()
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  owner: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  @Type(() => CommunityComment)
  comments: CommunityComment[];
}

export const CommunitySchema = SchemaFactory.createForClass(Community);

CommunitySchema.virtual('communityId').get(function () {
  const communityId = this._id.toString();
  return communityId;
});
