const env = process.env.NODE_ENV || 'dev'; // dev o test

const dev = {
    app:{
        port: process.env.PORT  || 3000
    },
    db: {
      host: 'localhost',
      port: 27017,
      name: 'master-build'      
    }
};

const test = {
    app:{
        port: process.env.PORT  || 3000
    },
    db: {
      host: 'localhost',
      port: 27017,
      name: 'master-build'      
    }
};

const config = {
    dev,
    test
};

module.exports = config[env];