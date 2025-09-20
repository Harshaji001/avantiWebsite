// Basic page interactions: mobile nav, modal, form handling, sliders
document.addEventListener('DOMContentLoaded', function () {
    // year
    document.getElementById('year').textContent = new Date().getFullYear();
  
    // mobile nav
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = '';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
      }
    });
  
    // enroll modal open/close
    const openEnroll = document.getElementById('openEnroll');
    const openEnroll2 = document.getElementById('openEnroll2');
    const openEnrollBtn = document.getElementById('openEnroll2') || document.getElementById('openEnroll');
    const enrollModal = document.getElementById('enrollModal');
    const closeModal = document.getElementById('closeModal');
  
    function showModal(){
      enrollModal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }
    function hideModal(){
      enrollModal.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }
  
    [openEnroll, openEnroll2].forEach(btn=>{ if (btn) btn.addEventListener('click', showModal); });
    if (closeModal) closeModal.addEventListener('click', hideModal);
    enrollModal.addEventListener('click', (e)=>{ if (e.target === enrollModal) hideModal(); });
  
    // testimonial auto-scroll
    const tSlider = document.getElementById('testimonialSlider');
    if (tSlider){
      let tPos = 0;
      setInterval(()=> {
        if (!tSlider) return;
        tPos += 320;
        if (tPos > tSlider.scrollWidth - tSlider.clientWidth) tPos = 0;
        tSlider.scrollTo({left: tPos, behavior:'smooth'});
      }, 4500);
    }
  
    // results slider auto-scroll
    const rSlider = document.getElementById('resultsSlider');
    if (rSlider){
      let rPos = 0;
      setInterval(()=> {
        rPos += 240;
        if (rPos > rSlider.scrollWidth - rSlider.clientWidth) rPos = 0;
        rSlider.scrollTo({left: rPos, behavior:'smooth'});
      }, 3800);
    }
  
    // contact form submit — example front-end handler
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm){
      enquiryForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const form = e.target;
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
        // Basic validation
        if (!data.name || !data.phone) {
          alert('Please provide name and phone number.');
          return;
        }
        // Show user feedback
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        try {
          // Replace this with your real endpoint
          const res = await fetch(form.action, {
            method: form.method || 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
          });
          if (res.ok) {
            alert('Thank you! We will contact you shortly.');
            form.reset();
          } else {
            console.warn('Server responded with', res.status);
            alert('Thank you! We received your request. (Demo endpoint)');
            form.reset();
          }
        } catch (err){
          console.error(err);
          alert('Request queued. Please contact us on WhatsApp if urgent.');
        } finally {
          btn.textContent = original;
          btn.disabled = false;
        }
      });
    }
  
    // modal form handler same as enquiry
    const modalForm = document.getElementById('modalForm');
    if (modalForm){
      modalForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        // simple feedback
        alert('Thanks! Demo request sent. We will contact you.');
        hideModal();
        e.target.reset();
      });
    }
  });
  