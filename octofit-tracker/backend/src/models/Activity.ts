import { Schema, model, Document } from 'mongoose'

export interface IActivity extends Document {
  userId: string
  type: string
  duration: number
  date: Date
  caloriesBurned: number
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true, min: 1 },
  date: { type: Date, required: true },
  caloriesBurned: { type: Number, required: true, min: 0 },
})

export const Activity = model<IActivity>('Activity', activitySchema)
