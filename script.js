const cart = [];
const drawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

function euro(n){ return n.toLocaleString('fr-FR',{style:'currency',currency:'EUR'}); }

function openCart(){
  drawer.classList.add('open');
  overlay.classList.add('show');
  drawer.setAttribute('aria-hidden','false');
}
function closeCart(){
  drawer.classList.remove('open');
  overlay.classList.remove('show');
  drawer.setAttribute('aria-hidden','true');
}

function renderCart(){
  cartCount.textContent = cart.length;
  const total = cart.reduce((s,p)=>s+p.price,0);
  cartTotal.textContent = euro(total);
  if(!cart.length){
    cartItems.innerHTML = '<p class="empty">Ton panier est vide.</p>';
    return;
  }
  cartItems.innerHTML = cart.map((p,i)=>`
    <div class="cart-item">
      <div><strong>${p.name}</strong><small>${euro(p.price)}</small></div>
      <button class="remove" data-index="${i}">Retirer</button>
    </div>
  `).join('');
  document.querySelectorAll('.remove').forEach(btn=>{
    btn.addEventListener('click',()=>{ cart.splice(Number(btn.dataset.index),1); renderCart(); });
  });
}

document.querySelectorAll('.add-cart').forEach(btn=>{
  btn.addEventListener('click',()=>{
    cart.push({name:btn.dataset.name,price:Number(btn.dataset.price)});
    renderCart(); openCart();
  });
});

document.getElementById('cartButton').addEventListener('click',openCart);
document.getElementById('closeCart').addEventListener('click',closeCart);
overlay.addEventListener('click',closeCart);

document.querySelectorAll('.filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card=>{
      card.style.display = (f==='all'||card.dataset.category===f)?'block':'none';
    });
  });
});

document.getElementById('checkoutBtn').addEventListener('click', () => {

  if (!cart.length) {
    alert('Ton panier est vide.');
    return;
  }

  window.location.href = "https://buy.stripe.com/test_aFa14gc1X03H2tveAM3Nm00";

});

const infoButtons = document.querySelectorAll('.info-btn');

infoButtons.forEach((button) => {

  button.addEventListener('click', (event) => {

    event.stopPropagation();

    const card = button.closest('.product-card');
    const popup = card.querySelector('.product-popup');

    document.querySelectorAll('.product-popup.open').forEach((openPopup) => {
      if (openPopup !== popup) {
        openPopup.classList.remove('open');
        openPopup.setAttribute('aria-hidden', 'true');
      }
    });

    const isOpen = popup.classList.contains('open');

    if (isOpen) {
      popup.classList.remove('open');
      popup.setAttribute('aria-hidden', 'true');
    } else {
      popup.classList.add('open');
      popup.setAttribute('aria-hidden', 'false');
    }

  });

});


document.querySelectorAll('.popup-close').forEach((button) => {

  button.addEventListener('click', (event) => {

    event.stopPropagation();

    const popup = button.closest('.product-popup');

    popup.classList.remove('open');
    popup.setAttribute('aria-hidden', 'true');

  });

});


document.addEventListener('click', (event) => {

  if (
    !event.target.closest('.product-popup') &&
    !event.target.closest('.info-btn')
  ) {

    document.querySelectorAll('.product-popup.open').forEach((popup) => {

      popup.classList.remove('open');
      popup.setAttribute('aria-hidden', 'true');

    });

  }

});
const SUPABASE_URL = "https://inbtiyojhlojtshbwqne.supabase.co";
const SUPABASE_KEY = "sb_publishable_UDb6bCqHo5bhYtEeR1os1A_iRSGsAVM";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);