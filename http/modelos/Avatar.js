var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Avatar = sequelize.define('avatar', {
        fb_avatar: Sequelize.STRING,
        tw_avatar: Sequelize.STRING,
        gg_avatar: Sequelize.STRING,
        insta_avatar: Sequelize.STRING,
    })

    return Avatar;
};

module.exports = ex;
