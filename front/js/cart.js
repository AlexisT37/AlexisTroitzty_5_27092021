let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit")); /* creer objet js */
// !console.log(produitEnregistreLocalStorage);

document.querySelector("#firstNameErrorMsg").style.display = 'none';
document.querySelector("#firstNameCheckMsg").style.display = 'none';
document.querySelector("#lastNameErrorMsg").style.display = 'none';
document.querySelector("#lastNameCheckMsg").style.display = 'none';
document.querySelector("#addressErrorMsg").style.display = 'none';
document.querySelector("#addressCheckMsg").style.display = 'none';
document.querySelector("#cityErrorMsg").style.display = 'none';
document.querySelector("#cityCheckMsg").style.display = 'none';
document.querySelector("#emailErrorMsg").style.display = 'none';
document.querySelector("#emailCheckMsg").style.display = 'none';

/* cas ou le panier est vide */

/* ******************************AFFICHAGE PANIER DEBUT****************************** */

const contenuPanier = document.querySelector("#cart__items")
//! console.log(contenuPanier);


if (produitEnregistreLocalStorage === null || produitEnregistreLocalStorage == 0) {
  //! console.log("Je suis vide");
  document.querySelector("#panierVide").style.display = 'flex';

} else {
  //! console.log("je suis rempli");
  document.querySelector("#panierVide").style.display = 'none';
  let productsInCart = [];
  for (k = 0; k < produitEnregistreLocalStorage.length; k++) {

    productsInCart = productsInCart + `
        <article class="cart__item" data-id="107fb5b75607497b96722bda5b504926">
                <div class="cart__item__img">
                  <img src="http://localhost:3000/images/kanap01.jpeg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${produitEnregistreLocalStorage[k].titreCanapé}</h2>
                    <p>Couleur : ${produitEnregistreLocalStorage[k].couleurProduit}</p>
                    <p> ${((produitEnregistreLocalStorage[k].prixProduit) * produitEnregistreLocalStorage[k].quantiteProduit).toString()} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitEnregistreLocalStorage[k].quantiteProduit}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `;

  }

  if (k == produitEnregistreLocalStorage.length) {
    contenuPanier.innerHTML = productsInCart;
  }
}

/* ******************************AFFICHAGE PANIER FIN****************************** */

/* ******************************BOUTON SUPPRIMER DEBUT****************************** */
// selection bouton supprimer avec la classe deleteItem

/* selectionner boutons supprimer */
let bouton_supprimer = document.querySelectorAll(".deleteItem");
// !console.log(bouton_supprimer);

/* boucle qui parcourt le panner */
for (let indexPanier = 0; indexPanier < bouton_supprimer.length; indexPanier++) {

  bouton_supprimer[indexPanier].addEventListener("click", (event) => {
    event.preventDefault();

    /* selectionner l'id du produit a supprimer avec le clic bouton */
    let idàSupprimer = produitEnregistreLocalStorage[indexPanier].idproduit;
    // !console.log("idàSupprimer");
    // !console.log(idàSupprimer);

    /* utilisation de la méthode filter inversée, cad inverse de on garde que l'élément séléctionné */
    produitEnregistreLocalStorage = produitEnregistreLocalStorage.filter(el => el.idproduit !== idàSupprimer);
    console.log(produitEnregistreLocalStorage);

    /* envoyer la variable dans le local Storage */
    localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage));

    /* alerte pour recharger la page */
    alert("Ce produit a été supprimé")
    window.location.href = "cart.html";

  });

}

/* ******************************BOUTON SUPPRIMER FIN****************************** */


/* ******************************BOUTON VIDER LE PANIER DEBUT****************************** */
/* selection du bouton */
const boutonSupprimer = document.querySelector("#viderLePanier");
boutonSupprimer.addEventListener("click", (event) => {
  event.preventDefault();

  /* vider le local storage */
  localStorage.clear(); /* methode clear pour vider le panier */
  window.location.href = "cart.html"; /* recharger la page */

});

/* ******************************BOUTON VIDER LE PANIER FIN****************************** */

/* ******************************CALCULER LA SOMME TOTALE DES QUANTITES DEBUT****************************** */


let totalQuantité = []; /* declarer un array vide */
console.log("totalQuantité : " + totalQuantité);

/* retrouver la valeur dans le local storage */
for (let indexSommeQuantité = 0; indexSommeQuantité < produitEnregistreLocalStorage.length; indexSommeQuantité++) {
  /* boucle qui parcourt localstorage */
  let quantiteUnCanapé = produitEnregistreLocalStorage[indexSommeQuantité].quantiteProduit; /* declarer variable de quantité */
  totalQuantité.push(quantiteUnCanapé); /* pousser variable du prix a la fin de l'array totalQuantité */
}


/* faire la somme des quantités */
const reduireQuantité = (AccQuantité, ValeurCourrQuantité) => AccQuantité + ValeurCourrQuantité;
const QuantitéSommePannier = totalQuantité.reduce(reduireQuantité, 0);

console.log("reduireQuantité : " + reduireQuantité);
console.log("QuantitéSommePannier : " + QuantitéSommePannier);

