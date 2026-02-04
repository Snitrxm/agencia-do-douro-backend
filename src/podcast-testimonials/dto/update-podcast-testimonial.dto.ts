import { PartialType } from '@nestjs/mapped-types';
import { CreatePodcastTestimonialDto } from './create-podcast-testimonial.dto';

export class UpdatePodcastTestimonialDto extends PartialType(CreatePodcastTestimonialDto) {}
