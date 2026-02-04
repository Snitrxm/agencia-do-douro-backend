import { PartialType } from '@nestjs/mapped-types';
import { CreatePodcastWhyListenCardDto } from './create-podcast-why-listen-card.dto';

export class UpdatePodcastWhyListenCardDto extends PartialType(CreatePodcastWhyListenCardDto) {}
