/**
 * File Name  : Cart.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CartAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  expire?: Date;
  cartKey: string;
  memberId?: number;
}

export type CartPk = "id";
export type CartId = Cart[CartPk];
export type CartOptionalAttributes = "expire" | "memberId";
export type CartCreationAttributes = Optional<CartAttributes, CartOptionalAttributes>;

export class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  expire?: Date;
  cartKey!: string;
  memberId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Cart {
    return Cart.init({
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
    expire: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cartKey: {
      type: DataTypes.STRING(255),
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
    }
  }, {
    sequelize,
    tableName: 'Cart',
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
        name: "ind_Cart_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
  }
}
