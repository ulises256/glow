module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('ordenes', {
        nombre: Sequelize.STRING,
        status:  {
            type: Sequelize.ENUM,
            values: [ 'completed', 'pendiente' ],
            defaultValue: 'pendiente',
        },
        fechaCompra: Sequelize.DATE,
        monto: Sequelize.FLOAT,
        cantidad: Sequelize.INTEGER,
        descuento: Sequelize.FLOAT,
        openpay_id: Sequelize.STRING
        

    },{
    	name : {
    		singular: 'orden',
    		plural: 'ordenes'
        }
	})

