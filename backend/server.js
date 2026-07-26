require('dotenv').config({ quiet: true })  


const dns = require('dns')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// Node's built-in DNS resolver sometimes can't reach the SRV record for
// mongodb+srv:// URIs on this network even though the OS resolver can.
// Forcing Node to use public DNS servers fixes ECONNREFUSED on querySrv.
dns.setServers(['8.8.8.8', '1.1.1.1'])

// create an express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path,req.method)
  next()
})

// routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user', userRoutes)


// app.get('/',(request,response)=>{
//     response.json({message:'Hello World'})
// })

// connect to mongo
mongoose.connect(process.env.MONGO_URI)
.then(()=>{

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}!!!`)
})

}).catch((error)=>{
  console.log(error)
})



