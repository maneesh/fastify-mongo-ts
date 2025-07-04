import Fastify from 'fastify';
import dotenv from 'dotenv'
import connectDB  from './plugins/db';
import userRoutes from './routes/userRoutes';
import staticDataRoutes from './routes/staticData';
import cors from '@fastify/cors';

dotenv.config();


const app = Fastify({ logger: true });

// app.register(cors, {
//   origin: 'http://localhost:3000', 
//   credentials: true, 
// });

app.register(cors, { origin: true });

app.register(connectDB);
app.register(
    userRoutes, //{ prefix: '/api/v1' }
);
app.register(
    staticDataRoutes, //{ prefix: '/api/v1' }
);

export default app;
