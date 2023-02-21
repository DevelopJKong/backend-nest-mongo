import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import mongoose, { SchemaTypes, HydratedDocument } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { User } from '../../users/entities/user.entity';

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
  @Prop({ type: SchemaTypes.ObjectId })
  @Transform(({ value }) => value.toString())
  @IsString()
  _id: string;

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
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
