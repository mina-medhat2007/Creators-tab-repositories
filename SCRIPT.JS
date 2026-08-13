// 1. تحديد العناصر من صفحة الـ HTML
const images = document.querySelectorAll('.zoomable-img');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

// 2. وظيفة فتح النافذة المكبرة عند الضغط على صورة
function openModal(index) {
    currentIndex = index;
    modal.style.display = "flex";
    modalImg.src = images[currentIndex].src;
}

// 3. وظيفة إغلاق النافذة
function closeModal() {
    modal.style.display = "none";
}

// 4. الانتقال للصورة التالية
function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
}

// 5. الانتقال للصورة السابقة
function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
}

// 6. ربط كل صورة بحدث الضغط عليها
images.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
});

// 7. تشغيل أزرار الشاشة (إغلاق / التالي / السابق)
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (nextBtn) nextBtn.addEventListener('click', showNext);
if (prevBtn) prevBtn.addEventListener('click', showPrev);

// 8. إغلاق النافذة لو ضغطت في أي مكان فاضي بره الصورة
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// 9. اختصارات لوحة المفاتيح (الكيبورد)
document.addEventListener('keydown', (e) => {
    if (modal && modal.style.display === "flex") {
        if (e.key === "ArrowRight") showNext(); // السهم الأيمن
        if (e.key === "ArrowLeft") showPrev();  // السهم الأيسر
        if (e.key === "Escape") closeModal();   // زر Esc للإغلاق
    }
});