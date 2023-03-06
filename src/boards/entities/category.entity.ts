import { HydratedDocument } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IsString, IsDate } from 'class-validator';
export type CategoryDocument = HydratedDocument<Category>;

@Schema({ collection: 'category' })
export class Category {
  _id: mongoose.Types.ObjectId;

  @IsString()
  categoryId: string;

  @Prop({ required: true, type: String })
  @IsString()
  categoryName: string;

  @Prop({ required: true, type: Date, default: Date.now() })
  @IsDate()
  createdAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('commentId').get(function () {
  const categoryId = this._id.toString();
  return categoryId;
});
