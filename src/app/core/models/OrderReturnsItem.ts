/**
 * File Name  : OrderReturnsItem.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface OrderReturnsItemAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  name: string;
  quantity: number;
  sn: string;
  specifications?: string;
  orderReturnsId: number;
}

export type OrderReturnsItemPk = "id";
export type OrderReturnsItemId = OrderReturnsItem[OrderReturnsItemPk];
export type OrderReturnsItemOptionalAttributes = "specifications";
export type OrderReturnsItemCreationAttributes = Optional<OrderReturnsItemAttributes, OrderReturnsItemOptionalAttributes>;

export class OrderReturnsItem extends Model<OrderReturnsItemAttributes, OrderReturnsItemCreationAttributes> implements OrderReturnsItemAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  name!: string;
  quantity!: number;
  sn!: string;
  specifications?: string;
  orderReturnsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderReturnsItem {
    return OrderReturnsItem.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sn: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    specifications: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    orderReturnsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'OrderReturns',
        key: 'id'
      },
      field: 'orderReturns_id'
    }
  }, {
    sequelize,
    tableName: 'OrderReturnsItem',
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
        name: "ind_OrderReturnsItem_orderReturns_id",
        using: "BTREE",
        fields: [
          { name: "orderReturns_id" },
        ]
      },
    ]
  });
  }
}
