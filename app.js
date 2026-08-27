// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXaVq_c8oY8p8nLCe8e-LOZDr",
  authDomain: "galleryojani.firebaseapp.com",
  projectId: "galleryojani",
  storageBucket: "galleryojani.firebasestorage.app",
  messagingSenderId: "832359324955",
  appId: "1:832359324955:web:f4b9c1cff41db73c16c7be",
  measurementId: "G-57N46F2QTZ"
};

// اتصال به Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let products = [];
let currentSlide = 0;
let cart = [];

// دریافت محصولات از Firestore
async function loadProducts() {
  try {
    const snapshot = await db.collection("products").get();

    products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("Products loaded:", products);

    renderProduct();

  } catch (error) {
    console.error("Error loading products:", error);

    const grid = document.getElementById("productsGrid");

    if (grid) {
      grid.innerHTML =
        "<p>خطا در دریافت محصولات از فروشگاه</p>";
    }
  }
}


// نمایش محصول
function renderProduct() {

  const productsGrid =
    document.getElementById("productsGrid");

  if (!productsGrid) return;

  if (products.length === 0) {

    productsGrid.innerHTML =
      "<p>هنوز محصولی ثبت نشده است.</p>";

    return;
  }

  const product = products[0];

  const image =
    product.Image ||
    product.image ||
    "";

  const name =
    product.name ||
    "محصول";

  const price =
    Number(product.Price || product.price || 0);


  productsGrid.innerHTML = `

    <article class="product-card">

      <div class="slider">

        <img
          id="productSlide"
          src="${image}"
          alt="${name}"
        >

      </div>


      <div class="product-info">

        <h3>${name}</h3>

        <strong class="product-price">
          ${price.toLocaleString("fa-IR")}
          تومان
        </strong>

        <button
          class="btn primary"
          onclick="addToCart('${product.id}')"
        >
          افزودن به
