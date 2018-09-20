module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('estados', {
        estado: Sequelize.STRING,
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        tiene_carrera:  {
            type: Sequelize.ENUM,
            values: [ 'No', 'Si' ],
            defaultValue: 'No'
        }  
    },{
    	name : {
    		singular: 'estado',
    		plural: 'estados'
        }
	})

