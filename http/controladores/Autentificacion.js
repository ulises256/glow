var db = require('../relaciones');

var passport = require('passport'); //Agregamos el passport

var jwt = require('jsonwebtoken'); //Agregamos jsonwebtoken

var localStrategy = require('passport-local').Strategy; //Agregamos el tipo de estrategia
var facebookStrategy = require('passport-facebook').Strategy; //Agregamos facebook
var twitterStrategy = require('passport-twitter').Strategy; //estraeia de twitter
var googleStrategy = require('passport-google-oauth20').Strategy; //estrategia de google
var instagramStrategy = require('passport-instagram').Strategy;

var config = require('../../conf/oauth.js')

var {usuario, avatar, llaveSocial} = db;

var secret = 'lazukulencia'; //creamos una variable para el token

var ex = module.exports = {};



/*
    Requirimientos
    Modelos:
        Usuario; con atributos minimos: nombre: Sequelize.STRING, correo: Sequelize.STRING, password: Sequelize.STRING, tipo: Sequelize.STRING, sexo: Sequelize.STRING,
        LlaveSocial; con atributos minimos: fb_id: Sequelize.STRING, tw_id: Sequelize.DECIMAL, gl_id: Sequelize.STRING, inst_id: Sequelize.DECIMAL, password: Sequelize.STRING,
        Avatar: con atributos minimos: fb_avatar: Sequelize.STRING,tw_avatar: Sequelize.STRING, gg_avatar: Sequelize.STRING, insta_avatar: Sequelize.STRING,

    Relaciones:
        usuario.hasOne(llaveSocial , {as: 'SocialKey', foreignKey: 'id_usuario', onDelete: 'CASCADE'});
        llaveSocial.belongsTo(usuario, {as: 'Usuario', foreignKey: 'id_usuario'});
        llaveSocial.hasOne(avatar, {as: 'Avatar', foreignKey: 'social_key', onDelete: 'CASCADE'});
        avatar.belongsTo(llaveSocial , {as: 'SocialKey', foreignKey: 'social_key'});

*/

passport.serializeUser((user, done) => done(null, {id: user.id, nombre: user.nombre, correo: user.correo})); 

passport.deserializeUser((user, done) => done(null, user));


/***********************************************Auterntificación normal********************************************************************/

ex.token =  (req, res, next) => jwt.verify(req.params.token, secret, (err, decoded) => {
        if (err)
            res.send({success: false, message: 'token invlid'})
        else
            res.json(decoded)
    });

ex.login = (req, res, next) => passport.authenticate('login', (err, user, info) => {
        if (err) 
            return next(err);

        if (!user)
            return res.send({success: false, message: 'Incorrect username or password.'});

        req.login(user, (err) => {
            if (err)
                return next(err);

            var token = jwt.sign({
                user: user
            }, secret, {expiresIn: '24h'});
            return res.send({success: true, message: 'Authentication succeeded', token: token});
        });
    })(req, res, next);

ex.registro = (req, res, next) =>  passport.authenticate('registro', (err, user, info) => {
        if (err) 
            return next(err);

        if (!user)
            return res.send({success: false, message: info});

        req.login(user, (err) => {
            if (err)
                return next(err);

            var token = jwt.sign({
                user: user
            }, secret, {expiresIn: '24h'});
            return res.send({success: true, message: 'Authentication succeeded', token: token});
        });
    })(req, res, next);


passport.use('login', new localStrategy({

    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true

}, (req, username, password, done) =>  usuario.findOne({ where: { 'correo': username }})
    .then((user) => {
        if (user == null) 
            return done(null, false);

        if (password == user.password)
            return done(null, user);

        return done(null, false);
    })
))

passport.use('registro', new localStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => { usuario.findOrCreate({ where: { 'correo': username }, defaults: req.body})
    .spread((user, created) => created ?  done(null, user) :  done(null, false)
    , (err) => done(err, null));
}));


/***********************************************Auterntificación Social********************************************************************/

ex.tokenSocial = (req, res, next) => usuario.findOne({ where: { 'correo': req.user.correo }})
    .then(usering => token = jwt.sign({ user: usering}, secret, { expiresIn: '1h' }) )
    .then(token => res.redirect('/user/' + token))


ex.twitter = (req, res, next) =>  passport.authenticate('twitter', {scope: ['email', 'user_location']})(req, res, next);

ex.twittercallback = (req, res, next) => passport.authenticate('twitter', { successRedirect: '/token', failureRedirect: '/'})(req, res, next);

passport.use('twitter', new twitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL,
    includeEmail: true
  },
  function(token, tokenSecret, profile, done) {

    process.nextTick(()  => {
        socializar('tw_id', 'fb_avatar' ,profile, done)
    });
    
  }
));

