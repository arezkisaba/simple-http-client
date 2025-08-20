import 'reflect-metadata';
import app from './app';

const appPort = process.env.APP_PORT;

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`appPort: ${appPort}`);
    console.log(`Server is running on port ${appPort}`);
});