/* afficher la somme des quantités dans cart.html */
const quantitéHtml = document.querySelector("#totalQuantity")
quantitéHtml.textContent = QuantitéSommePannier;

console.log("quantitéHtml : " + quantitéHtml);




/* ******************************CALCULER LA SOMME TOTALE DES QUANTITES FIN****************************** */


/* ******************************CALCULER LA SOMME TOTALE DES PRIX DEBUT****************************** */
/* variable pour total */
let totalPanier = []; /* declarer un array vide */
for (let indexSommePannier = 0; indexSommePannier < produitEnregistreLocalStorage.length; indexSommePannier++) {
  /* boucle qui parcourt localstorage */
  // let prixProdPanier = produitEnregistreLocalStorage[indexSommePannier].prixProduit; /* declarer variable du prix */
  let prixProdPanier = (produitEnregistreLocalStorage[indexSommePannier].prixProduit) * produitEnregistreLocalStorage[indexSommePannier].quantiteProduit; /* declarer variable du prix */
  totalPanier.push(prixProdPanier); /* pousser variable du prix a la fin de l'array totalPanier */
}


/* faire la somme des prix */
const reduire = (accumulateur, valeurCourrante) => accumulateur + valeurCourrante;
console.log("reduire : " + reduire);
const PrixSommePannier = totalPanier.reduce(reduire, 0);
console.log("PrixSommePannier : " + PrixSommePannier);

// !console.log(PrixSommePannier);
// !console.log(totalPanier);


/* afficher la somme dans cart.html */
const prixHtml = document.querySelector("#totalPrice")
prixHtml.textContent = `${((PrixSommePannier)).toString()}`;


/* ******************************CALCULER LA SOMME TOTALE DES PRIX FIN****************************** */



/* ******************************MODIFIER LA QUANTITE DANS LE PANIER DEBUT****************************** */

const editionQuantitePanier = document.querySelector(".itemQuantity")
console.log('editionQuantitePanier');
console.log(editionQuantitePanier);

console.log('editionQuantitePanierValue');
console.log(editionQuantitePanier.value);



editionQuantitePanier.addEventListener("change", (event) => {
  // console.log(editionQuantitePanier.value);

  const nouvelleQuantité = editionQuantitePanier.value;

  ////let quantiteUnCanapé = produitEnregistreLocalStorage[indexSommeQuantité].quantiteProduit; /* declarer variable de quantité */

  produitEnregistreLocalStorage[0].quantiteProduit = nouvelleQuantité;
  console.log("quantite panier inner html");
  console.log(editionQuantitePanier.closest("cart__item__content").innerHTML);
});

/* ******************************MODIFIER LA QUANTITE DANS LE PANIER FIN****************************** */

/* ******************************AJOUTER L'IMAGE DES CANAPES DANS LE PANIER****************************** */



// function trouverImage(idCanap) {
//   function getUnProduitPourImage(idCanap) {
//     fetch(`http://localhost:3000/api/products/${idCanap}`) /* on fetch l'api avec son adress et la méthode fetch */
// .then(function (res) {
//     /* on utilise le then qui fait que si on a une fonction avec un res alors on va */
//     return res.json(); /* retourner le json du res */
//   })

//   .catch((error) => {
//     /* si on a une erreur, alors on affiche un message */
//     console.log("Impossible d'accéder aux canapés, vérifiez le serveur.")
//   })

//   .then(resultatAPI => {
//     /* si on a le resultat correct par l'API alors */
//     const articles = resultatAPI; /* on initialise une constante dont la valeur est le résultat de l'API*/
//     let canap_image = document.querySelector(".cart__item .cart__item__img"); /* on isole l'image dans le html il y en a plusieurs */
//     canap_name.textContent = `${articles.name}` /* modifier le titre du canapé */
//   });

// };
// }
// for (let indexProduit = 0; indexProduit < produitEnregistreLocalStorage.length; indexProduit++) {


// }
// console.log(articles.imageUrl);



/* ******************************MODIFIER LA QUANTITE DANS LE PANIER FIN****************************** */


/* ******************************COMMANDE DEBUT****************************** */

/* verifier les imput des cinq champs avec des if statements */
document.querySelector("#firstNameErrorMsg").style.display = 'none';
document.querySelector("#firstNameCheckMsg").style.display = 'none';
document.querySelector("#lastNameErrorMsg").style.display = 'none';
document.querySelector("#lastNameCheckMsg").style.display = 'none';
document.querySelector("#addressErrorMsg").style.display = 'none';
document.querySelector("#addressCheckMsg").style.display = 'none';
document.querySelector("#cityErrorMsg").style.display = 'none';
document.querySelector("#cityCheckMsg").style.display = 'none';
document.querySelector("#emailErrorMsg").style.display = 'none';
document.querySelector("#emailCheckMsg").style.display = 'none';




/* ****************************************VALIDER LE FORMULAIRE DEBUT******************************************************* */

/* validate forms inside the input */
const form = document.querySelector(".cart__order__form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");

