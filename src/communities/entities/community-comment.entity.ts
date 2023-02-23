import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Community } from './community.entity';

export type CommunityCommentDocument = HydratedDocument<CommunityComment>;

@Schema()
export class CommunityComment {
  _id: mongoose.Types.ObjectId;

  @IsString()
  commentId: string;

  @Prop({ required: true, type: String })
  @IsString()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  owner: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Community' })
  @Type(() => Community)
  community: Community;

  @Prop({ required: true, type: Date, default: Date.now() })
  @IsDate()
  createdAt: Date;
}

export const CommunityCommentSchema = SchemaFactory.createForClass(CommunityComment);

CommunityCommentSchema.virtual('commentId').get(function () {
  const commentId = this._id.toString();
  return commentId;
});
