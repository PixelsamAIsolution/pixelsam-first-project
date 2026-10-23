document.addEventListener('DOMContentLoaded',function(){
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.primary-nav');
  const navLinks=nav ? nav.querySelectorAll('a') : [];
  
  // Mobile menu toggle with smooth animation
  if(toggle){
    toggle.addEventListener('click',()=>{
      nav.classList.toggle('active');
      const isOpen=nav.classList.contains('active');
      toggle.setAttribute('aria-expanded',isOpen);
    });
    
    // Close menu when link clicked
    navLinks.forEach(link=>{
      link.addEventListener('click',()=>{
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded','false');
      });
    });
  }

  // Highlight active nav based on pathname
  const items=document.querySelectorAll('.primary-nav a');
  items.forEach(a=>{
    try{
      const url=new URL(a.href);
      const pathname=location.pathname;
      const urlPath=url.pathname;
      
      if(urlPath===pathname||(urlPath==='/'&&pathname==='/')||(urlPath==='/'&&pathname.includes('index.html'))){
        a.parentElement.classList.add('active');
      }
    }catch(e){}
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',function(e){
      const href=this.getAttribute('href');
      if(href&&href!=='#'){
        e.preventDefault();
        const target=document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth'});
        }
      }
    });
  });

  // Contact form handler with validation
  const form=document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      
      const name=form.name.value.trim();
      const phone=form.phone.value.trim();
      const email=form.email.value.trim();
      
      if(!name||!phone||!email){
        alert('Please fill in all required fields.');
        return;
      }
      
      const data={
        name:name,
        phone:phone,
        email:email,
        location:form.location.value.trim(),
        type:form.type.value,
        message:form.message.value.trim(),
        time:new Date().toISOString()
      };
      
      const saved=JSON.parse(localStorage.getItem('dotsolar_contacts')||'[]');
      saved.push(data);
      localStorage.setItem('dotsolar_contacts',JSON.stringify(saved));
      
      alert('Thank you! Your request has been saved. We\'ll contact you shortly.');
      form.reset();
    });
  }
  
  // Fade in elements on scroll
  const observerOptions={
    threshold:0.1,
    rootMargin:'0px 0px -50px 0px'
  };
  
  const observer=new IntersectionObserver(function(entries){
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity='1';
        entry.target.style.transform='translateY(0)';
      }
    });
  },observerOptions);
  
  // Apply fade-in to cards
  document.querySelectorAll('.card,.project-card,.benefits li').forEach(el=>{
    el.style.opacity='0';
    el.style.transform='translateY(10px)';
    el.style.transition='opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
