const products = [
  { id: 1, name: "شومیز سفید", price: 518000 },
  { id: 2, name: "شومیز آبی", price: 518000 },
  { id: 3, name: "شومیز لیمویی", price: 518000 }
];

let cart = [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    document.getElementById("cartCount").textContent = cart.length;
    alert(product.name + " به سبد خرید اضافه شد");
  }
}

document.getElementById("year").textContent =
  new Date().getFullYear();
