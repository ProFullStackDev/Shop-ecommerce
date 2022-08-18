/**
 * File Name  : BusinessAttribute.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface BusinessAttributeAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  isEnabled: boolean;
  isRequired: boolean;
  name: string;
  options?: string;
  pattern?: string;
  propertyIndex?: number;
  type: number;
}

export type BusinessAttributePk = "id";
export type BusinessAttributeId = BusinessAttribute[BusinessAttributePk];
export type BusinessAttributeOptionalAttributes = "orders" | "options" | "pattern" | "propertyIndex";
export type BusinessAttributeCreationAttributes = Optional<BusinessAttributeAttributes, BusinessAttributeOptionalAttributes>;

export class BusinessAttribute extends Model<BusinessAttributeAttributes, BusinessAttributeCreationAttributes> implements BusinessAttributeAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  isEnabled!: boolean;
  isRequired!: boolean;
  name!: string;
  options?: string;
  pattern?: string;
  propertyIndex?: number;
  type!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof BusinessAttribute {
    return BusinessAttribute.init({
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
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    options: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pattern: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    propertyIndex: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'BusinessAttribute',
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
