import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Community, CommunitySchema } from './entities/community.entity';
import { CommunityComment, CommunityCommentSchema } from './entities/community-comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Community.name, schema: CommunitySchema },
      { name: CommunityComment.name, schema: CommunityCommentSchema },
    ]),
  ],
})
export class CommunitiesModule {}
