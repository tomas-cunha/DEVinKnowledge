let idHidden = document.getElementById('hidden');
let titulo = document.getElementById('title');
let linguagem = document.getElementById('language');
let categoria = document.getElementById('category');
let descricao = document.getElementById('description');
let video = document.getElementById('video');
const form = document.getElementById('form');
const salvar = document.getElementById('salvar');
const limpar = document.getElementById('limpar');

let numTotal = document.getElementById('num-total');
let numFront = document.getElementById('num-front');
let numBack = document.getElementById('num-back');
let numFull = document.getElementById('num-full');
let numSoft = document.getElementById('num-soft')

let searchContent = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const deleteButton = document.getElementById('delete-button')


const listaCard = document.getElementById('card-list');

function saveLocal(titulo, linguagem, categoria, descricao, video) {
    let conhecimento = JSON.parse(localStorage.getItem('conhecimento') || '[]');

    conhecimento.push({
        id: new Date().getTime(),
        titulo,
        linguagem,
        categoria,
        descricao,
        video
    });

    localStorage.setItem('conhecimento', JSON.stringify(conhecimento));
}

function mudaCat(obj) {

    return {
        FRONT_END: 'Front End',
        BACK_END: 'Back End',
        FULL_STACK: 'Full Stack',
        SOFT_SKILLS: 'SoftSkills',
    }[obj.categoria];
}

function verificaVideo(obj) {
    let display = ''
    if (obj.video == false) {
        display = "none";
    }
    return display;
}

function criaCard(arr) {

    arr.forEach((obj) => {
        let item = document.createElement('li');
        let card = document.createElement('article');
        card.classList.add('card');
        listaCard.appendChild(item);
        item.appendChild(card);
        card.innerHTML = `<article>
                        <header>
                             <h2>${obj.titulo}</h2>
                        </header>
                        <div class="card-type">
                            <p><span>Linguagem/Skill: </span>${obj.linguagem}</p>
                            <p><span>Categoria: </span>${mudaCat(obj)}</p>
                        </div>
                        <p class="card-description">${obj.descricao}</p>
                        <div class="card-buttons-wrapper">
                            <button class="card-button" id="deleta-card" onclick="deleteDica(${obj.id})"><img src="./Assets/trash.png" alt="delete icon"
                                    width="25px"></button>
                            <button class="card-button" id="edita-card" onclick="editDica(${obj.id})"><img src="./Assets/edit.png" alt="edit icon"
                                    width="25px"></button>
                            <a href=${obj.video} target="_blank" class="card-button" id="video" style="display:${verificaVideo(obj)} "><img src="./Assets/video.png" alt="video icon"
                                    width="25px"></a>
                        </div>
                     </article>`});
    calculoDicas();

}

function rendercard() {

    let lastItem = JSON.parse(localStorage.getItem('conhecimento')).slice(-1);

    console.log(lastItem)
    criaCard(lastItem);

}

function clearInput() {
    idHidden.value = '';
    titulo.value = '';
    linguagem.value = '';
    categoria.value = '';
    descricao.value = '';
    video.value = '';
}

function calculoDicas() {
    let array = JSON.parse(localStorage.getItem('conhecimento'));

    numTotal.innerText = array.length;
    numFront.innerText = array.filter((obj) => obj.categoria == 'FRONT_END').length;
    numBack.innerText = array.filter((obj) => obj.categoria == 'BACK_END').length;
    numFull.innerText = array.filter((obj) => obj.categoria == 'FULL_STACK').length;
    numSoft.innerText = array.filter((obj) => obj.categoria == 'SOFT_SKILLS').length;

}


function alertaSucesso() {
    window.alert('Dica cadastrada com sucesso!');
}

function alertaDeletado() {
    window.alert('Dica deletada!');
}
function alertaEditando() {
    window.alert('ATENÇÃO! Você está editando uma dica')
}

function salvaDica(event) {
    event.preventDefault();
    if (idHidden.value == false) {
        setTimeout(alertaSucesso, 500);
        saveLocal(titulo.value, linguagem.value, categoria.value, descricao.value, video.value);
        rendercard();
    } else {
        salvaDicaEditada();
    }

    clearInput();
    calculoDicas();

}

function searchCards() {
    listaCard.innerHTML = "";
    let array = JSON.parse(localStorage.getItem('conhecimento'));
    let content = searchContent.value.toLowerCase();
    const pesquisado = array.filter((obj) => obj.titulo.toLowerCase().includes(content));
    console.log(pesquisado);
    criaCard(pesquisado);
}

function deleteDica(idDica) {
    let array = JSON.parse(localStorage.getItem('conhecimento'));
    let opcao = window.confirm('Tem certeza que deseja deletar essa dica?');
    if (opcao == true) {
        novoArray = array.filter((obj) => obj.id !== idDica);
        localStorage.setItem('conhecimento', JSON.stringify(novoArray));
        listaCard.innerHTML = "";
        criaCard(JSON.parse(localStorage.getItem('conhecimento')));
        setTimeout(alertaDeletado, 500);
    }
}

function populaForm(obj) {
    idHidden.value = obj.id;
    titulo.value = obj.titulo;
    linguagem.value = obj.linguagem;
    categoria.value = obj.categoria;
    descricao.value = obj.descricao;
    video.value = obj.video;
}

function salvaDicaEditada() {
    let array = JSON.parse(localStorage.getItem('conhecimento'));
    let i = array.findIndex((obj) => obj.id == idHidden.value);
    array[i].titulo = titulo.value;
    array[i].linguagem = linguagem.value;
    array[i].categoria = categoria.value;
    array[i].descricao = descricao.value;
    array[i].video = video.value;
    localStorage.setItem('conhecimento', JSON.stringify(array));
    listaCard.innerHTML = "";
    criaCard(JSON.parse(localStorage.getItem('conhecimento')));
}

function editDica(idDica) {
    let opcao = window.confirm('Tem certeza que deseja editar essa dica?');
    if (opcao == true) {
        let array = JSON.parse(localStorage.getItem('conhecimento'));
        dicaSelecionada = array.find((obj) => obj.id == idDica);
        console.log(dicaSelecionada)
        populaForm(dicaSelecionada)
        setTimeout(alertaEditando, 500);
    }
}


searchButton.addEventListener('click', searchCards);
limpar.addEventListener('click', clearInput);
form.onsubmit = salvaDica;
window.onload = criaCard(JSON.parse(localStorage.getItem('conhecimento')));
deleteButton.onclick = function () {
    searchContent.value = "";
    listaCard.innerHTML = "";
    criaCard(JSON.parse(localStorage.getItem('conhecimento')));
};