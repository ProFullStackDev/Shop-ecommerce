/**
 * File Name  : AftersalesItem.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AftersalesItemAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  quantity: number;
  aftersalesId: number;
  orderItemId: number;
}

export type AftersalesItemPk = "id";
export type AftersalesItemId = AftersalesItem[AftersalesItemPk];
export type AftersalesItemCreationAttributes = AftersalesItemAttributes;

export class AftersalesItem extends Model<AftersalesItemAttributes, AftersalesItemCreationAttributes> implements AftersalesItemAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  quantity!: number;
  aftersalesId!: number;
  orderItemId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof AftersalesItem {
    return AftersalesItem.init({
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    aftersalesId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Aftersales',
        key: 'id'
      },
      field: 'aftersales_id'
    },
    orderItemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'OrderItem',
        key: 'id'
      },
      field: 'orderItem_id'
    }
  }, {
    sequelize,
    tableName: 'AftersalesItem',
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
        name: "ind_AftersalesItem_aftersales_id",
        using: "BTREE",
        fields: [
          { name: "aftersales_id" },
        ]
      },
      {
        name: "ind_AftersalesItem_orderItem_id",
        using: "BTREE",
        fields: [
          { name: "orderItem_id" },
        ]
      },
    ]
  });
  }
}
