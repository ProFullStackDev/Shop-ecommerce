/**
 * File Name  : CategoryApplication.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CategoryApplicationAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  rate: number;
  status: number;
  productCategoryId: number;
  storeId: number;
}

export type CategoryApplicationPk = "id";
export type CategoryApplicationId = CategoryApplication[CategoryApplicationPk];
export type CategoryApplicationCreationAttributes = CategoryApplicationAttributes;

export class CategoryApplication extends Model<CategoryApplicationAttributes, CategoryApplicationCreationAttributes> implements CategoryApplicationAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  rate!: number;
  status!: number;
  productCategoryId!: number;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof CategoryApplication {
    return CategoryApplication.init({
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
    rate: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    status: {
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
    tableName: 'CategoryApplication',
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
        name: "ind_CategoryApplication_productCategory_id",
        using: "BTREE",
        fields: [
          { name: "productCategory_id" },
        ]
      },
      {
        name: "ind_CategoryApplication_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
