import Fastify from 'fastify';
import dotenv from 'dotenv'
import connectDB  from './plugins/db';
import userRoutes from './routes/userRoutes';
import staticDataRoutes from './routes/staticData';
import cors from '@fastify/cors';
import mediaRoutes from './routes/mediaRoutes';
import cmsStaticContentRoutes from './routes/CmsStaticContentRoute';

dotenv.config();

const app = Fastify({ logger: true ,
    pluginTimeout: 10000
});
app.register(cors, { origin: true });
app.register(connectDB);
app.register(userRoutes);
app.register(staticDataRoutes);
app.register(mediaRoutes);
app.register(cmsStaticContentRoutes);

// const app = Fastify({ logger: true });

// app.register(cors, {
//   origin: 'http://localhost:3000', 
//   credentials: true, 
// });

// const app = Fastify({
//   logger: true,
//   pluginTimeout: 10000
// });

// app.register(fastifyCors, {
//   origin: true, 
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
// });


// app.register(cors, { origin: true });

app.register(connectDB);
app.register(
    userRoutes, { prefix: '/api/' }
);
app.register(
    staticDataRoutes, { prefix: '/api/' }
);

export default app;
