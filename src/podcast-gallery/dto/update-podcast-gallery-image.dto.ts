import { PartialType } from '@nestjs/mapped-types';
import { CreatePodcastGalleryImageDto } from './create-podcast-gallery-image.dto';

export class UpdatePodcastGalleryImageDto extends PartialType(CreatePodcastGalleryImageDto) {}
