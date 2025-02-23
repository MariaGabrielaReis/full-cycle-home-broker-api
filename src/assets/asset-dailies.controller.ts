import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AssetDailiesService } from './asset-dailies.service';

@Controller('assets/:ticker/dailies')
export class AssetsDailiesController {
  constructor(private assetsDailiesService: AssetDailiesService) {}

  @Get()
  findAll(@Param('ticker') ticker: string) {
    return this.assetsDailiesService.findAll(ticker);
  }

  @Post()
  create(
    @Body() dto: { date: string; price: number },
    @Param('ticker') ticker: string,
  ) {
    return this.assetsDailiesService.create({
      ticker,
      date: new Date(dto.date),
      price: dto.price,
    });
  }
}
