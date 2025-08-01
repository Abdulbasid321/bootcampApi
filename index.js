// const express = require('express');
// require('dotenv').config();
// const mongoose = require('mongoose');
// const cors = require('cors');



// const MONGODB_URI = 'mongodb+srv://nazeef:nazeef123@cluster0.yflxqwa.mongodb.net/bootcamp?retryWrites=true&w=majority&appName=Cluster0';
// // MONGODB_URI = 'mongodb://127.0.0.1:27017/bootcamp';
// const app = express();

// // middleware
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://bootcamp-pearl-phi.vercel.app'],
//   credentials: true
// }));

// // serve static assets
// app.use(express.static('public'));

// // root route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to the API' });
// });

// // Connect to MongoDB THEN start the server
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ MongoDB connected');

//   // mount routes AFTER MongoDB connects
// app.use('/api/admin', require('./src/routes/admin.routes'));
// app.use('/api', require('./src/routes/register.routes'));


//   // Start the server after DB connects
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });

// })
// .catch(err => {
//   console.error('❌ MongoDB connection error:', err);
// });


const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const MONGODB_URI = 'mongodb+srv://nazeef:nazeef123@cluster0.yflxqwa.mongodb.net/bootcamp?retryWrites=true&w=majority&appName=Cluster0';

const app = express();

// ✅ CORS Middleware – allow requests from your frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://bootcamp-pearl-phi.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Handle preflight requests for all routes
app.options('*', cors());

// ✅ Middleware for parsing JSON and form data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ✅ Serve public assets (optional)
app.use(express.static('public'));

// ✅ Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// ✅ Connect to MongoDB THEN mount routes and start server
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');

  // Mount routes AFTER DB connects
  app.use('/api/admin', require('./src/routes/admin.routes'));
  app.use('/api', require('./src/routes/register.routes'));

  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
