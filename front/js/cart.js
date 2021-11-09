let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit")); /* creer objet js */

/* creer une liste d'ids avec chaque champ puis mapper sur cette liste avec nos 2 fonctions pour cacher les messages */
/* au chargement de la page. */
messageList = ["#firstName", "#lastName", "#address", "#city", "#email"]
messageList.map(msg => document.querySelector(`${msg}ErrorMsg`).style.display = 'none');
messageList.map(msg => document.querySelector(`${msg}CheckMsg`).style.display = 'none');

/* ******************************AFFICHAGE PANIER DEBUT****************************** */
function afficherPanier() {
  const contenuPanier = document.querySelector("#cart__items")

  /* cas ou le panier est vide */
  if (produitEnregistreLocalStorage === null || produitEnregistreLocalStorage == 0) {
    document.querySelector("#panierVide").style.display = 'flex';

  } else {
    document.querySelector("#panierVide").style.display = 'none';
    let productsInCart = [];
    for (k = 0; k < produitEnregistreLocalStorage.length; k++) {

      productsInCart = productsInCart + `
        <article class="cart__item" data-id="107fb5b75607497b96722bda5b504926">
                <div class="cart__item__img">
                  <img src=${produitEnregistreLocalStorage[k].photoCanapé} alt="${produitEnregistreLocalStorage[k].altTextCanapé}">
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
}

afficherPanier()
/* ******************************AFFICHAGE PANIER FIN****************************** */

/* ******************************BOUTON SUPPRIMER DEBUT****************************** */
// selection bouton supprimer avec la classe deleteItem

/* selectionner boutons supprimer */
let bouton_supprimer = document.querySelectorAll(".deleteItem");

/* boucle qui parcourt le pannier */
for (let indexPanier = 0; indexPanier < bouton_supprimer.length; indexPanier++) {

  bouton_supprimer[indexPanier].addEventListener("click", (event) => {
    event.preventDefault();

    /* selectionner l'id du produit a supprimer avec le clic bouton */
    let couleurASupprimer = produitEnregistreLocalStorage[indexPanier].couleurProduit;
    let idàSupprimer = produitEnregistreLocalStorage[indexPanier].idproduit;

    /* utilisation de la méthode filter inversée*/
    /* on ne garde que les éléments qui ne remplissent pas les conditions */
    produitEnregistreLocalStorage = produitEnregistreLocalStorage.filter(el => el.idproduit !== idàSupprimer || el.couleurProduit !== couleurASupprimer);

    /* envoyer la variable dans le local Storage */
    localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage));


    /* si le produitLocalStorage est vide alors autant le supprimer */
    if (localStorage.getItem('produit') == "[]" || produitEnregistreLocalStorage == "[]" || produitEnregistreLocalStorage.length == 0) {
      localStorage.removeItem('produit');
    }
    window.location.href = "cart.html";
  });
}

/* ******************************BOUTON SUPPRIMER FIN****************************** */

/* ******************************BOUTON VIDER LE PANIER DEBUT****************************** */
function viderPanier() {
  /* selection du bouton */
  const boutonSupprimer = document.querySelector("#viderLePanier");
  boutonSupprimer.addEventListener("click", (event) => {
    event.preventDefault();

    /* vider le local storage */
    localStorage.removeItem('produit');
    window.location.href = "cart.html"; /* recharger la page */

  });
}

viderPanier();

/* ******************************BOUTON VIDER LE PANIER FIN****************************** */

/* ******************************CALCULER LA SOMME TOTALE DES QUANTITES DEBUT****************************** */

let totalQuantité = []; /* declarer un array vide */
/* retrouver la valeur dans le local storage */

for (let indexSommeQuantité = 0; indexSommeQuantité < produitEnregistreLocalStorage.length; indexSommeQuantité++) {
  /* boucle qui parcourt localstorage */
  let quantiteUnCanapé = produitEnregistreLocalStorage[indexSommeQuantité].quantiteProduit; /* declarer variable de quantité */
  totalQuantité.push(quantiteUnCanapé); /* pousser variable du prix a la fin de l'array totalQuantité */
}

/* faire la somme des quantités */
const reduireQuantité = (AccQuantité, ValeurCourrQuantité) => AccQuantité + ValeurCourrQuantité;
const QuantitéSommePannier = totalQuantité.reduce(reduireQuantité, 0);

/* afficher la somme des quantités dans cart.html */
const quantitéHtml = document.querySelector("#totalQuantity")
quantitéHtml.textContent = QuantitéSommePannier;
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
const PrixSommePannier = totalPanier.reduce(reduire, 0);

/* afficher la somme dans cart.html */
const prixHtml = document.querySelector("#totalPrice")
prixHtml.textContent = `${((PrixSommePannier)).toString()}`;

/* ******************************CALCULER LA SOMME TOTALE DES PRIX FIN****************************** */



/* ******************************MODIFIER LA QUANTITE DANS LE PANIER DEBUT****************************** */

function modifierquantitéPanier() {
  let qantitéAModifierChamp = document.querySelectorAll(".itemQuantity");

  for (let canapéCompteurChamp = 0; canapéCompteurChamp < qantitéAModifierChamp.length; canapéCompteurChamp++) {
    qantitéAModifierChamp[canapéCompteurChamp].addEventListener("change", (event) => {
      event.preventDefault();

      let quantityModif = produitEnregistreLocalStorage[canapéCompteurChamp].quantiteProduit;
      let valeurQuantitéModif = parseInt(qantitéAModifierChamp[canapéCompteurChamp].value);

      /* fonction pour trouver un element dans le localstorage */
      function trouverLocal(canape) {
        return produitEnregistreLocalStorage.find(canape);
      }
      const resultFind = trouverLocal(
        /* fonction pour determiner si la valeur du localstorage est égale à la valeur du champ */
        function verifierEgalite(canapéLocal) {
          if (canapéLocal.valeurQuantitéModif !== quantityModif) {
            return canapéLocal;
          }
        });


      resultFind.quantiteProduit = valeurQuantitéModif;
      produitEnregistreLocalStorage[canapéCompteurChamp].quantiteProduit = resultFind.quantiteProduit;

      localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage));

      // refresh rapide
      location.reload();
    })
  }
}
modifierquantitéPanier();

/* ******************************MODIFIER LA QUANTITE DANS LE PANIER FIN****************************** */

/* ****************************************VALIDER LE FORMULAIRE DEBUT******************************************************* */

/* validate forms inside the input */
const form = document.querySelector(".cart__order__form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");

firstName.addEventListener("input", (event) => {
  let firstNameValue = firstName.value;
  if (!firstNameValue || !(/^[A-Za-z]{2,20}$/.test(firstNameValue))) {
    document.querySelector("#firstNameErrorMsg").style.display = 'flex';
    document.querySelector("#firstNameCheckMsg").style.display = 'none';

  } else {
    document.querySelector("#firstNameCheckMsg").style.display = 'flex';
    document.querySelector("#firstNameErrorMsg").style.display = 'none';

  }
});
lastName.addEventListener("input", (event) => {
  let lastNameValue = lastName.value;
  if (!lastNameValue || !(/^[A-Za-z]{2,20}$/.test(lastNameValue))) {
    document.querySelector("#lastNameErrorMsg").style.display = 'flex';
    document.querySelector("#lastNameCheckMsg").style.display = 'none';

  } else {
    document.querySelector("#lastNameCheckMsg").style.display = 'flex';
    document.querySelector("#lastNameErrorMsg").style.display = 'none';

  }
});
address.addEventListener("input", (event) => {
  let adressValue = address.value;
  if (!adressValue || !(/^[A-Za-z]{2,20}$/.test(adressValue))) {
    document.querySelector("#addressErrorMsg").style.display = 'flex';
    document.querySelector("#addressCheckMsg").style.display = 'none';

  } else {
    document.querySelector("#addressCheckMsg").style.display = 'flex';
    document.querySelector("#addressErrorMsg").style.display = 'none';

  }
});
city.addEventListener("input", (event) => {
  let cityValue = city.value;
  if (!cityValue || !(/^[A-Za-z]{2,20}$/.test(cityValue))) {
    document.querySelector("#cityErrorMsg").style.display = 'flex';
    document.querySelector("#cityCheckMsg").style.display = 'none';

  } else {
    document.querySelector("#cityCheckMsg").style.display = 'flex';
    document.querySelector("#cityErrorMsg").style.display = 'none';

  }
});
email.addEventListener("input", (event) => {
  let emailValue = email.value;

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
  /* mettre l'objet contact dans le localStorage */
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value
  }

  localStorage.setItem("contact", JSON.stringify(contact));

  function PosterInfos() {
    let listeIdsConfirmations = [];
    /* pousser les ids à la fin de l'array*/
    for (let indexCanap = 0; indexCanap < produitEnregistreLocalStorage.length; indexCanap++) {
      listeIdsConfirmations.push(produitEnregistreLocalStorage[indexCanap].idproduit)
    }

    localStorage.setItem("listeIdsConfirmations", JSON.stringify(listeIdsConfirmations)); /* insérer les ids dan le localstorage */

    const order = {
      contact: {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
      },

      products: listeIdsConfirmations,
      /* objet products qui contient les ids des canapés */
    }

    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json"
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data : ");
        // console.log(data);
        localStorage.setItem("orderId", data.orderId);
        /* verification de l'existence de l'id */
        if (localStorage.orderId !== null && localStorage.orderId !== undefined) {
          document.location.href = "confirmation.html"; /* aller a la page confirmation */
        }
      })
      .catch((erreur) => {
        alert(erreur);
      });

  }

  PosterInfos();
});
/* ******************************COMMANDE FIN****************************** */

/* ******************************LOCAL STORAGE ET FORMULAIRE DEBUT****************************** */

/* Contenu du localstorage dans les champs du formulaire pour que les champs restent remplis si on retourne a index.html */
const sauvegardeLocalStorage = localStorage.getItem("contact");
const objetSauvegardeLocalStorage = JSON.parse(sauvegardeLocalStorage);

/* remplir les champs avec les infos du localstorage si elles existent */
function fillInputLocalStorage(input) {
  document.querySelector(`#${input}`).value = objetSauvegardeLocalStorage[input];
  /* Ceci est une fonction pour trouver automatiquement la valeur de l'input dans le local storage puis le reassigner dans le champ */
}

let listeChamps = ["firstName", "lastName", "address", "city", "email"] /* on crée un une liste de champs */

/* ici on utilise une boucle forEach pour ne pas avoir a répéter l'appel de la fonction 5 fois */
listeChamps.forEach(champ => {
  /* appliquer la fonction à la liste */
  fillInputLocalStorage(champ)
});

/* ******************************LOCAL STORAGE ET FORMULAIRE FIN****************************** */