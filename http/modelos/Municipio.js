module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('municipios', {
        municipio: Sequelize.STRING,
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }        
    },{
    	name : {
    		singular: 'municipio',
    		plural: 'municipios'
        }
	})

