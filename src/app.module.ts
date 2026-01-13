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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
