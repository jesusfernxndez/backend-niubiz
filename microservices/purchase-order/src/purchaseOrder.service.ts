import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PurchaseOrderModel, PurchaseOrder } from './puchaseOrder.interface';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @Inject('PURCHASE_ORDER_MODEL')
    private readonly model: Model<PurchaseOrderModel>,
  ) {}

  async getPurchaseOrders(idUser: string): Promise<PurchaseOrderModel[]> {
    return await this.model.find({
      'auditProperties.userCreate.idUser': idUser,
      'auditProperties.activeRecord': true,
    });
  }

  async findPurchaseOrder(
    idUser: string,
    idPurchaseOrder: string,
  ): Promise<PurchaseOrderModel> {
    const find = await this.model.findOne({
      _id: idPurchaseOrder,
      'auditProperties.activeRecord': true,
    });
    if (!find) {
      throw new HttpException('Purchase order not found', HttpStatus.NOT_FOUND);
    }
    if (find.auditProperties.userCreate.idUser.toString() !== idUser) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return find;
  }

  async createPurchaseOrder(purchaseOrder: PurchaseOrder): Promise<void> {
    await this.model.create(purchaseOrder);
  }
}
