import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import { AssetDaily } from './entities/asset-daily.entity';
import { Asset } from './entities/asset.entity';

export class AssetDailiesService {
  constructor(
    @InjectModel(AssetDaily.name) private assetDailySchema: Model<AssetDaily>,
    @InjectModel(Asset.name) private assetSchema: Model<Asset>,
  ) {}

  async findAll(ticker: string) {
    const asset = await this.assetSchema.findOne({ ticker });
    return this.assetDailySchema.find({ asset: asset!._id }).sort({ date: 1 });
  }

  async create(dto: { ticker: string; date: Date; price: number }) {
    const asset = await this.assetSchema.findOne({ ticker: dto.ticker });
    return this.assetDailySchema.create({
      asset: asset!._id,
      date: dto.date,
      price: dto.price,
    });
  }

  subscribeCreatedEvents(): Observable<AssetDaily & { asset: Asset }> {
    return new Observable((observer) => {
      this.assetDailySchema
        .watch([{ $match: { operationType: 'insert' } }], {
          fullDocument: 'updateLookup',
        })
        .on('change', async (data) => {
          const assetDaily = await this.assetDailySchema
            .findById(data.fullDocument._id)
            .populate('asset');
          observer.next(assetDaily! as AssetDaily & { asset: Asset });
        });
    });
  }
}
