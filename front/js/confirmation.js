main();

function main() {

    let paramsOrder = new URL(document.location).searchParams; /* search params pour récupérer l'id */
    let idOrder = paramsOrder.get("id"); /* trouver id de la commande */
    //// console.log("id : ");
    //// console.log(idOrder);


    document.querySelector("#orderId").textContent = idOrder; /* afficher l'order id */
    localStorage.removeItem('produit'); /* on vide le local storage */
}