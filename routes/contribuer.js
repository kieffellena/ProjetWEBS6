export function post(request, response) {
    //gerer la fonction post
    let { name, adress, description } = request.body;
    console.log("Contenu reçu :", request.body);

    if (!description || description.trim() === "") {
        description = "Aucune description";
    }

    request.context.database
        .prepare("INSERT INTO randonnees (name, adress, description, note) VALUES (?, ?, ?, ?)")
        .then((statement) => statement.run(name, adress, description, null))
        .then(() => {
            response.end();
        })
        .catch((error) => {
            if (error.message.includes("UNIQUE constraint failed")) {
                response.status(409).end();
            } else {
                console.error("Erreur lors de l'ajout de la randonnée :", error);
                response.status(500).end();
            }
        });
}
