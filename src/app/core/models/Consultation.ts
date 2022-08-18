/**
 * File Name  : Consultation.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ConsultationAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  content: string;
  ip: string;
  isShow: boolean;
  replied: boolean;
  forConsultationId?: number;
  memberId?: number;
  productId: number;
  storeId: number;
}

export type ConsultationPk = "id";
export type ConsultationId = Consultation[ConsultationPk];
export type ConsultationOptionalAttributes = "forConsultationId" | "memberId";
export type ConsultationCreationAttributes = Optional<ConsultationAttributes, ConsultationOptionalAttributes>;

export class Consultation extends Model<ConsultationAttributes, ConsultationCreationAttributes> implements ConsultationAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  content!: string;
  ip!: string;
  isShow!: boolean;
  replied!: boolean;
  forConsultationId?: number;
  memberId?: number;
  productId!: number;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Consultation {
    return Consultation.init({
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
      type: DataTypes.TEXT,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isShow: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    replied: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    forConsultationId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Consultation',
        key: 'id'
      },
      field: 'forConsultation_id'
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: true,
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
    tableName: 'Consultation',
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
        name: "ind_Consultation_forConsultation_id",
        using: "BTREE",
        fields: [
          { name: "forConsultation_id" },
        ]
      },
      {
        name: "ind_Consultation_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "ind_Consultation_product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "ind_Consultation_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
