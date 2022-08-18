/**
 * File Name  : CartItem.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CartItemAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  isTransfer: boolean;
  quantity: number;
  cartId: number;
  skuId: number;
}

export type CartItemPk = "id";
export type CartItemId = CartItem[CartItemPk];
export type CartItemCreationAttributes = CartItemAttributes;

export class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  isTransfer!: boolean;
  quantity!: number;
  cartId!: number;
  skuId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof CartItem {
    return CartItem.init({
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
    isTransfer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cartId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Cart',
        key: 'id'
      },
      field: 'cart_id'
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
    tableName: 'CartItem',
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
        name: "ind_CartItem_cart_id",
        using: "BTREE",
        fields: [
          { name: "cart_id" },
        ]
      },
      {
        name: "ind_CartItem_sku_id",
        using: "BTREE",
        fields: [
          { name: "sku_id" },
        ]
      },
    ]
  });
  }
}
