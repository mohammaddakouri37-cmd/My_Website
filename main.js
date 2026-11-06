// ===== دليل الفعاليات - الجامعة الافتراضية السورية =====
// ملف جافاسكريبت الرئيسي main.js

document.addEventListener("DOMContentLoaded", function () {
    // 1. فلترة الفعاليات بالبحث السريع (في الصفحات التي تحتوي على حقل البحث)
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const query = this.value.trim().toLowerCase();
            const cards = document.querySelectorAll(".event-card");
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(query) ? "block" : "none";
            });
        });
    }

    // 2. التحكم في زر الصعود للأعلى (Scroll to Top)
    const scrollBtn = document.getElementById("scrollTop");
    if (scrollBtn) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 280) {
                scrollBtn.style.display = "block";
            } else {
                scrollBtn.style.display = "none";
            }
        });

        scrollBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

// 3. التحقق من نموذج "اتصل بنا" وإظهار تنبيهات Bootstrap التفاعلية
function validateForm() {
    const nameInput    = document.getElementById("name");
    const emailInput   = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const msgDiv       = document.getElementById("msg");

    const name    = nameInput ? nameInput.value.trim() : "";
    const email   = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    // إخفاء رسائل الخطأ السابقة
    const errorIds = ["nameErr", "emailErr", "msgErr"];
    errorIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    let isValid = true;

    // التحقق من الاسم
    if (!name) {
        const nameErr = document.getElementById("nameErr");
        if (nameErr) nameErr.style.display = "block";
        isValid = false;
    }

    // التحقق من البريد الإلكتروني
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        const emailErr = document.getElementById("emailErr");
        if (emailErr) emailErr.style.display = "block";
        isValid = false;
    }

    // التحقق من نص الرسالة
    if (!message) {
        const msgErr = document.getElementById("msgErr");
        if (msgErr) msgErr.style.display = "block";
        isValid = false;
    }

    // عرض النتيجة
    if (msgDiv) {
        if (isValid) {
            msgDiv.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
                    <i class="bi bi-check-circle-fill me-2 fs-5 align-middle"></i>
                    <strong>تم الإرسال بنجاح!</strong> شكرًا لتواصلك معنا، سيقوم فريق الدليل بالرد عليك في أقرب وقت.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            const contactForm = document.getElementById("contactForm");
            if (contactForm) contactForm.reset();
        } else {
            msgDiv.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show shadow-sm" role="alert">
                    <i class="bi bi-exclamation-triangle-fill me-2 fs-5 align-middle"></i>
                    <strong>تنبيه:</strong> يرجى تصحيح الحقول المحددة باللون الأحمر قبل إرسال النموذج.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
        }
    }

    window.scrollTo({ top: 120, behavior: "smooth" });
    return false;
}
