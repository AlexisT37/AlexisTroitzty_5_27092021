let params = new URL(document.location).searchParams;
let id = params.get("id");


function getUnProduit() {
    fetch(`http://localhost:3000/api/products/${id}`) /* on fetch l'api avec son adress et la méethode fetch */
        .then(function (res) {
            /* on utilise le then qui fait que si on a une fonction avec un res alors on va */
            return res.json(); /* retourner le json du res */
        })

        .catch((error) => {
            /* si on a une erreur, alors on affiche un message */
            console.log("Impossible d'accéder aux canapés, vérifiez le serveur.")
        })

        .then(resultatAPI => {
            /* si on a le resultat correct par l'API alors */
            const articles = resultatAPI; /* on initialise une constante dont la valeur est le résultat de l'API*/
            let canap_name = document.querySelector("#title")
            canap_name.textContent = `${articles.name}`
            let canap_price = document.querySelector("#price")
            canap_price.textContent = `${(articles.price / 100).toString().replace('.', ',')}`
            let canap_description = document.querySelector("#description")
            canap_description.textContent = `${articles.description}`


            let couleur = document.getElementById("colors");
            let couleurs = articles.colors;
            couleurs.forEach(element => {
                let couleur_test = document.createElement("option")
                couleur_test.textContent = `${element}`;
                couleur.appendChild(couleur_test);

            });



        });

};


getUnProduit();