let params = new URL(document.location).searchParams;
let id = params.get("id"); /* trouver id du produit assigné */

//fonction pour obtenir les informations d'un seul produit dans la page produit
function getUnProduit() {
    fetch(`http://localhost:3000/api/products/${id}`) /* on fetch l'api avec son adress et la méthode fetch */
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
            canap_name.textContent = `${articles.name}` /* modifier le titre du canapé */
            let canap_price = document.querySelector("#price")
            canap_price.textContent = `${(articles.price).toString()}` //Modif prix
            let canap_description = document.querySelector("#description")
            canap_description.textContent = `${articles.description}` //modif description



            let couleur = document.getElementById("colors");
            let couleurs = articles.colors;
            couleurs.forEach(element => {
                /* boucle qui parcourt la liste des couleurs */
                let couleur_test = document.createElement("option")
                couleur_test.textContent = `${element}`;
                couleur.appendChild(couleur_test);
                couleur_test.setAttribute('value', element) //Modifier attribut value de la couleur
            });



        });

};


getUnProduit(); /* produit de base */

/* cibler le panier */
const ajoutPanier = document.querySelector("#addToCart");

/* event listener pour l'ajout au panier */
ajoutPanier.addEventListener("click", (event) => {
    const formulaire = document.querySelector("#colors"); /* selection liste couleurs */
    const couleurValue = formulaire.value; /* valeur de la couleur*/
    const titreProduct = document.querySelector("#title")
    const titreProductContent = titreProduct.innerHTML;

    // gestion de la quantité de produit
    const quantiteProduitString = (document.querySelector("#quantity")).value;

    const quantiteProduitInt = parseInt(quantiteProduitString);

    /* fonction pour confirmer le choix avec une fenêtre pop up */
    function confirmPopup() {
        if (window.confirm("le produit est ajouté au panier, OK pour accéder au panier, Cancel pour retourner à l'acceuil")) {
            window.location.href = "cart.html";
        } else {
            window.location.href = "index.html";
        }
    }


    // verification de validité du nombre d'article
    if ((typeof quantiteProduitInt) === "number" && quantiteProduitInt % 1 === 0) {
        /* le typeof est numeber et c'est un integer, pas un float */
        if (quantiteProduitInt <= 100 && quantiteProduitInt >= 1) {


            // //TODO verifier la couleur
            /* fonction pour verifier s'il s'agit d'un produit de même couleur */
            function verifierCouleur(produitEnregistreLocalStorage, canapTestId, couleurValue) {


                // console.log("produitEnregistreLocalStorage : " + produitEnregistreLocalStorage);
                for (let canapCompteur = 0; canapCompteur < produitEnregistreLocalStorage.length - 1; canapCompteur++) {
                    const couleurMonCanap = document.querySelector("#colors").value;
                    // console.log("hello");
                    console.log("id de mon canapé : " + canapTestId);
                    console.log("id du canapé panier: " + produitEnregistreLocalStorage[canapCompteur].idproduit);
                    console.log("couleur de mon canapé : " + couleurMonCanap);
                    console.log("couleur du canapé panier : " + produitEnregistreLocalStorage[canapCompteur].couleurProduit);
                    if (canapTestId === produitEnregistreLocalStorage[canapCompteur].idproduit && couleurMonCanap === produitEnregistreLocalStorage[canapCompteur].couleurProduit) {
                        // produitEnregistreLocalStorage.quantiteProduit += canapTestId.quantiteProduit;
                        // produitEnregistreLocalStorage[canapCompteur].quantiteProduit + quantiteProduitInt;
                        // localStorage.setItem('produitEnregistreLocalStorage[canapCompteur].quantiteProduit', 'produitEnregistreLocalStorage[canapCompteur].quantiteProduit + quantiteProduitInt;');
                        // localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage));
                        console.log("vieille quantite : " + produitEnregistreLocalStorage[canapCompteur].quantiteProduit);

                        console.log("c'est la même couleur");
                        produitEnregistreLocalStorage.setItem("");
                        console.log("nouvelle quantite : " + produitEnregistreLocalStorage[canapCompteur].quantiteProduit);
                        // console.log("produitEnregistreLocalStorage[canapCompteur].quantiteProduit : " + produitEnregistreLocalStorage[canapCompteur].quantiteProduit);

                    } else {
                        console.log("ce n'est pas la même couleur");
                    }
                }
            }



            /*-------------------- SECTION LOCAL STORAGE------------- */

            prixProduit = document.querySelector("#price").textContent; /* séléctionner id pour prix */

            let proprietesProduit = {
                /* creer objet js avec 4 propriétés */
                couleurProduit: couleurValue,
                prixProduit: (parseInt((document.querySelector("#price").textContent))),
                quantiteProduit: quantiteProduitInt,
                idproduit: id,
                titreCanapé: titreProductContent

            };

            let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit")); /* creer objet js */

            /* fonction pour ajouter un produit dans le localStorage */
            const addProduitLocalStorage = () => {
                /* add user selected values in the array */
                produitEnregistreLocalStorage.push(proprietesProduit);
                /* add array to local storage as a JSON string */
                localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage));
            };

            // cas ou produit deja existant
            if (produitEnregistreLocalStorage) {
                /* si il y a produitEnregistreLocalStorage */
                addProduitLocalStorage();
                verifierCouleur(produitEnregistreLocalStorage, id)
                confirmPopup();

                //* cas ou pas de produit
            } else {
                produitEnregistreLocalStorage = []; /* comme il n'y a pas d'array on le crée */
                addProduitLocalStorage();

                verifierCouleur(produitEnregistreLocalStorage, id)
                confirmPopup();
            }

        } else {
            alert("Rentrez un nombre correct et ne laissez pas la couleur par défaut s'il vous plait")
            event.preventDefault();
        }
    }

});