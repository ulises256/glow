module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('rutas', {
        nombre: Sequelize.STRING,
    },{
    	name : {
    		singular: 'ruta',
    		plural: 'rutas'
        }
	})