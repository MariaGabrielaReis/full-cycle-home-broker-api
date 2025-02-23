import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { AssetDailyPresenter } from './asset-dailies.presenter';
import { AssetDailiesService } from './asset-dailies.service';
import { AssetPresenter } from './assets.presenter';
import { AssetsService } from './assets.service';

@WebSocketGateway({ cors: true })
export class AssetsGateway implements OnGatewayInit {
  logger = new Logger(AssetsGateway.name);

  constructor(
    private assetsService: AssetsService,
    private assetDailiesService: AssetDailiesService,
  ) {}

  afterInit(server: Server) {
    this.assetsService.subscribeNewPriceChangedEvents().subscribe((asset) => {
      server
        .to(asset.ticker)
        .emit('assets/price-changed', new AssetPresenter(asset).toJSON());
    });

    this.assetDailiesService
      .subscribeCreatedEvents()
      .subscribe((assetDaily) => {
        server
          .to(assetDaily.asset.ticker)
          .emit(
            'assets/daily-created',
            new AssetDailyPresenter(assetDaily).toJSON(),
          );
      });
  }

  @SubscribeMessage('join-assets')
  handleJoinAssets(client: any, payload: { tickers: string[] }) {
    if (!payload.tickers.length) return;
    payload.tickers.map((ticker) => client.join(ticker));

    this.logger.log(
      `Client ${client.id} joined assets: ${payload.tickers.join(', ')}`,
    );
  }

  @SubscribeMessage('join-asset')
  handleJoinAsset(client: any, payload: { ticker: string }) {
    if (!payload.ticker) return;
    client.join(payload.ticker);

    this.logger.log(`Client ${client.id} joined asset: ${payload.ticker}`);
  }

  @SubscribeMessage('leave-assets')
  handleLeaveAssets(client: any, payload: { tickers: string[] }) {
    if (!payload.tickers.length) return;
    payload.tickers.map((ticker) => client.leave(ticker));

    this.logger.log(
      `Client ${client.id} left assets: ${payload.tickers.join(', ')}`,
    );
  }

  @SubscribeMessage('leave-asset')
  handleLeaveAsset(client: any, payload: { ticker: string }) {
    if (!payload.ticker) return;
    client.leave(payload.ticker);

    this.logger.log(`Client ${client.id} left asset: ${payload.ticker}`);
  }
}
