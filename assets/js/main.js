// Lista de Tarefas v1
function listaTarefas() {
    const inputTarefa = document.querySelector('.input-tarefa')
    const botaoTarefa = document.querySelector('.btn-tarefa')
    const tarefas = document.querySelector('.tarefas')
    const btnApagarTudo = document.querySelector('.container')
    let cont = 0

    // EVENTOS
    // Evento para capturar tecla ENTER e adicionar tarefa
    inputTarefa.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
            if (!inputTarefa.value) return
            criaTarefa(inputTarefa.value)
        }
    })

    // Evento para adicionar tarefa
    botaoTarefa.addEventListener('click', function(event) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
    });

    // Evento para apagar tarefa
    document.addEventListener('click', function(event){
        const elemento = event.target
        if (elemento.classList.contains('apagar')) {
            elemento.parentElement.remove()
            salvarTarefas()
        }
    });

    // Evento para apagar todas as tarefas
    document.addEventListener('click', function(event) {
        const elemento = event.target
        const liTarefas = tarefas.querySelectorAll('li')
        if (elemento.classList.contains('apagar-tudo')) {
            for (let tarefa of liTarefas) {
                tarefa.remove()
                salvarTarefas()
            }
        }
    });

    // ---------

    // Função para limpar o input e focar o cursor no input
    function limpaInput() {
        inputTarefa.value = ''
        inputTarefa.focus()
    }



    // Função para criar tarefa
    function criaTarefa(textoInput) {
        const li = document.createElement('li')
        li.innerText = textoInput
        li.classList.add('list-group-item')
        tarefas.appendChild(li) 
        limpaInput()
        criaBotaoApagar(li)
        if (cont === 0) {
            criaBotaApagarTudo(li)
        }
        cont += 1
        salvarTarefas()
    }

    // Função para criar botão para apagar tarefas
    function criaBotaoApagar(li) {
        li.innerText += ' ';
        const botaoApagar = document.createElement('button')
        botaoApagar.classList.add('btn','btn-sm', 'bg-danger', 'text-white', 'fas', 'fa-trash-alt', 'float-right', 'apagar')
        botaoApagar.setAttribute('title', 'Deletar esta tarefa')
        li.appendChild(botaoApagar)
    }

    // Função para salvar tarefas no local storage
    function salvarTarefas() {
        const liTarefas = tarefas.querySelectorAll('li')
        const listaDeTarefas = []

        for (let tarefa of liTarefas) {
            listaDeTarefas.push(tarefa.innerText)
        }
        const tarefasJSON = JSON.stringify(listaDeTarefas)
        localStorage.setItem('tarefas', tarefasJSON)
    }

    // Função para adicionar tarefas e exibir no navegador
    function adicionaTarefasSalvas() {
        const tarefas = localStorage.getItem('tarefas')
        const listaDeTarefas = JSON.parse(tarefas)

        for (let tarefa of listaDeTarefas) {
            criaTarefa(tarefa)
        }
    }

    // Função para apagar todas as tarefas
    function criaBotaApagarTudo(li) {
        if (li) {
            const botaoApagarTudo = document.createElement('button')
            botaoApagarTudo.innerText = 'Deletar todas as tarefas'
            botaoApagarTudo.classList.add('btn','btn-sm', 'bg-danger', 'text-white', 'float-right', 'apagar-tudo')
            botaoApagarTudo.setAttribute('title', 'Deletar tudo')
            btnApagarTudo.appendChild(botaoApagarTudo)
        }
    }
    adicionaTarefasSalvas()
}
listaTarefas()