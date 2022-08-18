/**
 * File Name  : Specification.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SpecificationAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  name: string;
  options: string;
  productCategoryId: number;
}

export type SpecificationPk = "id";
export type SpecificationId = Specification[SpecificationPk];
export type SpecificationOptionalAttributes = "orders";
export type SpecificationCreationAttributes = Optional<SpecificationAttributes, SpecificationOptionalAttributes>;

export class Specification extends Model<SpecificationAttributes, SpecificationCreationAttributes> implements SpecificationAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  name!: string;
  options!: string;
  productCategoryId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Specification {
    return Specification.init({
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
    tableName: 'Specification',
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
        name: "ind_Specification_productCategory_id",
        using: "BTREE",
        fields: [
          { name: "productCategory_id" },
        ]
      },
    ]
  });
  }
}
