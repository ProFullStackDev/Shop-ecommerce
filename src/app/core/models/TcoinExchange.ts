/**
 * File Name  : tcoin_exchange.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TcoinExchangeAttributes {
  id: number;
  beginTime: Date;
  endTime: Date;
  tcoinAmount: number;
  exchangePercent: number;
  exchangeLimit: number;
}

export type TcoinExchangePk = "id";
export type TcoinExchangeId = TcoinExchange[TcoinExchangePk];
export type TcoinExchangeCreationAttributes = TcoinExchangeAttributes;

export class TcoinExchange extends Model<TcoinExchangeAttributes, TcoinExchangeCreationAttributes> implements TcoinExchangeAttributes {
  id!: number;
  beginTime!: Date;
  endTime!: Date;
  tcoinAmount!: number;
  exchangePercent!: number;
  exchangeLimit!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof TcoinExchange {
    return TcoinExchange.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    beginTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "开始时间",
      field: 'begin_time'
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "结束时间",
      field: 'end_time'
    },
    tcoinAmount: {
      type: DataTypes.DECIMAL(36,18),
      allowNull: false,
      comment: "可兑换钛币数量",
      field: 'tcoin_amount'
    },
    exchangePercent: {
      type: DataTypes.DECIMAL(36,18),
      allowNull: false,
      comment: "积分兑换钛币比例",
      field: 'exchange_percent'
    },
    exchangeLimit: {
      type: DataTypes.DECIMAL(36,18),
      allowNull: false,
      comment: "兑换限额",
      field: 'exchange_limit'
    }
  }, {
    sequelize,
    tableName: 'tcoin_exchange',
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
