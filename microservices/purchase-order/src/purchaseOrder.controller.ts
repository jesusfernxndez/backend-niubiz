import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ShoppingCartAxiosDTO } from './axios/ShoppingCartAxios';
import { PurchaseOrderRequestDTO } from './purchaseOrder.dto';
import { PurchaseOrderService } from './purchaseOrder.service';
import { v4 } from 'uuid';
import { PurchaseOrderModel } from './puchaseOrder.interface';

@Controller()
export class PuchaseOrderController {
  private readonly shoppingCartAPI: AxiosInstance;
  constructor(private readonly service: PurchaseOrderService) {
    this.shoppingCartAPI = axios.create({
      baseURL: 'http://192.168.0.82:3003/api/shopping-cart/v1.0',
    });
  }

  @Get('/:idUser')
  async getPuchaseOrders(
    @Param('idUser') idUser: string,
  ): Promise<PurchaseOrderModel[]> {
    return this.service.getPurchaseOrders(idUser);
  }

  @Get('/:idUser/:idPurchaseOrder')
  async findPuchaseOrder(
    @Param('idUser') idUser: string,
    @Param('idPurchaseOrder') idPurchaseOrder: string,
  ): Promise<PurchaseOrderModel> {
    return this.service.findPurchaseOrder(idUser, idPurchaseOrder);
  }

  @Post()
  async createPurchaseOrder(
    @Body() purchaseOrder: PurchaseOrderRequestDTO,
  ): Promise<void> {
    const shoppingCart = await this.shoppingCartAPI.get<ShoppingCartAxiosDTO>(
      `/${purchaseOrder.auditProperties.userCreate.idUser}/${purchaseOrder.shoppingCartId}`,
    );
    if (!shoppingCart.data) {
      throw new HttpException('Shopping cart not found', HttpStatus.NOT_FOUND);
    }
    this.shoppingCartAPI
      .patch(
        `/event_purchase_order/${purchaseOrder.auditProperties.userCreate.idUser}/${purchaseOrder.shoppingCartId}`,
      )
      .then(() => {
        this.service.createPurchaseOrder({
          orderNumber: v4(),
          shoppingNumber: shoppingCart.data.shoppingNumber,
          deliveryDate: new Date(purchaseOrder.deliveryDate),
          products: shoppingCart.data.products,
          status: {
            value: purchaseOrder.status?.value ?? 1,
            description:
              purchaseOrder.status?.description ?? 'Generated purchase order',
          },
          auditProperties: {
            dateCreate: new Date(),
            dateUpdate: new Date(),
            userCreate: {
              idUser: purchaseOrder.auditProperties.userCreate.idUser,
              email: purchaseOrder.auditProperties.userCreate.email,
            },
            activeRecord: true,
          },
        });
      });
  }
}
