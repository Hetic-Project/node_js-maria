const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator") // Pour validation et désinfection des inputs dans le body
const user_model = require("../models/userModel")
const database = require("../controllers/dbConnection");


module.exports.login = async (req, res, next) => {
    try{
        const { username, password } = req.body

        if (!username || !password) {
            return res.json({ success: false, msg: `Veuillez renseigner tous les champs.` })
        }

        let user = await checkUser(username)
        // console.log(user)

        if (!user) {
            return res.json({ success: false, msg: `L'username ${username} n'est asocié à aucun compte.` })
        }

        const checkpassword = await comparePassword(password, user.password);

        if (checkpassword){
            try {
                let token = generateJWT(user.id)
                return res.json({ success: true, data: user, token })
                
            } catch (error) {
                res.status(500).json({ message: "ERREUR ICI : ", error: error.message })
            }
        } else {
            return res.json({ success: false, msg: `L'username ou le mot de passe est invalide, veuillez réessayer.` })
        }

    } catch(error) {
        res.status(500).json({ message: "ERREUR LA : ", error: error.message })
    }
}

module.exports.register = [ 
    body('password').trim(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({ success: false, errors: errors.array() })
            }

            const { username, password } = req.body || {}
            if (!username || !password) {
                return res.json({ success: false, msg: `Veuillez renseigner tous les champs.` })
            }

            const checkedUser = await checkUser(username)
            if (checkedUser){
                return res.json({ success: false, msg: `L'username ${username} est déjà associé à un compte.` })
            }

            const hashedPassword = await hashPassword(password, 10)

            const query = 'INSERT INTO user_model (username, password) VALUES (?, ?)';
            const [result] = await database.query(query, [username, hashedPassword]);
            console.log('RESULT : ', result);

            return res.status(201).json({ success: true, msg: "Utilisateur enregistré avec succès." });

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

]


// --------------------FONCTIONS--------------------

// Fonction pour vérifier si l'username fourni est dans la bdd
const checkUser = async (username) => {
    try {  
      const query = 'SELECT * FROM user_model WHERE username = ? LIMIT 1';
      const [rows] = await database.query(query, [username]);

      if (rows.length > 0) {
          return rows[0]
      }

      return null

  } catch (error) {
      console.log(error)
      throw error
  }
}

// Fonction pour comparer les mots de passe 
async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword)
        return match

    } catch (error) {
        throw error
    }
}

// Fonction de génération de token
const generateJWT = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_KEY, {expiresIn: '1h' })
}

// Fonction pour hasher le password
const hashPassword = async (password, saltRounds) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds)
      return await bcrypt.hash(password, salt)

    } catch (error) {
      console.log(error)
    }
    return null;
  };