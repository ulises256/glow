module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('puntoVenta', {
        nombre: Sequelize.STRING,
        latitud: Sequelize.FLOAT,
        longitud: Sequelize.FLOAT,
        horario: Sequelize.STRING
    },{
    	name : {
    		singular: 'puntoVenta',
    		plural: 'puntoVentas'
        }
	})