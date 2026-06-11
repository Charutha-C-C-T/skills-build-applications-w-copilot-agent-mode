import mongoose from 'mongoose'

export const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db'

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  const connection = await mongoose.connect(mongoUri)
  console.log(`Connected to MongoDB at ${mongoUri}`)
  return connection
}