ex.facebook = (req, res, next) => passport.authenticate('facebook', {scope: ['email', 'user_location']})(req, res, next);

ex.facebookcallback = (req, res, next) => passport.authenticate('facebook', { successRedirect: '/token', failureRedirect: '/'})(req, res, next);


passport.use('facebook', new facebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
        'id',
        'emails',
        'displayName',
        'picture',
        'cover',
        'first_name',
        'last_name',
        'locale',
        'gender',
        'hometown'
    ]
}, function(accessToken, refreshToken, profile, done) {
    profile.photos != undefined ? avatar_fb = profile.photos[0].value : avatar_fb = 'assets/images/perfil.png'
    process.nextTick(() => {
        socializar('fb_id', 'fb_avatar' ,profile, done)

    });
}));


ex.instagram = (req, res, next) =>  passport.authenticate('instagram',  { scope: ['basic', 'public_content', 'follower_list', 'comments', 'relationships', 'likes'] })(req, res, next);

ex.instagramcallback = (req, res, next) => passport.authenticate('instagram', { successRedirect: '/token', failureRedirect: '/'})(req, res, next);

passport.use('instagram', new instagramStrategy({
    clientID: config.instagram.clientID,
    clientSecret: config.instagram.clientSecret,
    callbackURL: config.instagram.callbackURL,
  },
  function(token, tokenSecret, profile, done) {

    process.nextTick(()  => {
        socializar('inst_id', 'fb_avatar' ,profile, done)
    });
    
  }
));

ex.google = (req, res, next) =>  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] })(req, res, next);

ex.googlecallback = (req, res, next) => passport.authenticate('google', { successRedirect: '/token', failureRedirect: '/'})(req, res, next);

passport.use('google', new googleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile)
    process.nextTick(()  => {
        socializar('gl_id', 'fb_avatar' ,profile, done)
    });
    
  }
));

ex.avatar = (req, res, next) => usuario.findById(req.params.id)
    .then(user => user ? user.getSocialKey().then(key => key.getAvatar().then(avatari => res.status(200).jsonp(avatari))) : res.status(200).jsonp());

function socializar(red_id, avatar_id, profile, done) {
    console.log(profile)
    if(red_id == 'inst_id')
        profile._json.data.profile_picture ? avatar_image = profile._json.data.profile_picture : avatar_image = 'assets/images/perfil.png';
    else
        profile.photos != undefined ? avatar_image = profile.photos[0].value : avatar_image = 'assets/images/perfil.png';

    llaveSocial.find({
        where: {
            [ red_id ] : profile.id
        }
    })
    .then(SocialKey => {
        if (SocialKey) {
            SocialKey.getAvatar().then(avatari => avatari ? avatari.update({ [avatar_id]: avatar_image }) : SocialKey.createAvatar({ [avatar_id]: avatar_image }))
            SocialKey.getUsuario().then(user => user.update({ nombre: profile.displayName })).then(user => done(null, user))
        } else {
            usuario.findOrCreate({
                where: {
                    correo: profile.emails[0].value
                },
                defaults: {
                    nombre: profile.displayName,
                    correo: profile.emails[0].value,
                    sexo: profile.gender,                            
                }                    
            }).spread((user, created) => created ?  usuarioCreado(user, red_id, avatar_id, profile, done, avatar_image) : usuarioEncontrado(user, red_id, avatar_id, profile, done, avatar_image) );

        }
    },
        function (err) {
            return done(err);
        })
}


function usuarioEncontrado(user, red_id, avatar_id, profile, done, avatar_image) {
    user.getSocialKey()
        .then(key => key ?
            (
                key.getAvatar()
                    .then(avatari => avatari ? avatari.update({ [avatar_id]: avatar_image }) : key.createAvatar({ [avatar_id]: avatar_image })),
                key.update({ [ red_id ]: profile.id }),
                done(null, user)
            )
            :
            (
                user.createSocialKey({ [ red_id ] : profile.id })
                    .then(keysito => keysito.getAvatar()
                                            .then(avatari => avatari ? avatari.update({ [avatar_id]: avatar_image }) : keysito.createAvatar({ [avatar_id]: avatar_image }))
                    )
                    .then(nada => done(null, user))
            )
        )
}


function usuarioCreado(user, red_id, avatar_id, profile, done, avatar_image) {
    user.createSocialKey({ [ red_id ] : profile.id })
        .then(keysito => {
            keysito.getAvatar()
                .then(avatari => avatari ? avatari.update({ [avatar_id]: avatar_image }) : keysito.createAvatar({ [avatar_id]: avatar_image }))
            done(null, user)
        })
}