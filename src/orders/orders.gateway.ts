import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@WebSocketGateway({ cors: true })
export class OrdersGateway {
  constructor(private ordersService: OrdersService) {}

  @SubscribeMessage('orders/create')
  async handleMessage(client: any, payload: CreateOrderDto): Promise<Order> {
    const { walletId, assetId, shares, price, type } = payload;

    const order = await this.ordersService.create({
      assetId,
      walletId,
      type,
      shares,
      price,
    });
    return order;
  }
}
