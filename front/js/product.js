let params = new URL(document.location).searchParams;
let id = params.get("id"); /* trouver id du produit assigné */

main();

function main() {

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
                let canap_price = document.querySelector("#price")
                let canap_description = document.querySelector("#description")
                let canap_img = document.querySelector(".item__img img");
                canap_name.textContent = `${articles.name}` /* modifier le titre du canapé */
                canap_price.textContent = `${(articles.price).toString()}` //Modif prix
                canap_description.textContent = `${articles.description}` //modif description
                canap_img.setAttribute("src", `${articles.imageUrl}`);
                canap_img.setAttribute("alt", `${articles.altTxt}`);
                let couleur = document.getElementById("colors");
                let couleurs = articles.colors;

                couleurs.forEach(element => {
                    /* boucle qui parcourt la liste des couleurs */
                    let couleur_test = document.createElement("option")
                    couleur_test.textContent = `${element}`;
                    couleur.appendChild(couleur_test);
                    couleur_test.setAttribute('value', element) //Modifier attribut value de la couleur

                }); /* fin du foreach des couleurs */

            }); /* fin du then API */
    }; /* fin du get UnProduit */



    function ajouterAuPanier() {
        /* cibler le panier */
        const ajoutPanier = document.querySelector("#addToCart");
        ajoutPanier.addEventListener("click", (event) => {
            event.preventDefault();

            /* fonction pour confirmer le choix avec une fenêtre pop up */
            function confirmPopup() {
                if (window.confirm("le produit est ajouté au panier, OK pour accéder au panier, Cancel pour retourner à l'acceuil")) {
                    // window.location.href = "cart.html";
                } else {
                    // window.location.href = "index.html";
                }
            } /* fin de la fonction confirmPopup */

            /* déclaration des variables afin de créer un objet pour le panier */
            const formulaire = document.querySelector("#colors"); /* selection liste couleurs */
            const couleurValue = formulaire.value; /* valeur de la couleur*/
            const quantiteProduitString = (document.querySelector("#quantity")).value; /* valeur de la quantité choisie */
            const quantiteProduitInt = parseInt(quantiteProduitString); /* valeur entière de la quantité choisie */
            const titreProduct = document.querySelector("#title")
            const titreProductContent = titreProduct.innerHTML;
            prixProduit = document.querySelector("#price").textContent; /* séléctionner id pour prix */
            let canap_img = document.querySelector(".item__img img"); /* séléctionner image pour avoir src et alt */
            let canap_img_src = canap_img.getAttribute("src"); /* séléctionner attribut src */
            let canap_img_alt = canap_img.getAttribute("alt"); /* séléctionner attribut alt */

            // verification de validité du nombre d'article
            if ((typeof quantiteProduitInt) === "number" && quantiteProduitInt % 1 === 0) {
                /* le typeof est numeber et c'est un integer, pas un float */
                if (quantiteProduitInt <= 100 && quantiteProduitInt >= 1) {


                    function mettreDansLeLocalStorage() {
                        let proprietesProduit = {
                            /* creer objet js avec 7 propriétés */
                            couleurProduit: couleurValue,
                            prixProduit: prixProduit,
                            quantiteProduit: quantiteProduitInt,
                            idproduit: id,
                            titreCanapé: titreProductContent,
                            photoCanapé: canap_img_src,
                            altCanapé: canap_img_alt

                        }; /* fin de déclaration de l'objet proprietesProduit */

                        let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit")); /* aller chercher string produit et créer objet js */

                        /* fonction pour initialiser le localStorage */
                        function initialiserLocalStorage() {
                            produitEnregistreLocalStorage = []; /* comme il n'y a pas d'array on le crée */
                            produitEnregistreLocalStorage.push(proprietesProduit); /* on push l'objet proprietesProduit a la fin de produitEnregistreLocalStorage*/
                            localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage)); /* on verrouille litem produit dans le localstorage */
                        };

                        function ajouterBoutLocalStorage() {
                            produitEnregistreLocalStorage.push(proprietesProduit); /* on push l'objet proprietesProduit a la fin de produitEnregistreLocalStorage*/
                            localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage));
                        }

                        if (produitEnregistreLocalStorage) {
                            /* /* si localstorage est présent donc le panier a au moins un élément */

                            for (let canapCompteur = 0; canapCompteur < produitEnregistreLocalStorage.length; canapCompteur++) {
                                /* boucle qui parcourt le localstorage */
                                // console.log("hello mon canap");
                                let canapTestId = id //modif description
                                console.log("id de mon canapé : " + canapTestId);
                                console.log("id du canapé panier: " + produitEnregistreLocalStorage[canapCompteur].idproduit);
                                console.log("couleur de mon canapé : " + couleurValue);
                                console.log("couleur du canapé panier : " + produitEnregistreLocalStorage[canapCompteur].couleurProduit);
                                if (canapTestId === produitEnregistreLocalStorage[canapCompteur].idproduit && couleurValue === produitEnregistreLocalStorage[canapCompteur].couleurProduit) {
                                    console.log("c'est la meme couleur");
                                    console.log("***************************************")
                                    // confirmPopup()

                                } else if (couleurValue !== produitEnregistreLocalStorage[canapCompteur].couleurProduit) {
                                    console.log("ce n'est pas la meme couleur : ");
                                    console.log("***************************************")
                                    ajouterBoutLocalStorage();
                                    // confirmPopup()
                                }

                                // console.log("coucou matt : ");

                            } /* fin de la boucle for */


                            // ajouterBoutLocalStorage();


                        } else {
                            /* si localstorage n'est pas présent donc le panier est vide */
                            // console.log("ca va pas")
                            initialiserLocalStorage();
                            confirmPopup();
                        };




                    }; /* fin de déclaration fonction mettreDansLeLocalStorage() */



                    mettreDansLeLocalStorage();




                }; /* fin du if interne quantité */
            }; /* fin du if externe quantité*/

        }); /* fin du add event listener */

    } /* fin de la fonction ajouterAuPanier */

    ajouterAuPanier();

    getUnProduit(); /* produit de base */


} /* fin de la fonction main */