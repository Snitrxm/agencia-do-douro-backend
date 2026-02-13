import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nConfigModule } from './i18n/i18n.module';
import { PropertiesModule } from './properties/properties.module';
import { UploadModule } from './upload/upload.module';
import { NewslettersModule } from './newsletters/newsletters.module';
import { SiteConfigModule } from './site-config/site-config.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { DesiredZonesModule } from './desired-zones/desired-zones.module';
import { PodcastTopicsModule } from './podcast-topics/podcast-topics.module';
import { PodcastContentModule } from './podcast-content/podcast-content.module';
import { PodcastGuestsModule } from './podcast-guests/podcast-guests.module';
import { PodcastTestimonialsModule } from './podcast-testimonials/podcast-testimonials.module';
import { PodcastGalleryModule } from './podcast-gallery/podcast-gallery.module';
import { PodcastWhyListenModule } from './podcast-why-listen/podcast-why-listen.module';
import { AboutUsContentModule } from './about-us-content/about-us-content.module';
import { SellPropertyContentModule } from './sell-property-content/sell-property-content.module';
import { CultureItemsModule } from './culture-items/culture-items.module';
import { ServiceItemsModule } from './service-items/service-items.module';
import { DepoimentosModule } from './depoimentos/depoimentos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    I18nConfigModule,
    PropertiesModule,
    UploadModule,
    NewslettersModule,
    SiteConfigModule,
    TeamMembersModule,
    DesiredZonesModule,
    PodcastTopicsModule,
    PodcastContentModule,
    PodcastGuestsModule,
    PodcastTestimonialsModule,
    PodcastGalleryModule,
    PodcastWhyListenModule,
    AboutUsContentModule,
    SellPropertyContentModule,
    CultureItemsModule,
    ServiceItemsModule,
    DepoimentosModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
