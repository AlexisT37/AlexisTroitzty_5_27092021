let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit")); /* creer objet js */
console.log(produitEnregistreLocalStorage);

titreCanapCart = document.querySelector(".cart__item__content__titlePrice h2");
console.log(titreCanapCart);
titreCanapCart.textContent = 'Coucou'

prixCanapCart = document.querySelector(".cart__item__content__titlePrice p")
console.log(prixCanapCart);
prixCanapCart.textContent = "39 €";

imageCanapCart = document.querySelector(".cart__item__img img");
console.log(imageCanapCart);
imageCanapCart.setAttribute("src", "")