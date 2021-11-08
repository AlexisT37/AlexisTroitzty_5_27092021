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
            // window.location.href = "cart.html";
        } else {
            // window.location.href = "index.html";
        }
    }


    // verification de validité du nombre d'article
    if ((typeof quantiteProduitInt) === "number" && quantiteProduitInt % 1 === 0) {
        /* le typeof est numeber et c'est un integer, pas un float */
        if (quantiteProduitInt <= 100 && quantiteProduitInt >= 1) {


            // //TODO verifier la couleur
            /* fonction pour verifier s'il s'agit d'un produit de même couleur */
            function verifierCouleur(produitEnregistreLocalStorage, canapTestId) {


                // console.log("produitEnregistreLocalStorage : " + produitEnregistreLocalStorage);
                for (let canapCompteur = 0; canapCompteur < produitEnregistreLocalStorage.length - 1; canapCompteur++) {
                    const couleurMonCanap = document.querySelector("#colors").value;
                    console.log("hello");
                    console.log("id de mon canapé : " + canapTestId);
                    console.log("id du canapé panier: " + produitEnregistreLocalStorage[canapCompteur].idproduit);
                    console.log("couleur de mon canapé : " + couleurMonCanap);
                    console.log("couleur du canapé panier : " + produitEnregistreLocalStorage[canapCompteur].couleurProduit);
                    if (canapTestId === produitEnregistreLocalStorage[canapCompteur].idproduit && couleurMonCanap === produitEnregistreLocalStorage[canapCompteur].couleurProduit) {
                        produitEnregistreLocalStorage[canapCompteur].quantiteProduit += quantiteProduitInt;
                        console.log("avant : ");
                        localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage));





                    } else {
                        console.log("ce n'est pas la même couleur");
                        addProduitLocalStorage();
                        verifierCouleur(produitEnregistreLocalStorage, id)
                        confirmPopup();
                    }
                }
            }



            /*-------------------- SECTION LOCAL STORAGE------------- */

            prixProduit = document.querySelector("#price").textContent; /* séléctionner id pour prix */
            let canap_img = document.querySelector(".item__img img"); /* séléctionner image pour avoir src et alt */
            let canap_img_src = canap_img.getAttribute("src"); /* séléctionner attribut src */
            let canap_img_alt = canap_img.getAttribute("alt"); /* séléctionner attribut alt */


            let proprietesProduit = {
                /* creer objet js avec 7 propriétés */
                couleurProduit: couleurValue,
                prixProduit: (parseInt((document.querySelector("#price").textContent))),
                quantiteProduit: quantiteProduitInt,
                idproduit: id,
                titreCanapé: titreProductContent,
                photoCanapé: canap_img_src,
                altCanapé: canap_img_alt

            };

            let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit")); /* aller chercher string produit et créer objet js */
            // console.log("produitEnregistreLocalStorage : ");
            // console.log(produitEnregistreLocalStorage);
            // console.log(typeof produitEnregistreLocalStorage);

            /* fonction pour ajouter un produit dans le localStorage */
            function addProduitLocalStorage() {
                produitEnregistreLocalStorage.push(proprietesProduit); /* on push l'objet proprietesProduit a la fin de produitEnregistreLocalStorage*/
                localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage)); /* on verrouille litem produit dans le localstorage */
            };

            if (produitEnregistreLocalStorage) {
                /* si il y a produitEnregistreLocalStorage */

                addProduitLocalStorage();
                verifierCouleur(produitEnregistreLocalStorage, id)
                confirmPopup();
                console.log("apres fonction avant ");

                // cas ou pas de produit
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