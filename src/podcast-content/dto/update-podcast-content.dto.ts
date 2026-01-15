import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdatePodcastContentDto {
  // Seção Principal
  @IsOptional()
  @IsString()
  @MaxLength(100)
  headerLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  pageTitle_pt?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  pageSubtitle_pt?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  pageDescription_pt?: string;

  // Seção Tópicos
  @IsOptional()
  @IsString()
  @MaxLength(100)
  topicsLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  topicsTitle_pt?: string;

  // Seção Episódios
  @IsOptional()
  @IsString()
  @MaxLength(100)
  episodesLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  episodesTitle_pt?: string;

  @IsOptional()
  @IsString()
  episodesDescription_pt?: string;

  // Episódios do YouTube
  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode1Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode1Title_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode2Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode2Title_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode3Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode3Title_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode4Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode4Title_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode5Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode5Title_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode6Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode6Title_pt?: string;

  // Seção Apresentadora
  @IsOptional()
  @IsString()
  @MaxLength(100)
  hostLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  hostName?: string;

  @IsOptional()
  @IsString()
  hostDescription_pt?: string;
}
