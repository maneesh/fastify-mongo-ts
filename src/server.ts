import app from './app';

const start = async () => {
  try {
    const port = process.env.PORT_ ? Number(process.env.PORT_) : 3001;
    await app.listen({ port });
    console.log(`Server ready at http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
