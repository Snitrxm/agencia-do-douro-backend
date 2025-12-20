import { Controller, Get, Patch, Body } from '@nestjs/common';
import { SiteConfigService } from './site-config.service';
import { UpdateSiteConfigDto } from './dto/update-site-config.dto';

@Controller('site-config')
export class SiteConfigController {
  constructor(private readonly siteConfigService: SiteConfigService) {}

  @Get()
  getConfig() {
    return this.siteConfigService.getConfig();
  }

  @Patch()
  updateConfig(@Body() updateSiteConfigDto: UpdateSiteConfigDto) {
    return this.siteConfigService.updateConfig(updateSiteConfigDto);
  }
}
