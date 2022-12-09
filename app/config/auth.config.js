module.exports = {
    secret: "bezkoder-secret-key",

    jwtExpiration: 86400,           // 24 hour
    jwtRefreshExpiration: 86400,   // 24 hours

    /* for test */
     //jwtExpiration: 60,          // 1 minute
     //jwtRefreshExpiration: 120,  // 2 minutes
};