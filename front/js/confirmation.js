idLocal = localStorage.getItem("orderId"); /* obtenir l'order id */
document.querySelector("#orderId").textContent = idLocal; /* afficher l'order id */
localStorage.removeItem("orderId"); /*  on retire l'order id pour qu'elle ne soit pas stockée */