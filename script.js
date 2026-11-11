/* ===== CONFIG — REPLACE PLACEHOLDERS BEFORE DEPLOYING ===== */
const CONFIG = {
  name: "The Guccha Momo & Cafe",
  whatsapp: "9779840700700",            // PLACEHOLDER: country code + number, no "+" or spaces. Confirm this number has WhatsApp.
  phone: "+977 984-0700700",            // From Google Maps listing
  email: "hello@example.com",           // PLACEHOLDER: replace
  address: "Pyapal, Kathmandu, Bagmati Province 44600",
  hoursShort: "Open daily · closes 9 PM",   // CONFIRM opening time & days
  hoursLong: "Daily until 9 PM (confirm opening time)",
  facebook: "https://www.facebook.com/",    // PLACEHOLDER: replace with the real page URL
  currency: "Rs",
  // Menu: SAMPLE items/prices — replace. img is optional (file in assets/).
  menu: [
    {cat:"Momo", name:"Steamed Momo", desc:"Bite-sized dumplings, served with our signature achar.", price:150, img:"momo-plates.jpg", tag:"Signature"},
    {cat:"Momo", name:"Achar Momo", desc:"Momos tossed in a tangy, spiced achar sauce.", price:180, img:"hero-momo.jpg"},
    {cat:"Sides", name:"Fokso Fry", desc:"Crisp, spiced skewers with chutney. Perfect beside the dumplings.", price:200, img:"fry.jpg", tag:"Local favourite"},
    {cat:"Drinks", name:"Coca-Cola", desc:"Ice-cold glass bottle.", price:60},
    {cat:"Drinks", name:"Hot Tea / Coffee", desc:"From the cafe counter.", price:50}
  ]
};
/* ===== END CONFIG ===== */
document.documentElement.classList.add("js");
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const C=CONFIG,wa=`https://wa.me/${C.whatsapp}`;

$$("[data-cfg]").forEach(e=>e.textContent=C[e.dataset.cfg]);
$$("[data-cfg-wa]").forEach(e=>e.href=wa+"?text="+encodeURIComponent("Hello! I have a question."));
$$("[data-cfg-tel]").forEach(e=>{e.href="tel:"+C.phone.replace(/[^\d+]/g,"");e.textContent=C.phone});
$$("[data-cfg-mail]").forEach(e=>{e.href="mailto:"+C.email;e.textContent=C.email});
$$("[data-cfg-fb]").forEach(e=>e.href=C.facebook);
const q=encodeURIComponent("Guccha Momo and Cafe, "+C.address);
$$("[data-cfg-dir]").forEach(e=>e.href="https://www.google.com/maps/search/?api=1&query="+q);
$("#map").src="https://www.google.com/maps?q="+q+"&output=embed";
$("#yr").textContent=new Date().getFullYear();

// Nav
const burger=$(".burger"),links=$("#links");
burger.onclick=()=>burger.setAttribute("aria-expanded",links.classList.toggle("open"));
$$("#links a").forEach(a=>a.onclick=()=>{links.classList.remove("open");burger.setAttribute("aria-expanded",false)});
const secs=$$("main section[id]");
addEventListener("scroll",()=>{
  const y=scrollY+120;let cur="home";secs.forEach(s=>{if(s.offsetTop<=y)cur=s.id});
  $$("#links a:not(.btn)").forEach(a=>a.classList.toggle("act",a.hash==="#"+cur));
  $("#top").classList.toggle("show",scrollY>700);
},{passive:true});
$("#top").onclick=()=>scrollTo({top:0});

// Menu
const cats=["All",...new Set(C.menu.map(m=>m.cat))],tabs=$("#tabs"),grid=$("#menuGrid");
function renderMenu(cat){
  grid.innerHTML=C.menu.filter(m=>cat==="All"||m.cat===cat).map(m=>`<article class="item">${m.img?`<img loading="lazy" src="assets/${m.img}" alt="${m.name}" width="110" height="110">`:""}<div><h3><span>${m.name}${m.tag?`<span class="tag">${m.tag}</span>`:""}</span><span class="price">${C.currency} ${m.price}</span></h3><p>${m.desc}</p></div></article>`).join("");
  $$("button",tabs).forEach(b=>b.setAttribute("aria-selected",b.textContent===cat));
}
tabs.innerHTML=cats.map(c=>`<button role="tab">${c}</button>`).join("");
$$("button",tabs).forEach(b=>b.onclick=()=>renderMenu(b.textContent));
renderMenu("All");

// Gallery + lightbox
const photos=[["storefront.jpg","The brick storefront beside the square"],["momo-plates.jpg","Steamed momos and momos in sauce on a rooftop table"],["interior.jpg","Inside the cafe counter"],["hero-momo.jpg","Momos with a view of old Kathmandu"],["night-stall.jpg","The neon Guccha Momo sign at night"],["fry.jpg","Fokso fry with chutney"]];
const lb=$("#lb"),lbi=$("img",lb);
$("#gal").innerHTML=photos.map(([f,a])=>`<button aria-label="Enlarge: ${a}"><img loading="lazy" src="assets/${f}" alt="${a}" width="400" height="400"></button>`).join("");
$$("#gal button").forEach((b,i)=>b.onclick=()=>{lbi.src="assets/"+photos[i][0];lbi.alt=photos[i][1];lb.showModal()});
$("#lbx").onclick=()=>lb.close();lb.onclick=e=>{if(e.target===lb)lb.close()};

// Reservation → WhatsApp
const form=$("#form");$("[name=date]").min=new Date().toISOString().slice(0,10);
form.onsubmit=e=>{
  e.preventDefault();const d=Object.fromEntries(new FormData(form)),err=$("#err");
  if(!d.name.trim()||!/^[+\d][\d\s-]{6,}$/.test(d.phone.trim())||!d.date||!d.time||+d.guests<1){err.textContent="Please complete name, a valid phone, date, time and guests.";return}
  err.textContent="";
  const msg=`Hello ${C.name}! I'd like to request a table:\n\nName: ${d.name}\nPhone: ${d.phone}\nDate: ${d.date}\nTime: ${d.time}\nGuests: ${d.guests}${d.notes.trim()?"\nRequests: "+d.notes:""}\n\nPlease confirm availability. Thank you!`;
  const w=open(wa+"?text="+encodeURIComponent(msg),"_blank","noopener");
  if(!w)err.innerHTML=`Couldn't open WhatsApp. <a style="color:#fff" href="${wa}?text=${encodeURIComponent(msg)}">Tap here to send it</a>.`;
};

// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.15});
$$(".rv").forEach(e=>io.observe(e));
