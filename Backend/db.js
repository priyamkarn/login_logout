const mongoose=require('mongoose');
const connectionString = 'db_url';

// Connect to MongoDB
mongoose.connect(connectionString)
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    minlength: 1, 
  },
  email: {
    type: String,
    required: true,
    unique: true,   
    trim: true,     
    lowercase: true 
  },
  password: {
    type: String,
    required: true, 
    minlength: 8,  
  }
}, {
  timestamps: true, 
});
const User = mongoose.model('User', userSchema);
module.exports=User;
