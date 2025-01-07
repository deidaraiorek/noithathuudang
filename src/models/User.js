import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

export default mongoose.models.Users || mongoose.model('Users', userSchema)