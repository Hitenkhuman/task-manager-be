const dotenv = require('dotenv');
const env = process.env.NODE_ENV || '';
dotenv.config({ path: env + '.env' });
const app = require('./src/server');

app.listen(process.env.PORT || 3001, () => {
    console.info('Server is started at : %s', process.env.PORT);
});
