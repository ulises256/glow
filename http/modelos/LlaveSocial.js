module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('llavesSociales', {
        fb_id: Sequelize.STRING,
        tw_id: Sequelize.STRING,
        gl_id: Sequelize.STRING,
        inst_id: Sequelize.STRING,
        password: Sequelize.STRING
    },{
    	name : {
    		singular: 'llaveSocial',
    		plural: 'llavesSociales'
        }
	})