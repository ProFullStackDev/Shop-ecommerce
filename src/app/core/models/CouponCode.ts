/**
 * File Name  : CouponCode.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CouponCodeAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  code: string;
  isUsed: boolean;
  usedDate?: Date;
  couponId: number;
  memberId?: number;
}

export type CouponCodePk = "id";
export type CouponCodeId = CouponCode[CouponCodePk];
export type CouponCodeOptionalAttributes = "usedDate" | "memberId";
export type CouponCodeCreationAttributes = Optional<CouponCodeAttributes, CouponCodeOptionalAttributes>;

export class CouponCode extends Model<CouponCodeAttributes, CouponCodeCreationAttributes> implements CouponCodeAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  code!: string;
  isUsed!: boolean;
  usedDate?: Date;
  couponId!: number;
  memberId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof CouponCode {
    return CouponCode.init({
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
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "code"
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    usedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    couponId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Coupon',
        key: 'id'
      },
      field: 'coupon_id'
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
    tableName: 'CouponCode',
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
        name: "code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "ind_CouponCode_coupon_id",
        using: "BTREE",
        fields: [
          { name: "coupon_id" },
        ]
      },
      {
        name: "ind_CouponCode_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
  }
}
