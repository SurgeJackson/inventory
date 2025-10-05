import { model, models } from 'mongoose'
import { ICategory, IItem, IUser, IWarehouse } from './interfaces'
import {
  categorySchema,
  ignoreItemSchema,
  itemImgSchema,
  itemSchema,
  userSchema,
  warehouseSchema,
} from './schemas'

export const Category =
  models?.Category || model<ICategory>('Category', categorySchema)

export const Item = models?.Item || model<IItem>('Item', itemSchema)

export const Warehouse =
  models?.Warehouse || model<IWarehouse>('Warehouse', warehouseSchema)

export const User = models?.User || model<IUser>('User', userSchema)

export const ItemImg = models?.ItemImg || model('ItemImg', itemImgSchema)

export const IgnoreItem =
  models?.IgnoreItem || model('IgnoreItem', ignoreItemSchema)
