import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssetPresenter } from './assets.presenter';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async create(@Body() createAssetDto: CreateAssetDto) {
    const asset = await this.assetsService.create(createAssetDto);
    return new AssetPresenter(asset);
  }

  @Get()
  async findAll() {
    const assets = await this.assetsService.findAll();
    return assets.map((asset) => new AssetPresenter(asset));
  }

  @Get(':ticker')
  async findOne(@Param('ticker') ticker: string) {
    const asset = await this.assetsService.findOne(ticker);
    return new AssetPresenter(asset!);
  }
}
