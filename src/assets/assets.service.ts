import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetsService {
  create(createAssetDto: CreateAssetDto) {
    return 'This action adds a new asset';
  }

  findAll() {
    return `This action returns all assets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }
}
