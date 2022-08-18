/**
 * File Name  : LiveRoom_LiveRoomGoods.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LiveRoomLiveRoomGoodsAttributes {
  liveRoomsId: number;
  liveRoomGoodsId: number;
}

export type LiveRoomLiveRoomGoodsPk = "liveRoomsId" | "liveRoomGoodsId";
export type LiveRoomLiveRoomGoodsId = LiveRoomLiveRoomGoods[LiveRoomLiveRoomGoodsPk];
export type LiveRoomLiveRoomGoodsCreationAttributes = LiveRoomLiveRoomGoodsAttributes;

export class LiveRoomLiveRoomGoods extends Model<LiveRoomLiveRoomGoodsAttributes, LiveRoomLiveRoomGoodsCreationAttributes> implements LiveRoomLiveRoomGoodsAttributes {
  liveRoomsId!: number;
  liveRoomGoodsId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof LiveRoomLiveRoomGoods {
    return LiveRoomLiveRoomGoods.init({
    liveRoomsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'LiveRoom',
        key: 'id'
      },
      field: 'liveRooms_id'
    },
    liveRoomGoodsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'LiveRoomGoods',
        key: 'id'
      },
      field: 'liveRoomGoods_id'
    }
  }, {
    sequelize,
    tableName: 'LiveRoom_LiveRoomGoods',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "liveRooms_id" },
          { name: "liveRoomGoods_id" },
        ]
      },
      {
        name: "ind_LiveRoom_LiveRoomGoods_liveRoomGoods_id",
        using: "BTREE",
        fields: [
          { name: "liveRoomGoods_id" },
        ]
      },
    ]
  });
  }
}
