const cors = require('cors');

const initCorsMiddleware = () => {
    const corsOption = {
        origin: '*'
    };

    return cors(corsOption);
};

module.exports = initCorsMiddleware;