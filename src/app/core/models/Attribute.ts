/**
 * File Name  : Attribute.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AttributeAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  name: string;
  options: string;
  propertyIndex: number;
  productCategoryId: number;
}

export type AttributePk = "id";
export type AttributeId = Attribute[AttributePk];
export type AttributeOptionalAttributes = "orders";
export type AttributeCreationAttributes = Optional<AttributeAttributes, AttributeOptionalAttributes>;

export class Attribute extends Model<AttributeAttributes, AttributeCreationAttributes> implements AttributeAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  name!: string;
  options!: string;
  propertyIndex!: number;
  productCategoryId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Attribute {
    return Attribute.init({
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
    orders: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    options: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    propertyIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productCategoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ProductCategory',
        key: 'id'
      },
      field: 'productCategory_id'
    }
  }, {
    sequelize,
    tableName: 'Attribute',
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
        name: "ind_Attribute_productCategory_id",
        using: "BTREE",
        fields: [
          { name: "productCategory_id" },
        ]
      },
    ]
  });
  }
}
