console.log("JS berhasil terhubung!"); //pengecekan

// 1. Efek Navbar saat Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)'; // Lebih gelap saat scroll
        navbar.style.padding = '10px 0'; // Navbar jadi lebih ramping
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = 'none';
    }
});

// 2. Smooth Scroll untuk Link Menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 3. Efek Muncul saat Scroll (Scroll Reveal)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Daftarkan semua section agar punya efek muncul
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});


// HERO (HOME)
//Fungsi untuk Typing Effect
const textElement = document.getElementById("typing-text");
const message = "Informatics student passionate about web development";
let index = 0;

function typeEffect() {
    if (index < message.length) {
        textElement.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeEffect, 80); // Kecepatan ngetik (50ms)
    }
}

// Jalankan fungsi saat halaman selesai dimuat
window.addEventListener('load', typeEffect);


// Fungsi untuk memantau kapan elemen masuk ke layar
const observeAbout = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Jika elemen terlihat, tambahkan gaya muncul
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 }); // Muncul kalau sudah 20% terlihat

// Ambil semua elemen teks di dalam about-text
const aboutElements = document.querySelectorAll('.about-text h2, .about-text p');

aboutElements.forEach((el, index) => {
    // 1. Set gaya awal lewat JS (transparan & agak ke bawah)
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    
    // 2. Kasih delay/jeda antar elemen (0s, 0.2s, 0.4s) biar munculnya gantian
    el.style.transitionDelay = `${index * 0.2}s`;
    
    // 3. Masukkan ke dalam "pengintai" (observer)
    observeAbout.observe(el);
});


const counters = document.querySelectorAll('.counter');
const speed = 300; // Semakin besar angka, semakin lambat hitungannya

const startCounter = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Hitung kecepatan pertambahan
                const inc = target / speed;

                if (count < target) {
                    // Tambahkan angka dan bulatkan ke atas
                    counter.innerText = Math.ceil(count + inc);
                    // Panggil lagi fungsi ini setiap 10ms
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + "+"; // Tambahkan tanda + di akhir
                }
            };
            updateCount();
            // Berhenti mengamati kalau sudah selesai animasi sekali
            observer.unobserve(counter);
        }
    });
};

const counterObserver = new IntersectionObserver(startCounter, {
    threshold: 1.0 // Mulai hitung kalau kotak angkanya sudah terlihat sepenuhnya
});

counters.forEach(counter => counterObserver.observe(counter));


// efek isi otomatis
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItem = entry.target;
            const percent = skillItem.getAttribute('data-percent');
            const progressBar = skillItem.querySelector('.progress-line span');
            
            // Gerakkan bar sesuai persentase
            progressBar.style.width = percent + "%";
            
            // Efek tambahan: Skill item sedikit bergeser ke kanan
            skillItem.style.transform = "translateX(0)";
            skillItem.style.opacity = "1";
            
            skillObserver.unobserve(skillItem); // Cukup sekali animasi
        }
    });
}, { threshold: 0.5 });

// Ambil semua item skill
const allSkills = document.querySelectorAll('.skill-item');
allSkills.forEach(skill => {
    // Set awal: transparan dan agak ke kiri
    skill.style.opacity = "0";
    skill.style.transform = "translateX(-20px)";
    skill.style.transition = "all 0.6s ease";
    
    skillObserver.observe(skill);
});


//FOOTER
const footer = document.querySelector('.footer');
if (footer) {
    footer.style.opacity = '0';
    footer.style.transition = 'opacity 1s ease';
    
    const footerObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            footer.style.opacity = '1';
        }
    }, { threshold: 0.1 });
    
    footerObserver.observe(footer);
}