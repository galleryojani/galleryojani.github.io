const products = [
  {
    id: 1,
    name: "شومیز جلو گره کادنزا",
    price: 518000,
    fabric: "کادنزا",
    size: "قواره ریز",
    colors: "۷ رنگ",
    description: "قیمت عالی، اقتصادی و استثنایی",
    images: [
      "IMG_20260827_110741_965.jpg",
      "IMG_20260827_110741_127.jpg",
      "IMG_20260827_110741_937.jpg"
    ]
  }
];

let cart = [];

const productsGrid = document.getElementById("productsGrid");

function renderProducts() {
  if (!productsGrid) return;

  productsGrid.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-images">
        ${product.images.map((image, index) => `
          <img
            src="${image}"
            alt="${product.name} ${index + 1}"
            loading="lazy"
          >
        `).join("")}
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>

        <p>پارچه: ${product.fabric}</p>
        <p>${product.size}</p>
        <p>${product.colors}</p>

        <strong class="product-price">
          ${product.price.toLocaleString("fa-IR")} تومان
        </strong>

        <p>${product.description}</p>

        <button class="btn primary"
                onclick="addToCart(${product.id})">
          افزودن به سبد خرید
        </button>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (product) {
    cart.push(product);

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
      cartCount.textContent = cart.length;
    }

    alert(product.name + " به سبد خرید اضافه شد");
  }
}

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

renderProducts();
