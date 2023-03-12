import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNumber, IsDate } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type CarouselDocument = HydratedDocument<Carousel>;

@Schema({ collection: 'carousel' })
export class Carousel {
  _id: mongoose.Types.ObjectId;

  @IsString()
  carouselId: string;

  @Prop({ required: true, type: String })
  @IsString()
  carouselImgName: string;

  @Prop({ required: true, type: Number })
  @IsNumber()
  carouselImgSize: number;

  @Prop({ required: true, type: String })
  @IsString()
  carouselImgPath: string;

  @Prop({ required: true, type: String })
  @IsString()
  title: string;

  @Prop({ required: true, type: String })
  @IsString()
  link: string;

  @Prop({ required: true, type: Date, default: Date.now() })
  @IsDate()
  createdAt: Date;
}

export const CarouselSchema = SchemaFactory.createForClass(Carousel);

CarouselSchema.virtual('carouselId').get(function () {
  const carouselId = this._id.toString();
  return carouselId;
});
