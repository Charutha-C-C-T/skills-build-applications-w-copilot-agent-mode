import express, { Request, Response } from 'express'
import { connectToDatabase } from './db'
import { User } from './models/User'
import { Team } from './models/Team'
import { Activity } from './models/Activity'
import { Workout } from './models/Workout'
import { LeaderboardEntry } from './models/Leaderboard'

const app = express()
const port = Number(process.env.PORT ?? '8000')
const codespaceName = process.env.CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.githubpreview.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', apiUrl })
})

app.get('/api/users/', async (_req: Request, res: Response) => {
  const users = await User.find().lean()
  res.json(users)
})

app.get('/api/teams/', async (_req: Request, res: Response) => {
  const teams = await Team.find().lean()
  res.json(teams)
})

app.get('/api/activities/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().sort({ date: -1 }).lean()
  res.json(activities)
})

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean()
  res.json(leaderboard)
})

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().lean()
  res.json(workouts)
})

app.listen(port, async () => {
  try {
    await connectToDatabase()
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }

  console.log(`Backend API listening on port ${port}`)
  console.log(`API base URL: ${apiUrl}`)
})
