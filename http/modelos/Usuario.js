var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Usuario = sequelize.define('usuario', {
        nombre: Sequelize.STRING,
        correo: Sequelize.STRING,
        password: Sequelize.STRING,
        tipo: Sequelize.STRING,
        sexo: Sequelize.STRING,
        apellidos: Sequelize.STRING,
        edad: Sequelize.INTEGER,
        foto: Sequelize.STRING,
        ciudad: Sequelize.STRING,
        entero: Sequelize.STRING,
        gustos: Sequelize.STRING,
    });

    return Usuario;

};

module.exports = ex;
