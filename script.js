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

document.getElementById('checkoutBtn').addEventListener('click',()=>{
  if(!cart.length){ alert('Ton panier est vide.'); return; }
  alert('Mode démo : connecte Stripe ou Shopify pour activer le paiement réel.');
});
