

function login() {
    var usuario = document.getElementsByName('username')[0].value.toLowerCase();
    var senha = document.getElementsByName('password')[0].value;
    var userType = document.getElementById('user-type').value;

    // Dados de autenticação (usuário e senha)
    const usuarios = {
        funcionario: { senha: 'senha_funcionario' }, 
        gerente: { senha: 'senha_gerente' },
        admin: { senha: 'senha_admin' }
    };

   if (usuario === 'funcionario' && usuarios[usuario].senha === senha && userType === 'funcionario') {
                window.location = '../painel-users/painel-funcionario.html';
    } else if(usuario === 'gerente' && usuarios[usuario].senha === senha && userType === 'gerente'){
                window.location = '../painel-users/painel-gerente.html';
            } else if(usuario === 'admin' && usuarios[usuario].senha === senha && userType === 'admin'){
                window.location = '../painel-users/painel-admin.html';
            } else {
        alert('Dados incorretos, tente novamente');
    }

    return false; 
}



