const form = document.getElementById('form');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const lista = document.getElementById('lista');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
// esta variável vai até o localStorage e pega todos os itens que estiverem salvos e adiciona ao array "usuarios", caso não tenha nenhum item, retorna como null, por conta da alternativa "|| []";
// "JSON.parse()" converte string  em array de objeto;
/* O "localStorage" só aceita string em seu armazenamento. Logo, se existir conteúdo em seu armazenamento, ele estará em forma de string. Ao usar o "JSON.parse()", convertemos a string em array/objeto novamente para guardá-lo na variável "usuarios" */

function adicionar(){
    lista.innerHTML = '';
    // limpa o conteúdo de "<ul id="lista">" antes de exibir a lista novamente

    usuarios.forEach((usuario, index) => {
        const li = document.createElement('li');
        li.textContent = `${usuario.nome} - ${usuario.email}`;
        /* O "forEach()" chama a função call back para cada item do array; criamos uma variável "li" e atribuimos a ela a criação de um nova TAG "li" que terá em seu conteúdo, no formato de texto, o conteúdo em template literals */

        const excluir = document.createElement('button')
        // cria um botão através da variável "excluir";
        excluir.textContent = 'Excluir'
        // adiciona ao botão o texto "Excluir"
        excluir.addEventListener('click', () => {
            excluirUsuario(index)
            // função de call back que retorna uma outra função, a "excluirUsuario" com o evento de "click"
        })

        li.appendChild(excluir)
        lista.appendChild(li)
    })
}

function adicionarUsuario(nome, email) {
    usuarios.push({nome, email})
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    adicionar()
}

function excluirUsuario(index) {
    usuarios.splice(index, 1)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    adicionar()
}

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    adicionarUsuario(nomeInput.value, emailInput.value)
    nomeInput.value = ''
    emailInput.value = ''
})

adicionar()

