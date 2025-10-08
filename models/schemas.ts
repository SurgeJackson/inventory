import { Schema } from 'mongoose'
import {
  ICategory,
  IIgnoreItem,
  IItem,
  IUser,
  IWarehouse,
  IZone,
} from './interfaces'

export const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

export const zoneSchema = new Schema<IZone>(
  {
    name: { type: String, required: true },
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouse',
    },
  },
  { timestamps: true }
)

export const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    code: { type: String },
    image: { type: String },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      // required: true,
    },
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouse',
      // required: true,
    },
    zone: {
      type: Schema.Types.ObjectId,
      ref: 'Zone',
      // required: true,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const warehouseSchema = new Schema<IWarehouse>(
  {
    name: { type: String, required: true, unique: true },
    id1c: { type: String },
  },
  { timestamps: true }
)

export const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouse',
      // required: true,
    },
  },
  { timestamps: true }
)

export const itemImgSchema = new Schema({
  productId: { type: Number, index: true },
  sku: { type: String, index: true, unique: true },
  image: String, // URL or relative path
  imageCopiedAt: Date, // bookkeeping
})

export const ignoreItemSchema = new Schema<IIgnoreItem>(
  {
    sku: { type: String, required: true },
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouse',
    },
  },
  { timestamps: true }
)
