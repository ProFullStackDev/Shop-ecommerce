/**
 * File Name  : Parameter.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ParameterAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  parameterGroup: string;
  names: string;
  productCategoryId: number;
}

export type ParameterPk = "id";
export type ParameterId = Parameter[ParameterPk];
export type ParameterOptionalAttributes = "orders";
export type ParameterCreationAttributes = Optional<ParameterAttributes, ParameterOptionalAttributes>;

export class Parameter extends Model<ParameterAttributes, ParameterCreationAttributes> implements ParameterAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  parameterGroup!: string;
  names!: string;
  productCategoryId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Parameter {
    return Parameter.init({
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
    parameterGroup: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    names: {
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
    tableName: 'Parameter',
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
        name: "ind_Parameter_productCategory_id",
        using: "BTREE",
        fields: [
          { name: "productCategory_id" },
        ]
      },
    ]
  });
  }
}
