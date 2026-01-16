import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateSellPropertyContentDto {
  // Hero Section
  @IsOptional()
  @IsString()
  @MaxLength(100)
  heroBadge_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  heroTitle_pt?: string;

  @IsOptional()
  @IsString()
  heroDescription_pt?: string;

  // Form Section
  @IsOptional()
  @IsString()
  @MaxLength(255)
  formTitle_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  formSubmit_pt?: string;

  // Stats Section
  @IsOptional()
  @IsString()
  @MaxLength(100)
  statsBadge_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  statsTitle_pt?: string;

  @IsOptional()
  @IsString()
  statsDescription_pt?: string;

  // Stats Items
  @IsOptional()
  @IsString()
  @MaxLength(100)
  statsReachLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  statsReachDescription_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  statsClientsLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  statsClientsDescription_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  statsLocationsLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  statsLocationsDescription_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  statsExperienceLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  statsExperienceDescription_pt?: string;

  // Marketing Section
  @IsOptional()
  @IsString()
  @MaxLength(100)
  marketingBadge_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  marketingTitle_pt?: string;

  @IsOptional()
  @IsString()
  marketingDescription_pt?: string;

  // Marketing Channels - Website
  @IsOptional()
  @IsString()
  @MaxLength(100)
  marketingWebsiteTitle_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  marketingWebsiteDescription_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  marketingWebsiteStat_pt?: string;

  // Marketing Channels - Newsletter
  @IsOptional()
  @IsString()
  @MaxLength(100)
  marketingNewsletterTitle_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  marketingNewsletterDescription_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  marketingNewsletterStat_pt?: string;

  // Marketing Channels - Agencies
  @IsOptional()
  @IsString()
  @MaxLength(100)
  marketingAgenciesTitle_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  marketingAgenciesDescription_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  marketingAgenciesStat_pt?: string;

  // Marketing Channels - Media
  @IsOptional()
  @IsString()
  @MaxLength(100)
  marketingMediaTitle_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  marketingMediaDescription_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  marketingMediaStat_pt?: string;
}
