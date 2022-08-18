/**
 * File Name  : GroupBuying.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface GroupBuyingAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  beginDate?: Date;
  endDate?: Date;
  promotionName?: string;
  numberGrouped: number;
  status: number;
  groupBuyingAttributeId?: number;
  productId?: number;
  sponsorId?: number;
}

export type GroupBuyingPk = "id";
export type GroupBuyingId = GroupBuying[GroupBuyingPk];
export type GroupBuyingOptionalAttributes = "beginDate" | "endDate" | "promotionName" | "groupBuyingAttributeId" | "productId" | "sponsorId";
export type GroupBuyingCreationAttributes = Optional<GroupBuyingAttributes, GroupBuyingOptionalAttributes>;

export class GroupBuying extends Model<GroupBuyingAttributes, GroupBuyingCreationAttributes> implements GroupBuyingAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  beginDate?: Date;
  endDate?: Date;
  promotionName?: string;
  numberGrouped!: number;
  status!: number;
  groupBuyingAttributeId?: number;
  productId?: number;
  sponsorId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof GroupBuying {
    return GroupBuying.init({
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
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    promotionName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    numberGrouped: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupBuyingAttributeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'PromotionAttribute',
        key: 'id'
      },
      field: 'groupBuyingAttribute_id'
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Product',
        key: 'id'
      },
      field: 'product_id'
    },
    sponsorId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'sponsor_id'
    }
  }, {
    sequelize,
    tableName: 'GroupBuying',
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
        name: "ind_GroupBuying_groupBuyingAttribute_id",
        using: "BTREE",
        fields: [
          { name: "groupBuyingAttribute_id" },
        ]
      },
      {
        name: "ind_GroupBuying_product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "ind_GroupBuying_sponsor_id",
        using: "BTREE",
        fields: [
          { name: "sponsor_id" },
        ]
      },
    ]
  });
  }
}
