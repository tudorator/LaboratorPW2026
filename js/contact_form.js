function submitForm(){
    const nume = document.getElementById("nume").value;
    const email= document.getElementById("email").value;
    const mesaj= document.getElementById("mesaj").value;
    console.log(nume, email, mesaj);
    console.warn("Goodbye world!");
}
function salutPersonalizat() {
    const ora = new Date().getHours();
    const p = document.getElementById('salut');
    if (!p) return;
 
    if (ora >= 6 && ora < 12) {
        p.textContent = 'Bună dimineața! Bine ai venit pe pagina mea.';
    } else if (ora >= 12 && ora < 18) {
        p.textContent = 'Bună ziua! Bine ai venit pe pagina mea.';
    } else {
        p.textContent = 'Bună seara! Bine ai venit pe pagina mea.';
    }
}
salutPersonalizat();
const form = document.querySelector('form');
if (form){
    form.addEventListener('submit', function(event) {
        event.preventDefault();
         
        const nume = document.getElementById("nume").value.trim();
        const email = document.getElementById("email").value.trim();
        const mesaj = document.getElementById("mesaj").value.trim();
        const feedback = document.getElementById("form-feedback");

        if(nume.legth < 2){
            feedback.textContent = "Eroare: Numele trebuie să aiba cel putin 2 caractere.";
            feedback.style.color = "red";
            return;
        }

        if(!email.includes("@") || !email.includes(".")){
            feedback.textContent = "Eroare: Adresa de email nu este validă.";
            feedback.style.color = "red";
            return;
        }
        
        if(mesaj.length < 10){
            feedback.textContent = "Eroare: Mesajul trebuie să aiba cel putin 10 caractere.";
            feedback.style.color = "red";
            return;
        }

        feedback.textContent = "Multumesc ${nume}, mesajul tau a fost trimis cu succes!";
        feedback.style.color = "green";
        form.reset();
    });
}
const darkBtn = document.getElementById('dark-mode-btn');
if (darkBtn) {
    darkBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            darkBtn.textContent = 'Light Mode';
        } else {
            darkBtn.textContent = 'Dark Mode';
        }
    });
}