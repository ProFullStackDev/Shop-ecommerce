/**
 * File Name  : Review.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ReviewAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  content?: string;
  ip: string;
  isShow: boolean;
  orderItemId: number;
  score: number;
  showToOwner?: boolean;
  orderSpecifications?: string;
  orderName?: string;
  orderSn?: string;
  orderThumbnail?: string;
  orderCreatedDate?: string;
  forReviewId?: number;
  memberId: number;
  productId: number;
  storeId: number;
}

export type ReviewPk = "id";
export type ReviewId = Review[ReviewPk];
export type ReviewOptionalAttributes = "content" | "showToOwner" | "orderSpecifications" | "forReviewId";
export type ReviewCreationAttributes = Optional<ReviewAttributes, ReviewOptionalAttributes>;

export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  content?: string;
  ip!: string;
  isShow!: boolean;
  orderItemId!: number;
  score!: number;
  showToOwner?: boolean;
  orderSpecifications?: string;
  orderName?: string;
  orderSn?: string;
  orderThumbnail?: string;
  orderCreatedDate?: string;
  forReviewId?: number;
  memberId!: number;
  productId!: number;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Review {
    return Review.init({
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
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isShow: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    orderItemId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    showToOwner: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    orderSpecifications: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    orderSn: {
      type: DataTypes.TEXT,
      allowNull: true
    }, 
    orderThumbnail: {
      type: DataTypes.TEXT,
      allowNull: true
    }, 
    orderCreatedDate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    orderName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    forReviewId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Review',
        key: 'id'
      },
      field: 'forReview_id'
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'member_id'
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id'
      },
      field: 'product_id'
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'Review',
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
        name: "ind_Review_forReview_id",
        using: "BTREE",
        fields: [
          { name: "forReview_id" },
        ]
      },
      {
        name: "ind_Review_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "ind_Review_product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "ind_Review_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
