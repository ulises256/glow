var mysql = require('mysql');
var Sequelize = require('sequelize');


var sequelize = new Sequelize('glow', 'malaga', 'qwertyuiop', {
    host: '35.238.80.211',
    dialect: 'mysql',
    port: '3306',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// mysql://bdfc46c39e3627:e8402ceb@us-cdbr-iron-east-04.cleardb.net/heroku_df534acfc8830eb?reconnect=true
// var sequelize = new Sequelize('heroku_df534acfc8830eb', 'bdfc46c39e3627', 'e8402ceb', {
//     host: 'us-cdbr-iron-east-04.cleardb.net',
//     dialect: 'mysql',
//     port: '3306',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });
// var sequelize = new Sequelize('glow', 'root', '1234', {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: '3306',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });

sequelize.sync()
.then(() =>  console.log('Connecion realizada'))
.catch(err =>  console.log('No se puede conectar a la bd:', err))

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
