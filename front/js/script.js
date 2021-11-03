main(); /* appel de la fonction main pour lancer le script */

function main() {
	/* création de la fonction main */
	getProducts(); /* appel de la fonction getProducts */
}



function afficherProduit(div, product) {
	/* création de la fonction afficherProduit avec 2 arguments */

	/* html qui est ajouté avec le = et les backquotes afin d'utilier les
	parties de l'object product invoqué en argument
	on utilise la fonction sur un div et on edite le div en ajoutant du innerHtml*/

	// pour product.id il manquait le _ !!!!

	// <h4> Couleurs: <br> ${product.colors[0]} <br>  ${product.colors[1]} <br> ${product.colors[2]}</h4>


	div.innerHTML = div.innerHTML + `<a href="./product.html?id=${product._id}">
	<article>
	  <img src="${product.imageUrl}" alt="${product.altTxt}">
	  <h3 class="productName">${product.name}</h3>
	  <p class="productDescription">${product.description}</p>
	  <h3> ${(product.price).toString()} €</h3>
	</article>
  </a>`
}


// Fonction pour obtenir les informations des produits depuis l'API
function getProducts() {
	fetch("http://localhost:3000/api/products") /* on fetch l'api avec son adress et la méthode fetch */
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
			////   console.log(articles);

			articles.forEach(product => {
				afficherProduit(document.getElementById('items'), product) /* on affiche le product */
				/* en séléctionnant à l'aide de l'ID de l'élément */
				//// console.log(product._id);

			})

		});

};