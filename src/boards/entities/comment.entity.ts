import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsString } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Board } from './board.entity';
import { Type } from 'class-transformer';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  _id: mongoose.Types.ObjectId;

  @IsString()
  commentId: string;

  @Prop({ required: true, type: String })
  @IsString()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  owner: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  @Type(() => Board)
  board: Board;

  @Prop({ required: true, type: Date, default: Date.now() })
  @IsDate()
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.virtual('commentId').get(function () {
  const commentId = this._id.toString();
  return commentId;
});
