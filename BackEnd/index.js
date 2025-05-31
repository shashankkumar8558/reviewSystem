import express from 'express';
import cors from 'cors';
import authRoutes from './route/auth.route.js'
import adminRoutes from './route/admin.route.js'
import adminUserRoute from './route/adminUser.route.js'
import adminStoreRoute from './route/adminStore.route.js'
import ownerRoute from './route/owner.route.js'
import ratingRoute from './route/rating.route.js'


const app = express();
app.use(express.json());

const PORT = 3000;

app.use(cors());

app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes)
app.use('/api/admin',adminUserRoute);
app.use('/api/admin',adminStoreRoute);
app.use('/api/owner',ownerRoute);
app.use('/rating',ratingRoute);


app.listen(PORT,() => {
  console.log(`Server is running on the port : ${PORT}`);
})