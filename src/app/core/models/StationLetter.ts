/**
 * File Name  : station_letter.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface StationLetterAttributes {
  id: number;
  createDate: Date;
  title: string;
  message: string;
  type: number;
  userId?: number;
  isRead: boolean;
  readFrom?: number;
}

export type StationLetterPk = 'id';
export type StationLetterId = StationLetter[StationLetterPk];
export type StationLetterOptionalAttributes = 'createDate' | 'userId' | 'readFrom';
export type StationLetterCreationAttributes = Optional<StationLetterAttributes, StationLetterOptionalAttributes>;

export class StationLetter extends Model<StationLetterAttributes, StationLetterCreationAttributes> implements StationLetterAttributes {
  id!: number;
  createDate!: Date;
  title!: string;
  message!: string;
  type!: number;
  userId?: number;
  isRead!: boolean;
  readFrom?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof StationLetter {
    return StationLetter.init(
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          comment: 'id'
        },
        createDate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
          comment: '创建时间',
          field: 'create_date'
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: '标题'
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: '消息'
        },
        type: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          comment: '类型(0:站内信,1:公告)'
        },
        userId: {
          type: DataTypes.BIGINT,
          allowNull: true,
          comment: '用户id',
          references: {
            model: 'Users',
            key: 'id'
          },
          field: 'user_id'
        },
        isRead: {
          type: DataTypes.TINYINT.UNSIGNED,
          allowNull: false,
          comment: '是否已读',
          field: 'is_read'
        },
        readFrom: {
          type: DataTypes.BIGINT,
          allowNull: true,
          comment: '已读来自(公告)',
          field: 'read_from'
        }
      },
      {
        sequelize,
        tableName: 'station_letter',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }]
          },
          {
            name: 'station_letter_FK',
            using: 'BTREE',
            fields: [{ name: 'user_id' }]
          }
        ]
      }
    );
  }
}
