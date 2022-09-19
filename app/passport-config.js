const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUserByEmail) {
    const authenticateUser = async(email, mot_passe, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'Aucun utilisateur avec cet email ' })
        }
        try {
            if (await bcrypt.compare(mot_passe, user.mot_passe)) {

                return done(null, user)
            } else {
                return done(null, false, { message: 'Mot de passe incorrect ' })
            }
        } catch (e) {
            return done(e)

        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' },
        authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}
module.exports = initialize