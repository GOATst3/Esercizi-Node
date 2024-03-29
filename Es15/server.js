require('dotenv').config();
const config = require('./src/config')
const app = require('./src/app.js');


app.listen(config.PORT, () => console.log(`server is running on port: ${config.PORT}`));

module.exports = app;