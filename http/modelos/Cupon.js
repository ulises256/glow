module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('cupones', {
        codigo: Sequelize.STRING,
        precio: Sequelize.FLOAT,
        status:  {
            type: Sequelize.ENUM,
            values: [ 'normal', 'vencido' ],
            defaultValue: 'normal',
        },
        fechaini: Sequelize.DATE,
        fechafin: Sequelize.DATE,        
    },{
    	name : {
    		singular: 'orden',
    		plural: 'ordenes'
        }
	})
