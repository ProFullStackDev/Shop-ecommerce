/**
 * File Name  : Distributor.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DistributorAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  childrenCount: number;
  memberId: number;
  parentId?: number;
}

export type DistributorPk = "id";
export type DistributorId = Distributor[DistributorPk];
export type DistributorOptionalAttributes = "parentId";
export type DistributorCreationAttributes = Optional<DistributorAttributes, DistributorOptionalAttributes>;

export class Distributor extends Model<DistributorAttributes, DistributorCreationAttributes> implements DistributorAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  childrenCount!: number;
  memberId!: number;
  parentId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Distributor {
    return Distributor.init({
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
    childrenCount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      unique: "FK60d6s1goxo5bpu9aa8ssulc82",
      field: 'member_id'
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Distributor',
        key: 'id'
      },
      field: 'parent_id'
    }
  }, {
    sequelize,
    tableName: 'Distributor',
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
        name: "member_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "UK_fx85f0o971ynj4l0nfk7irt0t",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "ind_Distributor_parent_id",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
    ]
  });
  }
}
