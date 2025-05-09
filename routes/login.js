import { hashPassword, verifyPassword } from "../lib/hash-password.js";

//verifier que cest un string et que ce nest pas ""
function isNonEmptyString(value) {
    return typeof value === "string" && value.trim() !== "";
}

export function post(request, response) {
    //createUser est pour la case coche2 "Voulez vous creer un compte", si checked -> True
    const { username, password, createUser } = request.body;

    if (!isNonEmptyString(username) || !isNonEmptyString(password)) {
        response.status(400).end();
        return;
    }

    // Vérifier si l'utilisateur existe
    request.context.database
        .prepare("SELECT password FROM users WHERE username = ?")
        .then((statement) => statement.get(username))
        .then((user) => {
            if (user) {
                // L'utilisateur existe déjà
                if (createUser) {
                    // L'utilisateur veut créer un compte mais il existe déjà
                    response.status(409).end();
                    return;
                }

                // L'utilisateur veut se connecter
                return verifyPassword(password, user.password).then((match) => {
                    if (match) {
                        request.session = request.session ?? {};
                        request.session.username = username;
                        request.session.isLoggedIn = true;
                        console.log("Session après connexion :", request.session);
                        response.end(); //il se connecte
                    } else {
                        response.status(401).end(); // Mot de passe incorrect
                    }
                });
            } else {
                // L'utilisateur n'existe pas
                if (!createUser) {
                    response.status(401).end(); // Connexion refusée
                    return;
                }

                // L'utilisateur veut créer un nouveau compte
                return hashPassword(password)
                    .then((hashedPassword) =>
                        request.context.database
                            .prepare("INSERT INTO users (username, password) VALUES (?, ?)")
                            .then((statement) => statement.run(username, hashedPassword))
                    )
                    .then(() => {
                        request.session = request.session ?? {};
                        request.session.username = username;
                        request.session.isLoggedIn = true;
                        console.log("Session après création :", request.session);
                        response.end();
                    });
            }
        })
        .catch((error) => {
            console.error("Erreur lors du traitement de /login :", error);
            response.status(500).end();
        });
}