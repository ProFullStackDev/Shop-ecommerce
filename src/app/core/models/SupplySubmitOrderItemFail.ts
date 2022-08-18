/**
 * File Name  : SupplySubmitOrderItemFail.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SupplySubmitOrderItemFailAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  quantity: number;
  itemOrderNum?: string;
  supplyOrderNo?: string;
  skuId: string;
  memo?: string;
  orderId: string;
  shopNo: string;
  orderNum?: string;
}

export type SupplySubmitOrderItemFailPk = "id";
export type SupplySubmitOrderItemFailId = SupplySubmitOrderItemFail[SupplySubmitOrderItemFailPk];
export type SupplySubmitOrderItemFailOptionalAttributes = "createdDate" | "lastModifiedDate" | "version" | "itemOrderNum" | "supplyOrderNo" | "memo" | "orderNum";
export type SupplySubmitOrderItemFailCreationAttributes = Optional<SupplySubmitOrderItemFailAttributes, SupplySubmitOrderItemFailOptionalAttributes>;

export class SupplySubmitOrderItemFail extends Model<SupplySubmitOrderItemFailAttributes, SupplySubmitOrderItemFailCreationAttributes> implements SupplySubmitOrderItemFailAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  quantity!: number;
  itemOrderNum?: string;
  supplyOrderNo?: string;
  skuId!: string;
  memo?: string;
  orderId!: string;
  shopNo!: string;
  orderNum?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof SupplySubmitOrderItemFail {
    return SupplySubmitOrderItemFail.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "供应链订单项ID"
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间"
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "版本号"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "失败数量"
    },
    itemOrderNum: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "供应链订单项编号"
    },
    supplyOrderNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "供应链订单号"
    },
    skuId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "供应链订单项SkuID"
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "失败原因"
    },
    orderId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "供应链订单ID"
    },
    shopNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "供应链购物单号",
      references: {
        model: 'OrderItem',
        key: 'scmOrderShopNo'
      }
    },
    orderNum: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "供应链订单编号"
    }
  }, {
    sequelize,
    tableName: 'SupplySubmitOrderItemFail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "OrderItem_scmOrderShopNo",
        using: "BTREE",
        fields: [
          { name: "shopNo" },
        ]
      },
    ]
  });
  }
}
