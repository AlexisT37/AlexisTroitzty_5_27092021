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
// !console.log(ajoutPanier);

/* event listener pour l'ajout au panier */
ajoutPanier.addEventListener("click", (event) => {


    /* empecher comportement defaut bouton */

    const formulaire = document.querySelector("#colors"); /* selection liste couleurs */
    // //console.log(formulaire);
    const couleurValue = formulaire.value; /* valeur de la couleur (ici par defaut) */
    // //console.log(couleurValue);

    const titreProduct = document.querySelector("#title")
    const titreProductContent = titreProduct.innerHTML;
    // //console.log(proprietesProduit);

    // gestion de la quantité de produit
    const quantiteProduitString = (document.querySelector("#quantity")).value;
    // !//console.log(quantiteProduitString);
    // !//console.log(typeof quantiteProduitString);

    const quantiteProduitInt = parseInt(quantiteProduitString);
    // !//console.log(quantiteProduitInt);
    // //  console.log(typeof quantiteProduitInt);

    /* fonction pour confirmer le choix avec une fenêtre pop up */
    const confirmPopup = () => {
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
            console.log("C'est le bon format de prix");
            confirmPopup();
        } else {
            alert("Rentrez un nombre correct s'il vous plait")
            event.preventDefault();
        }
    }

    //// console.log(id);
    prixProduit = document.querySelector("#price").textContent; /* séléctionner id pour prix */
    // //console.log(prixProduit);
    /*--- CREATION OBJET a envoyer au serveur plus tard */

    ////console.log("quantiteProduitInt");
    ////console.log(quantiteProduitInt);

    let proprietesProduit = {
        /* creer objet js avec 4 propriétés */
        couleurProduit: couleurValue,
        prixProduit: (parseInt((document.querySelector("#price").textContent))),
        quantiteProduit: quantiteProduitInt,
        idproduit: id,
        titreCanapé: titreProductContent

    };
    // //console.log(proprietesProduit);
    // //TODO verifier la couleur
    // /* fonction pour verifier s'il s'agit d'un produit de même couleur */
    // function verifierCouleur(produitEnregistreLocalStorage, canapTest) {
    //     for (let canapCompteur = 0; canapCompteur < produitEnregistreLocalStorage.length; canapCompteur++) {
    //         if (canapTest.id === produitEnregistreLocalStorage.id && canapTest.color === produitEnregistreLocalStorage.id) {
    //             produitEnregistreLocalStorage.quantiteProduit += canapTest.quantiteProduit;
    //         } else {
    //             return canapTest
    //         }
    //     }
    // }

    /*-------------------- SECTION LOCAL STORAGE------------- */

    //// console.log(localStorage.getItem("produit"));
    //// console.log(typeof localStorage.getItem("produit"));
    let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit")); /* creer objet js */
    //// console.log(produitEnregistreLocalStorage);

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
        //// console.log("on a un truc dans le storage"); /* afficher message validation */
        //// produitEnregistreLocalStorage.push(proprietesProduit); /* mettre les propriétés à la fin de l'array */
        //// localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage)); /*convertir l'objet js en JSON */
        //// console.log(produitEnregistreLocalStorage);
        addProduitLocalStorage();


        //* cas ou pas de produit
    } else {
        produitEnregistreLocalStorage = []; /* comme il n'y a pas d'array on le crée */
        //// console.log(produitEnregistreLocalStorage);
        //// produitEnregistreLocalStorage.push(proprietesProduit); /* mettre les propriétés à la fin de l'array */
        //// localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage)); /*convertirjs en JSON */
        //// console.log(produitEnregistreLocalStorage);
        addProduitLocalStorage();
    }



});