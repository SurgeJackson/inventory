import { Document, Types } from 'mongoose'

export interface ICategory extends Document {
  _id: Types.ObjectId
  name: string
}

export interface IItem extends Document {
  _id: Types.ObjectId
  sku: string
  name: string
  code: string
  image: string
  category: Types.ObjectId | ICategory
  warehouse: Types.ObjectId | IWarehouse
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

export type FlatItem = { sku: string; name: string; qty: number }
