const order = {
    contact: {
        firstName: "testAlex",
        lastName: "testFamille",
        city: "testVille",
        address: "testRue",
        email: "hero@hotmail.com",
    },
    product: ["107fb5b75607497b96722bda5b504926"]
};


/* options pour le fetch */
const options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
        "Content-Type": "application/json"
    },
};

fetch("http://localhost:3000/api/products/order", options)
    .then((res) => res.json())
    .then((data) => {
        localStorage.clear();
        console.log(data);
        localStorage.setItem("orderId", "test");
        localStorage.setItem("total", "7777 ");

    })

    .catch((err) => {
        alert("Erreur : " + err);
    });