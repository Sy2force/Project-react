import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Project from '../models/Project.js'
import Post from '../models/Post.js'
import Skill from '../models/Skill.js'
import bcrypt from 'bcryptjs'
import { reactProjects } from './reactProjects.js'
import { blogPosts } from './blogPosts.js'
import { skills } from './skills.js'

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Project.deleteMany({})
    await Post.deleteMany({})
    await Skill.deleteMany({})

    console.log('Cleared existing data')

    // Create admin user
    const adminPassword = await bcrypt.hash('password123', 12)
    const adminUser = await User.create({
      email: 'admin@test.com',
      passwordHash: adminPassword,
      role: 'admin'
    })

    // Create regular user
    const userPassword = await bcrypt.hash('password123', 12)
    const regularUser = await User.create({
      email: 'user@test.com',
      passwordHash: userPassword,
      role: 'user'
    })

    console.log('Created users')

    // Create React projects (3 projets selon spécifications)
    await Project.insertMany(reactProjects)
    console.log('Created React projects')

    // Create blog posts (3 articles)
    await Post.insertMany(blogPosts)
    console.log('Created blog posts')

    // Create skills (8 compétences avec métriques)
    await Skill.insertMany(skills)
    console.log('Created skills')

    console.log('✅ Seed data created successfully!')
    console.log('📊 Data summary:')
    console.log(`   - Users: 2 (1 admin, 1 user)`)
    console.log(`   - Projects: ${reactProjects.length} (React focus)`)
    console.log(`   - Blog Posts: ${blogPosts.length}`)
    console.log(`   - Skills: ${skills.length}`)
    
    process.exit(0)

  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

seedData()
