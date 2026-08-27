const firebaseConfig = {
  apiKey: "AIzaSyAXaVq_c8oY8p8nLCe8e-LOZDr",
  authDomain: "galleryojani.firebaseapp.com",
  projectId: "galleryojani",
  storageBucket: "galleryojani.firebasestorage.app",
  messagingSenderId: "832359324955",
  appId: "1:832359324955:web:f4b9c1cff41db73c16c7be",
  measurementId: "G-57N46F2QTZ"
};

let products = [];
let cart = [];
let currentSlide = 0;

const productsGrid = document.getElementById("productsGrid");

/* نمایش محصول */
function renderProduct() {
  if (!productsGrid) return;

  if (products.length === 0) {
    productsGrid.innerHTML = `
      <p style="text-align:center">
        هنوز محصولی ثبت نشده است.
      </p>
    `;
    return;
  }

  const product = products[0];

  const name = product.name || "محصول";

  const price = Number(
    product.Price ??
    product.price ??
    0
  );

  /*
    اگر در Firebase فیلد images داشته باشیم،
    چند عکس نمایش داده می‌شود.
    اگر فقط Image داشته باشیم، همان یک عکس استفاده می‌شود.
  */
  let images = [];

  if (Array.isArray(product.images)) {
    images = product.images;
  } else if (product.Image) {
    images = [product.Image];
  } else if (product.image) {
    images = [product.image];
  }

  if (images.length === 0) {
    images = [""];
  }

  currentSlide = 0;

  productsGrid.innerHTML = `
    <article class="product-card">

      <div class="slider">

        <button
          type="button"
          class="slide-btn prev"
          id="prevSlide"
          aria-label="عکس قبلی"
        >
          ❮
        </button>

        <img
          id="productSlide"
          src="${images[0]}"
          alt="${name}"
        >

        <button
          type="button"
          class="slide-btn next"
          id="nextSlide"
          aria-label="عکس بعدی"
        >
          ❯
        </button>

        <div class="slide-counter">
          <span id="slideNumber">1</span>
          /
          <span>${images.length}</span>
        </div>

      </div>

      <div class="product-info">

        <h3>${name}</h3>

        ${
          product.fabric
            ? `<p>پارچه: ${product.fabric}</p>`
            : ""
        }

        ${
          product.size
            ? `<p>${product.size}</p>`
            : ""
        }

        ${
          product.colors
            ? `<p>${product.colors}</p>`
            : ""
        }

        <strong class="product-price">
          ${price.toLocaleString("fa-IR")} تومان
        </strong>

        ${
          product.description
            ? `<p>${product.description}</p>`
            : ""
        }

        <button
          type="button"
          class="btn primary"
          id="addToCartButton"
        >
          افزودن به سبد خرید
        </button>

      </div>

    </article>
  `;

  const productSlide =
    document.getElementById("productSlide");

  const slideNumber =
    document.getElementById("slideNumber");

  function showSlide(index) {
    if (!images.length) return;

    currentSlide =
      (index + images.length) % images.length;

    productSlide.src =
      images[currentSlide];

    slideNumber.textContent =
      (currentSlide + 1).toLocaleString("fa-IR");
  }

  document
    .getElementById("prevSlide")
    ?.addEventListener("click", () => {
      showSlide(currentSlide - 1);
    });

  document
    .getElementById("nextSlide")
    ?.addEventListener("click", () => {
      showSlide(currentSlide + 1);
    });

  document
    .getElementById("addToCartButton")
    ?.addEventListener("click", () => {
      cart.push(product);

      const cartCount =
        document.getElementById("cartCount");

      if (cartCount) {
        cartCount.textContent =
          cart.length.toLocaleString("fa-IR");
      }
    });

  /* کشیدن عکس با انگشت */
  let touchStartX = 0;

  productSlide.addEventListener(
    "touchstart",
    event => {
      touchStartX =
        event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  productSlide.addEventListener(
    "touchend",
    event => {
      const touchEndX =
        event.changedTouches[0].screenX;

      const difference =
        touchEndX - touchStartX;

      if (Math.abs(difference) < 40) {
        return;
      }

      if (difference < 0) {
        showSlide(currentSlide + 1);
      } else {
        showSlide(currentSlide - 1);
      }
    },
    { passive: true }
  );
}


/* اتصال به Firestore */
async function startFirebase() {
  try {
    const firebaseApp =
      await import(
        "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js"
      );

    const firestore =
      await import(
        "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js"
      );

    const app =
      firebaseApp.initializeApp(firebaseConfig);

    const db =
      firestore.getFirestore(app);

    const productsCollection =
      firestore.collection(db, "products");

    const snapshot =
      await firestore.getDocs(productsCollection);

    products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    renderProduct();

  } catch (error) {
    console.error(error);

    if (productsGrid) {
      productsGrid.innerHTML = `
        <p style="text-align:center">
          خطا در دریافت محصولات فروشگاه
        </p>
      `;
    }
  }
}


/* سال فوتر */
const year =
  document.getElementById("year");

if (year) {
  year.textContent =
    new Date().getFullYear();
}


/* شروع سایت */
startFirebase();
