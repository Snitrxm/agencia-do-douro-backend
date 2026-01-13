import { PartialType } from '@nestjs/mapped-types';
import { CreatePodcastTopicDto } from './create-podcast-topic.dto';

export class UpdatePodcastTopicDto extends PartialType(CreatePodcastTopicDto) {}
