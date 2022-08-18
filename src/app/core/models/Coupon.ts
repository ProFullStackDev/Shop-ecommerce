/**
 * File Name  : Coupon.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CouponAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  beginDate?: Date;
  couponCodeQuantity?: number;
  description?: string;
  displayImage?: string;
  endDate?: Date;
  introduction?: string;
  isEnabled: boolean;
  maximumPrice?: number;
  maximumQuantity?: number;
  minimumPrice?: number;
  minimumQuantity?: number;
  name: string;
  point?: number;
  prefix: string;
  priceExpression?: string;
  productRestriction?: number;
  totalCount: number;
  type: number;
  storeId?: number;
}

export type CouponPk = "id";
export type CouponId = Coupon[CouponPk];
export type CouponOptionalAttributes = "beginDate" | "couponCodeQuantity" | "description" | "displayImage" | "endDate" | "introduction" | "maximumPrice" | "maximumQuantity" | "minimumPrice" | "minimumQuantity" | "point" | "priceExpression" | "productRestriction" | "storeId";
export type CouponCreationAttributes = Optional<CouponAttributes, CouponOptionalAttributes>;

export class Coupon extends Model<CouponAttributes, CouponCreationAttributes> implements CouponAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  beginDate?: Date;
  couponCodeQuantity?: number;
  description?: string;
  displayImage?: string;
  endDate?: Date;
  introduction?: string;
  isEnabled!: boolean;
  maximumPrice?: number;
  maximumQuantity?: number;
  minimumPrice?: number;
  minimumQuantity?: number;
  name!: string;
  point?: number;
  prefix!: string;
  priceExpression?: string;
  productRestriction?: number;
  totalCount!: number;
  type!: number;
  storeId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Coupon {
    return Coupon.init({
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
    beginDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    couponCodeQuantity: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    displayImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    maximumPrice: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: true
    },
    maximumQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    minimumPrice: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: true
    },
    minimumQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    point: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    prefix: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    priceExpression: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    productRestriction: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
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
    tableName: 'Coupon',
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
        name: "ind_Coupon_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
