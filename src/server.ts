import app from './app';

const start = async () => {
  try {
    await app.listen({ port: 3001 });
    console.log('Server ready at http://localhost:3001');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
