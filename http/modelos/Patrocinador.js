module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('patrocinadores', {
        nombre: Sequelize.STRING,
        tipo:  {
            type: Sequelize.ENUM,
            values: [ 'Diamente Presenta', 'Diamante', 'Platino', 'Oro' ],
            defaultValue: 'Oro',
        },
        sitioWeb: Sequelize.STRING,
        tipoApoyo:  {
            type: Sequelize.ENUM,
            values: [ 'Efectivo', 'Especie']
        },          
        puntoVenta:  {
            type: Sequelize.ENUM,
            values: [ 'Si', 'No'],
            defaultValue: 'No',
        },        

    },{
    	name : {
    		singular: 'patrocinador',
    		plural: 'patrocinadores'
        }
	})

