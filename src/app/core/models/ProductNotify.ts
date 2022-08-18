/**
 * File Name  : ProductNotify.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProductNotifyAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  email: string;
  hasSent: boolean;
  memberId?: number;
  skuId: number;
}

export type ProductNotifyPk = "id";
export type ProductNotifyId = ProductNotify[ProductNotifyPk];
export type ProductNotifyOptionalAttributes = "memberId";
export type ProductNotifyCreationAttributes = Optional<ProductNotifyAttributes, ProductNotifyOptionalAttributes>;

export class ProductNotify extends Model<ProductNotifyAttributes, ProductNotifyCreationAttributes> implements ProductNotifyAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  email!: string;
  hasSent!: boolean;
  memberId?: number;
  skuId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductNotify {
    return ProductNotify.init({
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    hasSent: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'member_id'
    },
    skuId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Sku',
        key: 'id'
      },
      field: 'sku_id'
    }
  }, {
    sequelize,
    tableName: 'ProductNotify',
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
        name: "ind_ProductNotify_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "ind_ProductNotify_sku_id",
        using: "BTREE",
        fields: [
          { name: "sku_id" },
        ]
      },
    ]
  });
  }
}
