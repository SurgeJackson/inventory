import { Document, Types } from 'mongoose'

export interface ICategory extends Document {
  _id: Types.ObjectId
  name: string
}

export interface IZone extends Document {
  _id: Types.ObjectId
  name: string
  warehouse: Types.ObjectId | IWarehouse
}

export interface IItem extends Document {
  _id: Types.ObjectId
  sku: string
  name: string
  code: string
  image: string
  category: Types.ObjectId | ICategory
  warehouse: Types.ObjectId | IWarehouse
  zone: Types.ObjectId | IZone
  deleted: boolean
  userImage: string
}

export interface IWarehouse extends Document {
  _id: Types.ObjectId
  name: string
  id1c: string
}
export interface IUser extends Document {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  isAdmin: boolean
  isActive: boolean
  warehouse: Types.ObjectId | IWarehouse
}

export interface IIgnoreItem extends Document {
  _id: Types.ObjectId
  sku: string
  warehouse: Types.ObjectId | IWarehouse
}

export type FlatItem = { sku: string; name: string; qty: number }
