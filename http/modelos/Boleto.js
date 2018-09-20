module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('boletos', {
        nombre: Sequelize.STRING,
        precioini: Sequelize.INTEGER,
        preciofin: Sequelize.INTEGER,
        fechaini: Sequelize.DATE,
        fechafin: Sequelize.DATE,
        tipo:  {
            type: Sequelize.ENUM,
            values: [ 'preventa', 'normal' ]
        },
        activo:  {
            type: Sequelize.ENUM,
            values: [ 'No', 'Si' ],
            defaultValue: 'No'
        }        

    },{
    	name : {
    		singular: 'boleto',
    		plural: 'boletos'
        }
	})

