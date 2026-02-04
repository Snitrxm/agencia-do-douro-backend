import { PartialType } from '@nestjs/mapped-types';
import { CreatePodcastGuestDto } from './create-podcast-guest.dto';

export class UpdatePodcastGuestDto extends PartialType(CreatePodcastGuestDto) {}
