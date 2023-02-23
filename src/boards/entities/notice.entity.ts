import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsString, IsNumber } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type NoticeDocument = HydratedDocument<Notice>;

@Schema()
export class Notice {
  _id: mongoose.Types.ObjectId;

  @IsString()
  noticeId: string;

  @Prop({ required: true, type: String })
  @IsString()
  title: string;

  @Prop({ required: true, type: String })
  @IsString()
  content: string;

  @Prop({ required: true, type: String })
  @IsString()
  noticeImgName: string;

  @Prop({ required: true, type: Number })
  @IsNumber()
  noticeImgSize: number;

  @Prop({ required: true, type: String })
  @IsString()
  noticeImgPath: string;

  @Prop({ required: true, type: Date, default: Date.now() })
  @IsDate()
  createdAt: Date;
}
export const NoticeSchema = SchemaFactory.createForClass(Notice);

NoticeSchema.virtual('noticeId').get(function () {
  const noticeId = this._id.toString();
  return noticeId;
});
