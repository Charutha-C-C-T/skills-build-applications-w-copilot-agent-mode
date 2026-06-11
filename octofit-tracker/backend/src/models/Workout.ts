import { Schema, model, Document } from 'mongoose'

export interface IWorkout extends Document {
  title: string
  duration: number
  intensity: 'low' | 'medium' | 'high'
  focusArea: string
  recommendedFor: string
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  duration: { type: Number, required: true, min: 5 },
  intensity: { type: String, required: true, enum: ['low', 'medium', 'high'] },
  focusArea: { type: String, required: true },
  recommendedFor: { type: String, required: true },
})

export const Workout = model<IWorkout>('Workout', workoutSchema)