firstName.addEventListener("input", (event) => {
  var firstNameValue = firstName.value;
  if (!firstNameValue || !(/^[A-Za-z]{2,20}$/.test(firstNameValue))) {
    document.querySelector("#firstNameErrorMsg").style.display = 'flex';
    document.querySelector("#firstNameCheckMsg").style.display = 'none';

  } else {
    document.querySelector("#firstNameCheckMsg").style.display = 'flex';
    document.querySelector("#firstNameErrorMsg").style.display = 'none';

  }
});
lastName.addEventListener("input", (event) => {
  var lastNameValue = lastName.value;
  if (!lastNameValue || !(/^[A-Za-z]{2,20}$/.test(lastNameValue))) {
    document.querySelector("#lastNameErrorMsg").style.display = 'flex';
    document.querySelector("#lastNameCheckMsg").style.display = 'none';

  } else {
    document.querySelector("#lastNameCheckMsg").style.display = 'flex';
    document.querySelector("#lastNameErrorMsg").style.display = 'none';

  }
});
address.addEventListener("input", (event) => {
  var adressValue = address.value;
  if (!adressValue || !(/^[A-Za-z]{2,20}$/.test(adressValue))) {
    document.querySelector("#addressErrorMsg").style.display = 'flex';
    document.querySelector("#addressCheckMsg").style.display = 'none';

  } else {
    document.querySelector("#addressCheckMsg").style.display = 'flex';
    document.querySelector("#addressErrorMsg").style.display = 'none';

  }
});
city.addEventListener("input", (event) => {
  var cityValue = city.value;
  if (!cityValue || !(/^[A-Za-z]{2,20}$/.test(cityValue))) {
    document.querySelector("#cityErrorMsg").style.display = 'flex';
    document.querySelector("#cityCheckMsg").style.display = 'none';

  } else {
    document.querySelector("#cityCheckMsg").style.display = 'flex';
    document.querySelector("#cityErrorMsg").style.display = 'none';

  }
});
email.addEventListener("input", (event) => {
  var emailValue = email.value;

  //// console.log(emailValue);
  //// console.log(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue));
  if (!emailValue || !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue))) {
    document.querySelector("#emailErrorMsg").style.display = 'flex';
    document.querySelector("#emailCheckMsg").style.display = 'none';

  } else {
    document.querySelector("#emailCheckMsg").style.display = 'flex';
    document.querySelector("#emailErrorMsg").style.display = 'none';
  }
});

/* ****************************************VALIDER LE FORMULAIRE FIN******************************************************* */


/* envoyer les informations */
const commandeCart = document.querySelector("#order");

commandeCart.addEventListener("click", (event) => {
  event.preventDefault();

  function faireObjetcontact() {
    const contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value
    }

    // console.log("contact");
    // console.log(contact);

    /* mettre l'objet contact dans le localStorage */
    localStorage.setItem("contact", JSON.stringify(contact));

    /* constituer le paquet à envoyer au serveur */

    const infosAenvoyer = {
      produitEnregistreLocalStorage,
      contact
    }

    // console.log("infosAenvoyer");
    // console.log(infosAenvoyer);
  }

  if (!document.querySelector("#firstName").value) {
    alert("Entrez un prénom avant de valider")

    ////console.log(document.querySelector("#firstName").value);
  } else if (!document.querySelector("#lastName").value) {
    alert("Entrez un nom de famille avant de valider")


  } else if (!document.querySelector("#address").value) {
    alert("Entrez une adresse avant de valider")


  } else if (!document.querySelector("#city").value) {
    alert("Entrez un nom de ville avant de valider")


  } else if (!document.querySelector("#email").value) {
    alert("Entrez une adresse email avant de valider")


  } else {
    faireObjetcontact();
    /* Passer a la confirmation */
    window.location.href = "confirmation.html";
    console.log("hello mouchi");
    console.table(produitEnregistreLocalStorage);
  }





});
/* ******************************COMMANDE FIN****************************** */

/* ******************************LOCAL STORAGE ET FORMULAIRE DEBUT****************************** */


/* Contenu du localstorage dans les champs du formulaire pour que les champs restent remplis si on retourne a index.html */
const sauvegardeLocalStorage = localStorage.getItem("contact");
const objetSauvegardeLocalStorage = JSON.parse(sauvegardeLocalStorage);

console.log("sauvegardeLocalStorage");
console.log(sauvegardeLocalStorage);

console.log("objetSauvegardeLocalStorage");
console.log(objetSauvegardeLocalStorage);


/* remplir les champs avec les infos du localstorage si elles existent */
function fillInputLocalStorage(input) {
  document.querySelector(`#${input}`).value = objetSauvegardeLocalStorage[input];
  /* Ceci est une fonction pour trouver automatiquement la valeur de l'input dans le local storage puis le reassigner dans le champ */
}


let listeChamps = ["firstName", "lastName", "address", "city", "email"]

/* ici on utilise une boucle forEach pour ne pas avoir a répéter l'appel de la fonction 5 fois */
listeChamps.forEach(champ => {
  fillInputLocalStorage(champ)
});


/* ******************************LOCAL STORAGE ET FORMULAIRE FIN****************************** */