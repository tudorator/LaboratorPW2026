const liItems = document.querySelectorAll('#education ol li');
const educatieArray = Array.from(liItems).map(li => li.textContent.trim());

console.log('Ex. 1 - Array educatie:');
console.log(educatieArray);

const filtrulBrasov = educatieArray.filter(item => item.includes('Brasov'));
console.log('Ex. 2 - Filtru Brasov:');
console.log(filtrulBrasov);

const filtrul2024 = educatieArray.filter(item => item.includes('2024'));
console.log('Ex. 2 - Filtru 2024:');
console.log(filtrul2024);

const primulCuvant = educatieArray.map(item => item.split('.')[0].trim());
console.log('Ex. 3 - Primul cuvant:');
console.log(primulCuvant);

const totalAni= educatieArray.reduce((total, item) => {
    const ani = item.match(/\d{4}/g);
    if (ani && ani.length === 2) {
        const durata = parseInt(ani[1]) - parseInt(ani[0]);
        return total + durata;
    }
    return total;
}, 0);
console.log(`Ex. 4 - Total ani de studiu: ${totalAni}`);

const proiecte =[
    {name: 'LaboratorPW2026', tech: 'HTML, CSS, JavaScript', done: false},
    {name: 'CoolGame', tech: 'C#, .NET', done: false},
    {name: 'SplatScape', tech: 'Python, C, React, JavaScript', done: true},
    {name: 'CS2 interactive menu for teaching how to throw grenades', tech: 'C#, .NET', done: true},
];

function afiseazaProiecte(lista) {
    const sectiune = document.getElementById('projects');
    if (!sectiune) return;
    const listaHTML = lista.map(p => `
        <li>
            <strong>${p.name}</strong> — ${p.tech}
            — ${p.done ? 'Finalizat' : 'In progres'}
        </li>
    `).join('');

    const finalizate  = lista.filter(p => p.done).length;

    sectiune.innerHTML = ` 
        <h2>Proiecte</h2>
        <ul>${listaHTML}</ul>
        <p> Finalizate: ${finalizate} din ${lista.length}</p>
    `;       
}

afiseazaProiecte(proiecte);

async function incarcaProiecte() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        afiseazaProiecte(data);
    } catch (err) {
        console.error('Eroare la incarcarea proiectelor:', err);
    
    }
}

incarcaProiecte();