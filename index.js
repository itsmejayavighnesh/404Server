require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require("mongoose");
const app = express()
const port = process.env.PORT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_KEY;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});




const userSchema = new mongoose.Schema({
  uid: String,
  email: String,
  firstName:String,
  lastName:String,
  dateOfBirth:String,
  profilePicture:String,
  aboutMe:String
});

const postSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  profilePic:String,
  postContent:String,
  postImage:String,
  createdAt:String,
});




const User = mongoose.model('Users', userSchema);
const Post = mongoose.model('Posts', postSchema);

app.get('/getposts',async (req,res) => {
  await Post.find()
  .then((postData) => {
    // console.log('People:', userData);
    res.send(postData)
  })
  .catch((error) => {
    console.error('Error querying people:', error);
  });
})
app.post('/getposts',async (req,res) => {
  await Post.find()
  .then((userData) => {
    // console.log('People:', userData);
    res.send(userData.reverse())
  })
  .catch((error) => {
    console.error('Error querying people:', error);
  });
})
app.post('/getuser',async (req,res) => {
  console.log(req.body.email)
  await User.find({ email: req.body.email })
  .then((userData) => {
    // console.log('People:', userData);

    res.send(userData)
  })
  .catch((error) => {
    console.error('Error querying people:', error);
  });
})


app.post('/updateuser', async (req, res) => {
  // console.log(req.body.updateAboutMe)
  const updateUser = await User.findOneAndUpdate({
    email:req.body.updateEmail
  
  },
  {
    firstName:req.body.updateFirstName,
    lastName:req.body.updateLastName,
    dateOfBirth:req.body.updateDateOfBirth,
    profilePicture:req.body.updateProfilePicture,
    aboutMe:req.body.updateAboutMe

  },{new:true}).then((result) => {
    console.log('Task Doen')
    console.log(result)
  }
  ).catch((error) => {
    console.log(error)
  })
})
app.post('/updateposts', async (req, res) => {
  // console.log(req.body.updateAboutMe)



console.log('Psot email')
console.log(req.body.postEmail + 'Psot email')





  Post.updateMany({
    userId:req.body.postEmail
  
  },
  {$set:{
    userName:req.body.postFirstName +' '+req.body.postLastName,
    profilePic:req.body.postProfilePicture,

  }}).then((result) => {
    console.log('All the old posts updated')
    console.log(result)
  }
  ).catch((error) => {
    console.log(error)
  })











  // const newUser = new User({
  //   firstName:req.body.firstName,
  //   lastName:req.body.lastName,
  //   dateOfBirth:req.body.dateOfBirth,
  //   email:req.body.email,
  //   profilePicture:req.body.profilePicture,
  //   aboutMe:req.body.aboutMe
  // })



  // updateUser.save()
  // .then(savedBook => {
  //   console.log('User saved:', savedBook);
  //   res.status(201).json(savedBook);
  // })
  // .catch(error => {
  //   console.error('Error creating book:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // });
})
app.post('/createuser', async (req, res) => {
  
  const newUser = new User({
    uid:req.body.uid,
    email:req.body.email,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    dateOfBirth:req.body.dateOfBirth,
    profilePicture:req.body.profilePicture,
    aboutMe:req.body.aboutMe
  })
  newUser.save()
  .then(savedUser => {
    console.log('User saved:', savedUser);
    res.status(201).json(savedUser);
  })
  .catch(error => {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
})
app.post('/createpost', async (req, res) => {
  
  const newPost = new Post({
    userId: req.body.userId,
    userName: req.body.userName,
    profilePic: req.body.profilePic,
    postContent:req.body.postContent,
    postImage:req.body.postImage,
    createdAt:req.body.createdAt
  })
  newPost.save()
  .then(savedPost => {
    console.log('User saved:', savedPost);
    res.status(201).json(savedPost);
  })
  .catch(error => {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
})

app.get('/',(req,res) => {
  res.send('Server Started Successfully')
})
app.listen(port, () => {
  console.log(`Server is Listening the port : ${port}`)
})
