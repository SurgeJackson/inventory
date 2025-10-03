'use server'
import dbConnect from '@/lib/dbConnect'
import { IUser } from '@/models/interfaces'
import { User } from '@/models/models'
import bcryptjs from 'bcrypt'

export async function getAllUsers() {
  await dbConnect()

  const users = await User.find().populate('warehouse')

  return {
    users: JSON.parse(JSON.stringify(users as IUser[])),
  }
}

export async function getUser(userId: string) {
  await dbConnect()

  const user = await User.findById(userId).populate('warehouse')

  return {
    user: JSON.parse(JSON.stringify(user as IUser)),
  }
}

export async function updateUser(
  userId: string,
  {
    name,
    email,
    isAdmin,
    isActive,
    warehouse,
  }: {
    name: string
    email: string
    isAdmin: boolean
    isActive: boolean
    warehouse: string
  }
) {
  try {
    await dbConnect()
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name,
        email: email,
        isAdmin: isAdmin,
        isActive: isActive,
        warehouse: warehouse,
      },
      {
        new: true,
      }
    )
    if (!updatedUser)
      throw new Error('Пользователь не обновлен, пользователь не найден')

    return {
      success: true,
      message: 'Пользователь обновлен успешно',
      data: JSON.parse(JSON.stringify(updatedUser)),
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message:
        typeof error.message === 'string'
          ? error.message
          : JSON.stringify(error.message),
    }
  }
}

export async function deleteUser(userId: string) {
  try {
    await dbConnect()
    await User.deleteOne({ _id: userId })

    return {
      success: true,
      message: 'Пользователь удален успешно',
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message:
        typeof error.message === 'string'
          ? error.message
          : JSON.stringify(error.message),
    }
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    await dbConnect()

    if (!email || !password || !name) {
      throw new Error('Missing required fields')
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    return {
      success: true,
      message: 'User created successfully',
      data: JSON.parse(JSON.stringify(newUser)),
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message:
        typeof error.message === 'string'
          ? error.message
          : JSON.stringify(error.message),
    }
  }
}
