module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('punto', {
        latitud: Sequelize.FLOAT,
        longitud: Sequelize.FLOAT,
    },{
    	name : {
    		singular: 'punto',
    		plural: 'puntos'
        }
	})