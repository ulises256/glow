module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('impresos', {
        codigo: {type: Sequelize.STRING, unique: true},
        status:  {
            type: Sequelize.ENUM,
            values: [ 'valido', 'no-valido' ],
            defaultValue: 'valido'
        }        

    },{
    	name : {
    		singular: 'impreso',
    		plural: 'impresos'
        }
	})
