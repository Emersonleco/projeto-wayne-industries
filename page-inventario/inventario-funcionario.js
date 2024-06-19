
let itens = JSON.parse(localStorage.getItem('itens')) || [];

const catalogo = document.querySelector('.catalogo');


function salvarItens() {
    localStorage.setItem('itens', JSON.stringify(itens));
}


function validarCampo(input) {
    if (input.value.trim() === '') {
        return 'Preencha os campos solicitados!';
    }
    return '';
}

function listarItens(catalogoArray) {
    
    catalogo.innerHTML = '';
    for (const item of catalogoArray) {
        //Criar div com itens
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `<h3 class="h3-titulo">${item.titulo}</h3>
        <h3 class="h3-quantidade">${item.quantidade}</h3>`;
        catalogo.appendChild(div);
        // Criar div com botões
        const divButtons = document.createElement('div')
        divButtons.classList.add('div-btn')
        div.appendChild(divButtons)
         //Criar botão editar
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('button-form');
        btnEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        btnEditar.addEventListener('click', () => alert('Usuário não tem permissão de acesso! Contate um gerente.'));
        divButtons.appendChild(btnEditar)
        //Criar botão exluir
        const btnExcluir = document.createElement('button');
        btnExcluir.classList.add('button-form');
        btnExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btnExcluir.addEventListener('click', () => alert('Usuário não tem permissão de acesso! Contate um gerente.'));
        divButtons.appendChild(btnExcluir);
    }
    
}


function searchEquipamento() {
    const termo = document.querySelector('#termo-busca').value;
    const resultados = itens.filter((item) => {
        return item.titulo === termo });

    if (termo === ''){
        alert('digite o item a buscar');
        return listarItens(itens);
    }
    else{
        listarItens(resultados);
    }
}

listarItens(itens);



// animação nav-bar///
const navs = document.querySelectorAll(".nav div")
const navsContent = document.querySelectorAll(".nav-content div")

navs.forEach((nav, index) => {
    nav.addEventListener("click", () =>{
        navsContent.forEach((content) => {
            content.classList.remove("active")
        })
        navs.forEach((nav) => {
            nav.classList.remove("active")
        })
        navs[index].classList.add("active")
        navsContent[index].classList.add("active")
    })
})