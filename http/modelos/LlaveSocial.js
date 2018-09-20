module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('llavesSociales', {
        fb_id: Sequelize.STRING,
        tw_id: Sequelize.DECIMAL,
        gl_id: Sequelize.STRING,
        inst_id: Sequelize.DECIMAL,
        password: Sequelize.STRING
    },{
    	name : {
    		singular: 'llaveSocial',
    		plural: 'llavesSociales'
        }
	})