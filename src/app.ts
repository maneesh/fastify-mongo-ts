import Fastify from 'fastify';
import dotenv from 'dotenv'
import connectDB  from './plugins/db';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = Fastify({ logger: true });

app.register(connectDB);
app.register(userRoutes);

export default app;
