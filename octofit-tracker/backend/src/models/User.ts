import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  age: number
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced'
  createdAt: Date
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  fitnessLevel: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  createdAt: { type: Date, default: () => new Date() },
})

export const User = model<IUser>('User', userSchema)
