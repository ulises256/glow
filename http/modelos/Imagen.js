module.exports = ({ Sequelize, sequelize } = conector) =>
    sequelize.define('imagenes', {
        imagen: {
            type: Sequelize.BLOB('medium'),
            get() {
                if (this.getDataValue('imagen'))
                    return new Buffer(this.getDataValue('imagen')).toString('ascii')
                else
                    return null
            }
        },
        tipo:  {
            type: Sequelize.ENUM,
            values: [ 'normal', 'mapa' ],
            defaultValue: 'normal',
        }        
    }, {
            name: {
                singular: 'imagen',
                plural: 'imagenes'
            }
        })

