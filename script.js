const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => menu.classList.toggle('show'));
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
    menu.classList.remove('show');
  });
});