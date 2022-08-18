/**
 * File Name  : LiveRoom.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LiveRoomAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  closeComment: boolean;
  closeGoods: boolean;
  closeLike: boolean;
  closeReplay: boolean;
  coverImg: string;
  coverImgUrl?: string;
  endTime: Date;
  feedsImg: string;
  feedsImgUrl?: string;
  feedsPublic: boolean;
  mediaUrl?: string;
  qrcodeUrl?: string;
  roomId?: string;
  shareImg: string;
  shareImgUrl?: string;
  startTime: Date;
  status: number;
  title: string;
  type: number;
  liveStreamerId?: number;
  storeId?: number;
}

export type LiveRoomPk = "id";
export type LiveRoomId = LiveRoom[LiveRoomPk];
export type LiveRoomOptionalAttributes = "coverImgUrl" | "feedsImgUrl" | "mediaUrl" | "qrcodeUrl" | "roomId" | "shareImgUrl" | "liveStreamerId" | "storeId";
export type LiveRoomCreationAttributes = Optional<LiveRoomAttributes, LiveRoomOptionalAttributes>;

export class LiveRoom extends Model<LiveRoomAttributes, LiveRoomCreationAttributes> implements LiveRoomAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  closeComment!: boolean;
  closeGoods!: boolean;
  closeLike!: boolean;
  closeReplay!: boolean;
  coverImg!: string;
  coverImgUrl?: string;
  endTime!: Date;
  feedsImg!: string;
  feedsImgUrl?: string;
  feedsPublic!: boolean;
  mediaUrl?: string;
  qrcodeUrl?: string;
  roomId?: string;
  shareImg!: string;
  shareImgUrl?: string;
  startTime!: Date;
  status!: number;
  title!: string;
  type!: number;
  liveStreamerId?: number;
  storeId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof LiveRoom {
    return LiveRoom.init({
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
    closeComment: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    closeGoods: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    closeLike: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    closeReplay: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    coverImg: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    coverImgUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    endTime: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    feedsImg: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    feedsImgUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    feedsPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    mediaUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    qrcodeUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    roomId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    shareImg: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    shareImgUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    startTime: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    liveStreamerId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'LiveStreamer',
        key: 'id'
      },
      field: 'liveStreamer_id'
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'LiveRoom',
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
        name: "ind_LiveRoom_liveStreamer_id",
        using: "BTREE",
        fields: [
          { name: "liveStreamer_id" },
        ]
      },
      {
        name: "ind_LiveRoom_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
