/**
 * File Name  : Orders_Coupon.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrdersCouponAttributes {
  ordersId: number;
  couponsId: number;
}

export type OrdersCouponCreationAttributes = OrdersCouponAttributes;

export class OrdersCoupon extends Model<OrdersCouponAttributes, OrdersCouponCreationAttributes> implements OrdersCouponAttributes {
  ordersId!: number;
  couponsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrdersCoupon {
    return OrdersCoupon.init({
    ordersId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id'
      },
      field: 'orders_id'
    },
    couponsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Coupon',
        key: 'id'
      },
      field: 'coupons_id'
    }
  }, {
    sequelize,
    tableName: 'Orders_Coupon',
    timestamps: false,
    indexes: [
      {
        name: "ind_Orders_Coupon_coupons_id",
        using: "BTREE",
        fields: [
          { name: "coupons_id" },
        ]
      },
      {
        name: "ind_Orders_Coupon_orders_id",
        using: "BTREE",
        fields: [
          { name: "orders_id" },
        ]
      },
    ]
  });
  }
}
