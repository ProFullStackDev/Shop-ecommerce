/**
 * File Name  : LiveRoomGoods.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LiveRoomGoodsAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  approvalStatus: number;
  auditId?: string;
  coverImgUrl: string;
  goodsCoverImgUrl?: string;
  goodsId?: string;
  name: string;
  price: number;
  price2?: number;
  priceType: number;
  url: string;
  storeId?: number;
}

export type LiveRoomGoodsPk = "id";
export type LiveRoomGoodsId = LiveRoomGoods[LiveRoomGoodsPk];
export type LiveRoomGoodsOptionalAttributes = "auditId" | "goodsCoverImgUrl" | "goodsId" | "price2" | "storeId";
export type LiveRoomGoodsCreationAttributes = Optional<LiveRoomGoodsAttributes, LiveRoomGoodsOptionalAttributes>;

export class LiveRoomGoods extends Model<LiveRoomGoodsAttributes, LiveRoomGoodsCreationAttributes> implements LiveRoomGoodsAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  approvalStatus!: number;
  auditId?: string;
  coverImgUrl!: string;
  goodsCoverImgUrl?: string;
  goodsId?: string;
  name!: string;
  price!: number;
  price2?: number;
  priceType!: number;
  url!: string;
  storeId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof LiveRoomGoods {
    return LiveRoomGoods.init({
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
    approvalStatus: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    auditId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coverImgUrl: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    goodsCoverImgUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    goodsId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(19,2),
      allowNull: false
    },
    price2: {
      type: DataTypes.DECIMAL(19,2),
      allowNull: true
    },
    priceType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'LiveRoomGoods',
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
        name: "ind_LiveRoomGoods_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
