import { Schema, model, Document } from 'mongoose'

export interface ILeaderboardEntry extends Document {
  rank: number
  userId: string
  score: number
  points: number
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  rank: { type: Number, required: true, min: 1 },
  userId: { type: String, required: true },
  score: { type: Number, required: true, min: 0 },
  points: { type: Number, required: true, min: 0 },
})

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema)
