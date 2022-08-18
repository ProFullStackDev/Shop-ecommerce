/**
 * File Name  : vip.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface VipAttributes {
  id: number;
  sort: number;
  name: string;
  price: number;
  icon: string;
  days: number;
  originalPrice?: number;
  isBestValue?: number;
}

export type VipPk = "id";
export type VipId = Vip[VipPk];
export type VipOptionalAttributes = "sort" | "originalPrice" | "isBestValue";
export type VipCreationAttributes = Optional<VipAttributes, VipOptionalAttributes>;

export class Vip extends Model<VipAttributes, VipCreationAttributes> implements VipAttributes {
  id!: number;
  sort!: number;
  name!: string;
  price!: number;
  icon!: string;
  days!: number;
  originalPrice?: number;
  isBestValue?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Vip {
    return Vip.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    sort: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "排序"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "会员名"
    },
    price: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: false,
      comment: "价格"
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "会员图标"
    },
    days: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "会员时长"
    },
    originalPrice: {
      type: DataTypes.DECIMAL(20,5),
      allowNull: true,
      comment: "折扣价",
      field: 'original_price'
    },
    isBestValue: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_best_value'
    }
  }, {
    sequelize,
    tableName: 'vip',
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
    ]
  });
  }
}
