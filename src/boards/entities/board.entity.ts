import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { Type } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import { BoardComment } from './board-comment.entity';
import { Category } from './category.entity';

export type BoardDocument = HydratedDocument<Board>;

@Schema({ collection: 'board' })
export class Board {
  _id: mongoose.Types.ObjectId;

  @IsString()
  boardId: string;

  @Prop({ type: String, required: true })
  @IsString()
  title: string;

  @Prop({ type: String, required: true })
  @IsString()
  boardImgName: string;

  @Prop({ type: Number, required: true })
  @IsNumber()
  boardImgSize: number;

  @Prop({ type: String, required: true })
  @IsString()
  boardImgPath: string;

  @Prop({ type: String, required: true })
  @IsString()
  content: string;

  @Prop({ type: Number })
  @IsNumber()
  @IsOptional()
  views?: number;

  @Prop({ type: Number })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @Prop({ required: true, type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  owner: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  @Type(() => BoardComment)
  comments: BoardComment[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  @Type(() => Category)
  category: Category;
}

export const BoardSchema = SchemaFactory.createForClass(Board);

BoardSchema.virtual('boardId').get(function () {
  const boardId = this._id.toString();
  return boardId;
});
