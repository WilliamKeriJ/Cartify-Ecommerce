import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import './style.css';
const products=[
{id:1,name:'Wireless Headphones',category:'Electronics',price:2499,emoji:'🎧',desc:'Comfortable wireless sound for everyday listening.'},
{id:2,name:'Smart Watch',category:'Electronics',price:3299,emoji:'⌚',desc:'A smart companion for your everyday routine.'},
{id:3,name:'Classic Backpack',category:'Fashion',price:1299,emoji:'🎒',desc:'A versatile backpack for college and travel.'},
{id:4,name:'Running Shoes',category:'Fashion',price:2199,emoji:'👟',desc:'Lightweight shoes for everyday movement.'},
{id:5,name:'Desk Lamp',category:'Home',price:899,emoji:'💡',desc:'Simple lighting for your study space.'},
{id:6,name:'Coffee Mug',category:'Home',price:399,emoji:'☕',desc:'A ceramic mug for your favourite drink.'},
{id:7,name:'Mechanical Keyboard',category:'Electronics',price:2799,emoji:'⌨️',desc:'Responsive keys for work and play.'},
{id:8,name:'Sunglasses',category:'Fashion',price:799,emoji:'🕶️',desc:'A classic style for sunny days.'}
];
function App(){
 const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem('cartify-cart')||'[]'));
 const [search,setSearch]=useState('');const [category,setCategory]=useState('All');
 const persist=(next)=>{setCart(next);localStorage.setItem('cartify-cart',JSON.stringify(next));};
 const add=(p)=>{let next=[...cart];const i=next.findIndex(x=>x.id===p.id);if(i>=0)next[i].qty++;else next.push({...p,qty:1});persist(next);};
 const change=(id,d)=>persist(cart.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty+d)}:x));
 const remove=(id)=>persist(cart.filter(x=>x.id!==id));
 const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 const filtered=products.filter(p=>(category==='All'||p.category===category)&&p.name.toLowerCase().includes(search.toLowerCase()));
 return <><header><Link className="logo" to="/">🛍️ Cartify</Link><nav><Link to="/">Home</Link><Link to="/cart">Cart <span className="count">{cart.reduce((s,x)=>s+x.qty,0)}</span></Link></nav></header>
 <Routes><Route path="/" element={<><section className="hero"><div><h1>Find your everyday favourites.</h1><p>Shop smart. Discover more. Welcome to Cartify.</p><a href="#products" className="cta">Explore Products</a></div><div className="hero-art">🛍️</div></section><main id="products"><div className="heading"><h2>Featured Products</h2><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..."/></div><div className="filters">{['All','Electronics','Fashion','Home'].map(c=><button className={category===c?'active':''} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div><div className="products">{filtered.map(p=><article className="product" key={p.id}><div className="emoji">{p.emoji}</div><span className="tag">{p.category}</span><h3>{p.name}</h3><p>{p.desc}</p><div className="product-bottom"><b>₹{p.price.toLocaleString('en-IN')}</b><button onClick={()=>add(p)}>Add to Cart</button></div></article>)}</div>{filtered.length===0&&<p>No products found.</p>}</main></>}/>
 <Route path="/cart" element={<main className="cart-page"><h2>Your Shopping Cart</h2>{cart.length===0?<div className="empty"><p>Your cart is empty.</p><Link className="cta" to="/">Browse products</Link></div>:<><div className="cart-list">{cart.map(x=><article className="cart-item" key={x.id}><div className="cart-emoji">{x.emoji}</div><div className="cart-info"><h3>{x.name}</h3><p>₹{x.price.toLocaleString('en-IN')}</p><div className="qty"><button onClick={()=>change(x.id,-1)}>−</button><span>{x.qty}</span><button onClick={()=>change(x.id,1)}>+</button></div></div><button className="remove" onClick={()=>remove(x.id)}>Remove</button></article>)}</div><div className="summary"><h3>Order Summary</h3><div><span>Subtotal</span><b>₹{total.toLocaleString('en-IN')}</b></div><div><span>Shipping</span><span>Free</span></div><div className="total"><span>Total</span><b>₹{total.toLocaleString('en-IN')}</b></div><button className="checkout" onClick={()=>{alert('Demo checkout: order placed successfully!');persist([]);}}>Proceed to Checkout</button><p className="note">Demo checkout only. No real payment is collected.</p></div></>}</main>}/><Route path="*" element={<main><h2>Page not found</h2><Link to="/">Return home</Link></main>}/></Routes>
 <footer><strong>Cartify</strong><p>A React frontend ecommerce demo project.</p><small>© 2026 Cartify. Student project demo.</small></footer></>;
}
createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
