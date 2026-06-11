import { Schema, model, Document } from 'mongoose'

export interface ITeam extends Document {
  name: string
  coach: string
  members: number
  focus: string
  createdAt: Date
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  coach: { type: String, required: true },
  members: { type: Number, required: true, min: 1 },
  focus: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
})

export const Team = model<ITeam>('Team', teamSchema)
