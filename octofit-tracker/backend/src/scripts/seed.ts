import { connectToDatabase } from '../config/database'
import { User } from '../models/User'
import { Team } from '../models/Team'
import { Activity } from '../models/Activity'
import { Workout } from '../models/Workout'
import { LeaderboardEntry } from '../models/Leaderboard'

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data')

  await connectToDatabase()

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
  ])

  const users = await User.create([
    {
      name: 'Avery Mathews',
      email: 'avery.mathews@octofit.com',
      age: 28,
      fitnessLevel: 'intermediate',
    },
    {
      name: 'Jordan Fischer',
      email: 'jordan.fischer@octofit.com',
      age: 34,
      fitnessLevel: 'advanced',
    },
    {
      name: 'Priya Nair',
      email: 'priya.nair@octofit.com',
      age: 24,
      fitnessLevel: 'beginner',
    },
  ])

  const teams = await Team.create([
    {
      name: 'Team Alpha',
      coach: 'Mia Daniels',
      members: 10,
      focus: 'endurance and mobility',
    },
    {
      name: 'Team Momentum',
      coach: 'Noah Patel',
      members: 7,
      focus: 'strength and recovery',
    },
  ])

  const workouts = await Workout.create([
    {
      title: 'Full Body Strength Builder',
      duration: 50,
      intensity: 'high',
      focusArea: 'full body',
      recommendedFor: 'intermediate and advanced athletes',
    },
    {
      title: 'Morning Mobility Flow',
      duration: 25,
      intensity: 'low',
      focusArea: 'flexibility',
      recommendedFor: 'beginners and active recovery',
    },
    {
      title: 'Interval Cardio Blast',
      duration: 35,
      intensity: 'medium',
      focusArea: 'cardio',
      recommendedFor: 'endurance training',
    },
  ])

  const activities = await Activity.create([
    {
      userId: users[0]._id.toString(),
      type: 'running',
      duration: 30,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      caloriesBurned: 320,
    },
    {
      userId: users[1]._id.toString(),
      type: 'cycling',
      duration: 45,
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
      caloriesBurned: 420,
    },
    {
      userId: users[2]._id.toString(),
      type: 'yoga',
      duration: 55,
      date: new Date(Date.now() - 1000 * 60 * 60 * 72),
      caloriesBurned: 210,
    },
  ])

  await LeaderboardEntry.create([
    { rank: 1, userId: users[1]._id.toString(), score: 1920, points: 192 },
    { rank: 2, userId: users[0]._id.toString(), score: 1780, points: 178 },
    { rank: 3, userId: users[2]._id.toString(), score: 1420, points: 142 },
  ])

  console.log('Seed complete:')
  console.log(`  Users: ${users.length}`)
  console.log(`  Teams: ${teams.length}`)
  console.log(`  Workouts: ${workouts.length}`)
  console.log(`  Activities: ${activities.length}`)
  console.log('  Leaderboard entries: 3')

  process.exit(0)
}

seedDatabase().catch((error) => {
  console.error('Seeding error:', error)
  process.exit(1)
})
