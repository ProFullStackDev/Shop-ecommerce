/**
 * File Name  : ShippingMethod_PaymentMethod.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ShippingMethodPaymentMethodAttributes {
  shippingMethodsId: number;
  paymentMethodsId: number;
}

export type ShippingMethodPaymentMethodPk = "shippingMethodsId" | "paymentMethodsId";
export type ShippingMethodPaymentMethodId = ShippingMethodPaymentMethod[ShippingMethodPaymentMethodPk];
export type ShippingMethodPaymentMethodCreationAttributes = ShippingMethodPaymentMethodAttributes;

export class ShippingMethodPaymentMethod extends Model<ShippingMethodPaymentMethodAttributes, ShippingMethodPaymentMethodCreationAttributes> implements ShippingMethodPaymentMethodAttributes {
  shippingMethodsId!: number;
  paymentMethodsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ShippingMethodPaymentMethod {
    return ShippingMethodPaymentMethod.init({
    shippingMethodsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ShippingMethod',
        key: 'id'
      },
      field: 'shippingMethods_id'
    },
    paymentMethodsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PaymentMethod',
        key: 'id'
      },
      field: 'paymentMethods_id'
    }
  }, {
    sequelize,
    tableName: 'ShippingMethod_PaymentMethod',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "shippingMethods_id" },
          { name: "paymentMethods_id" },
        ]
      },
      {
        name: "ind_ShippingMethod_PaymentMethod_paymentMethods_id",
        using: "BTREE",
        fields: [
          { name: "paymentMethods_id" },
        ]
      },
    ]
  });
  }
}
