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

let currentSlide = 0;
let cart = [];

const productsGrid =
  document.getElementById("productsGrid");

function renderProduct() {

  const product = products[0];

  productsGrid.innerHTML = `
    <article class="product-card">

      <div class="slider">

        <button
          class="slide-btn prev"
          onclick="changeSlide(-1)">
          ❮
        </button>

        <img
          id="productSlide"
          src="${product.images[0]}"
          alt="${product.name}"
        >

        <button
          class="slide-btn next"
          onclick="changeSlide(1)">
          ❯
        </button>

        <div class="slide-counter">
          <span id="slideNumber">1</span>
          /
          ${product.images.length}
        </div>

      </div>


      <div class="product-info">

        <h3>${product.name}</h3>

        <p>پارچه: ${product.fabric}</p>

        <p>${product.size}</p>

        <p>${product.colors}</p>

        <strong class="product-price">
          ${product.price.toLocaleString("fa-IR")}
          تومان
        </strong>

        <p>${product.description}</p>

        <button
          class="btn primary"
          onclick="addToCart(${product.id})">
          افزودن به سبد خرید
        </button>

      </div>

    </article>
  `;
}


function changeSlide(direction) {

  const product = products[0];

  currentSlide += direction;

  if (currentSlide >= product.images.length) {
    currentSlide = 0;
  }

  if (currentSlide < 0) {
    currentSlide =
      product.images.length - 1;
  }

  document.getElementById("productSlide").src =
    product.images[currentSlide];

  document.getElementById("slideNumber").textContent =
    currentSlide + 1;
}


function addToCart(id) {

  const product =
    products.find(item => item.id === id);

  if (!product) return;

  cart.push(product);

  const count =
    document.getElementById("cartCount");

  if (count) {
    count.textContent =
      cart.length.toLocaleString("fa-IR");
  }
}


const year =
  document.getElementById("year");

if (year) {
  year.textContent =
    new Date().getFullYear();
}

renderProduct();
