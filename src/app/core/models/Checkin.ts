/**
 * File Name  : Checkin.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CheckinAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  complementedCheckin: boolean;
  continuousCheckinDays: number;
  checkInDate: string;
  periodOrder: number;
  point: number;
  memberId: number;
}

export type CheckinPk = "id";
export type CheckinId = Checkin[CheckinPk];
export type CheckinCreationAttributes = CheckinAttributes;

export class Checkin extends Model<CheckinAttributes, CheckinCreationAttributes> implements CheckinAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  complementedCheckin!: boolean;
  continuousCheckinDays!: number;
  checkInDate!: string;
  periodOrder!: number;
  point!: number;
  memberId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Checkin {
    return Checkin.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    createdDate: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    lastModifiedDate: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    complementedCheckin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    continuousCheckinDays: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    checkInDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    periodOrder: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    point: {
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
      field: 'member_id'
    }
  }, {
    sequelize,
    tableName: 'Checkin',
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
        name: "ind_Checkin_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
  }
}
