const products = [
  {
    id: 1,
    name: "شومیز جلو گره کادنزا",
    price: 518000,
    fabric: "کادنزا",
    size: "قواره ریز",
    colors: "۷ رنگ",
    image: "IMG_20260827_110741_965.jpg"
  }
];

let cart = [];

const productsGrid = document.getElementById("productsGrid");

if (productsGrid) {
  productsGrid.innerHTML = `
    <article class="product-card">
      <img
        src="${products[0].image}"
        alt="${products[0].name}"
        style="width:100%;border-radius:16px;"
      >

      <div class="product-info">
        <h3>${products[0].name}</h3>
        <p>پارچه: ${products[0].fabric}</p>
        <p>${products[0].size}</p>
        <p>${products[0].colors}</p>
        <h3>${products[0].price.toLocaleString("fa-IR")} تومان</h3>
        <p>قیمت عالی، اقتصادی و استثنایی</p>

        <button class="btn primary" onclick="addToCart(1)">
          افزودن به سبد خرید
        </button>
      </div>
    </article>
  `;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (product) {
    cart.push(product);

    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
      cartCount.textContent = cart.length;
    }

    alert("محصول به سبد خرید اضافه شد");
  }
}

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
