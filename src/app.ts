import Fastify from 'fastify';
import dotenv from 'dotenv'
import connectDB  from './plugins/db';
import userRoutes from './routes/userRoutes';
import staticDataRoutes from './routes/staticData';

dotenv.config();

const app = Fastify({ logger: true });

app.register(connectDB);
app.register(
    userRoutes,
    staticDataRoutes
);

export default app;
