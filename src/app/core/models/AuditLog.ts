/**
 * File Name  : AuditLog.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AuditLogAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  action: string;
  detail?: string;
  ip: string;
  parameters?: string;
  requestUrl: string;
  userId?: number;
}

export type AuditLogPk = "id";
export type AuditLogId = AuditLog[AuditLogPk];
export type AuditLogOptionalAttributes = "detail" | "parameters" | "userId";
export type AuditLogCreationAttributes = Optional<AuditLogAttributes, AuditLogOptionalAttributes>;

export class AuditLog extends Model<AuditLogAttributes, AuditLogCreationAttributes> implements AuditLogAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  action!: string;
  detail?: string;
  ip!: string;
  parameters?: string;
  requestUrl!: string;
  userId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof AuditLog {
    return AuditLog.init({
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
    action: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    detail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    parameters: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    requestUrl: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user_id'
    }
  }, {
    sequelize,
    tableName: 'AuditLog',
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
        name: "ind_AuditLog_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
