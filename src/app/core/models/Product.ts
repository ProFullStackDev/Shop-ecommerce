/**
 * File Name  : Product.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ProductAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  attributeValue0?: string;
  attributeValue1?: string;
  attributeValue10?: string;
  attributeValue11?: string;
  attributeValue12?: string;
  attributeValue13?: string;
  attributeValue14?: string;
  attributeValue15?: string;
  attributeValue16?: string;
  attributeValue17?: string;
  attributeValue18?: string;
  attributeValue19?: string;
  attributeValue2?: string;
  attributeValue3?: string;
  attributeValue4?: string;
  attributeValue5?: string;
  attributeValue6?: string;
  attributeValue7?: string;
  attributeValue8?: string;
  attributeValue9?: string;
  caption?: string;
  cost?: number;
  hits: number;
  introduction?: string;
  isActive: boolean;
  isDelivery: boolean;
  isList: boolean;
  isMarketable: boolean;
  isTop: boolean;
  keyword?: string;
  marketPrice: number;
  maxCommission: number;
  memo?: string;
  monthHits: number;
  monthHitsDate: Date;
  monthSales: number;
  monthSalesDate: Date;
  name: string;
  parameterValues?: string;
  price: number;
  productImages?: string;
  sales: number;
  score: number;
  scoreCount: number;
  sn: string;
  specificationItems?: string;
  totalScore: number;
  type: number;
  unit?: string;
  weekHits: number;
  weekHitsDate: Date;
  weekSales: number;
  weekSalesDate: Date;
  weight?: number;
  brandId?: number;
  productCategoryId: number;
  storeId: number;
  storeProductCategoryId?: number;
}

export type ProductPk = "id";
export type ProductId = Product[ProductPk];
export type ProductOptionalAttributes = "attributeValue0" | "attributeValue1" | "attributeValue10" | "attributeValue11" | "attributeValue12" | "attributeValue13" | "attributeValue14" | "attributeValue15" | "attributeValue16" | "attributeValue17" | "attributeValue18" | "attributeValue19" | "attributeValue2" | "attributeValue3" | "attributeValue4" | "attributeValue5" | "attributeValue6" | "attributeValue7" | "attributeValue8" | "attributeValue9" | "caption" | "cost" | "introduction" | "keyword" | "memo" | "parameterValues" | "productImages" | "specificationItems" | "unit" | "weight" | "brandId" | "storeProductCategoryId";
export type ProductCreationAttributes = Optional<ProductAttributes, ProductOptionalAttributes>;

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  attributeValue0?: string;
  attributeValue1?: string;
  attributeValue10?: string;
  attributeValue11?: string;
  attributeValue12?: string;
  attributeValue13?: string;
  attributeValue14?: string;
  attributeValue15?: string;
  attributeValue16?: string;
  attributeValue17?: string;
  attributeValue18?: string;
  attributeValue19?: string;
  attributeValue2?: string;
  attributeValue3?: string;
  attributeValue4?: string;
  attributeValue5?: string;
  attributeValue6?: string;
  attributeValue7?: string;
  attributeValue8?: string;
  attributeValue9?: string;
  caption?: string;
  cost?: number;
  hits!: number;
  introduction?: string;
  isActive!: boolean;
  isDelivery!: boolean;
  isList!: boolean;
  isMarketable!: boolean;
  isTop!: boolean;
  keyword?: string;
  marketPrice!: number;
  maxCommission!: number;
  memo?: string;
  monthHits!: number;
  monthHitsDate!: Date;
  monthSales!: number;
  monthSalesDate!: Date;
  name!: string;
  parameterValues?: string;
  price!: number;
  productImages?: string;
  sales!: number;
  score!: number;
  scoreCount!: number;
  sn!: string;
  specificationItems?: string;
  totalScore!: number;
  type!: number;
  unit?: string;
  weekHits!: number;
  weekHitsDate!: Date;
  weekSales!: number;
  weekSalesDate!: Date;
  weight?: number;
  brandId?: number;
  productCategoryId!: number;
  storeId!: number;
  storeProductCategoryId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Product {
    return Product.init({
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
    attributeValue0: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue10: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue11: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue12: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue13: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue14: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue15: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue16: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue17: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue18: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue19: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue4: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue5: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue6: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue7: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue8: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue9: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    caption: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cost: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: true
    },
    hits: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isDelivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isList: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isMarketable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isTop: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    keyword: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    marketPrice: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    maxCommission: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    monthHits: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    monthHitsDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    monthSales: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    monthSalesDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    parameterValues: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: false
    },
    productImages: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sales: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    scoreCount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "sn"
    },
    specificationItems: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    totalScore: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    weekHits: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    weekHitsDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    weekSales: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    weekSalesDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    brandId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Brand',
        key: 'id'
      },
      field: 'brand_id'
    },
    productCategoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ProductCategory',
        key: 'id'
      },
      field: 'productCategory_id'
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    },
    storeProductCategoryId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'StoreProductCategory',
        key: 'id'
      },
      field: 'storeProductCategory_id'
    }
  }, {
    sequelize,
    tableName: 'Product',
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
        name: "sn",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sn" },
        ]
      },
      {
        name: "ind_Product_brand_id",
        using: "BTREE",
        fields: [
          { name: "brand_id" },
        ]
      },
      {
        name: "ind_Product_productCategory_id",
        using: "BTREE",
        fields: [
          { name: "productCategory_id" },
        ]
      },
      {
        name: "ind_Product_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "ind_Product_storeProductCategory_id",
        using: "BTREE",
        fields: [
          { name: "storeProductCategory_id" },
        ]
      },
    ]
  });
  }
}
