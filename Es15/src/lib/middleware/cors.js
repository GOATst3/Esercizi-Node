const cors = require('cors');

const initCorsMiddleware = () => {
    const corsOption = {
        origin: 'http://localhost:5500',
        credentials:true
    };

    return cors(corsOption);
};

module.exports = initCorsMiddleware;