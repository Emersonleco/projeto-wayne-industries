
let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];

const catalogo = document.querySelector('.catalogo');


function salvarVeiculos() {
    localStorage.setItem('veiculos', JSON.stringify(veiculos));
}

function addVeiculos() {

    const titulo = document.querySelector('#titulo');
    const disponibilidade = document.querySelector('#disponibilidade');

    const erroTitulo = validarCampo(titulo);
    if (erroTitulo) {
        alert(erroTitulo);
        return false; 
    }

    const erroDisponibilidade = validarCampo(disponibilidade);
    if (erroDisponibilidade) {
        alert(erroDisponibilidade);
        return false; 
    }
    
    const novoVeiculo = {
        titulo: titulo.value,
        disponibilidade: disponibilidade.value
    };
    veiculos.push(novoVeiculo);
    salvarVeiculos();
    titulo.value = '';
    disponibilidade.value = '';
    listarVeiculos(veiculos);

    return true; 
}

function validarCampo(input) {
    if (input.value.trim() === '') {
        return 'Preencha os campos solicitados!';
    }
    return '';
}

function listarVeiculos(catalogoArray) {
    
    catalogo.innerHTML = '';
    for (const veiculo of catalogoArray) {
        //Criar div com itens
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `<h3 class="h3-titulo">${veiculo.titulo}</h3>
        <h3 class="h3-quantidade">${veiculo.disponibilidade}</h3>`;
        catalogo.appendChild(div);
        // Criar div com botões
        const divButtons = document.createElement('div')
        divButtons.classList.add('div-btn')
        div.appendChild(divButtons)
         //Criar botão editar
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('button-form');
        btnEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        btnEditar.addEventListener('click', () => editarVeiculo(veiculo));
        divButtons.appendChild(btnEditar)
        //Criar botão exluir
        const btnExcluir = document.createElement('button');
        btnExcluir.classList.add('button-form');
        btnExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btnExcluir.addEventListener('click', () => excluirVeiculo(div, veiculo.titulo));
        divButtons.appendChild(btnExcluir);
    }
    
}

function editarVeiculo(veiculo) {
    // Exibir popUp para edição
    const novoTitulo = prompt('Novo nome:', veiculo.titulo);
    const novaDisponibilidade = prompt('Disponibilidade:', veiculo.disponibilidade);
    veiculo.titulo = novoTitulo;
    veiculo.disponibilidade = novaDisponibilidade;
    // Autenticar se os campos estão vazios ou nulos
    if (veiculo.titulo === '' || veiculo.disponibilidade === '') {
        alert('Digite os novos valores');
        editarVeiculo(veiculo);
    }
    else if(veiculo.titulo, veiculo.disponibilidade) {
        const index = veiculos.findIndex((e) => e.titulo === veiculo.titulo);
        veiculos[index].titulo = novoTitulo;
        veiculos[index].disponibilidade = novaDisponibilidade;
    
        salvarVeiculos();
        listarVeiculos(veiculos);
    }
    else{
        alert('Digite os novos valores');
        editarVeiculo(veiculo);
    }
}



function excluirVeiculo(div, veiculo){
    //Exibir popUp de confirmação
    const confirmacao = window.confirm(`Deseja realmente excluir o veiculo "${veiculo}"?`);

    if (confirmacao) {
        catalogo.removeChild(div);
        const index = veiculos.findIndex((e) => e.titulo === veiculo);
        if (index !== -1) {
            veiculos.splice(index, 1);
            salvarVeiculos();
        } else {
            console.log(`veiculo "${veiculo}" não encontrado na lista.`);
        }
}
}


function searchVeiculos() {
    const termo = document.querySelector('#termo-busca').value;
    const resultados = veiculos.filter((veiculo) => {
        return veiculo.titulo === termo });

    if (termo === ''){
        alert('digite o veiculo a buscar');
        return listarVeiculos(veiculos);
    }
    else{
        listarVeiculos(resultados);
    }
}

listarVeiculos(veiculos);



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