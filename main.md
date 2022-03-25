Verde: #22B07E;
Verde-agua: #64D6AA;
Texto: #636265;
Verde-claro: #B8E4D4;
font-weight 400 500 700

filter: invert(82%) sepia(20%) saturate(945%) hue-rotate(100deg) brightness(92%) contrast(84%);

JavaScript:
            * Separar a tarefa por categoria
            * Criar modal para adicionar tarefas
            * Adicionar tarefas dinamicamente e por categoria
            * Adicionar Dark Mode
            * Adicionar calendário
                * Mostrar os dias que possuem tarefas 
                

HTML:
        *Arrumar Form ( https://codepen.io/gymratpacks/pen/VKzBEp )
            

            <form id="form" onsubmit="Form.submit(event)">   
                <img src="./images/exit.svg" alt="Cancelar" onclick="Modal.activation()">
                <div id="new-task">
                    <label for="text-input" class="screen-readers-only">Adicione uma nova tarefa</label>
                    <input type="text" id="text-input" maxlength="20" placeholder="Nova tarefa">
                </div>

                <div id="form-footer">
                    <label for="datetime-task" class="screen-readers-only">Data e horário da tarefa</label>
                    <input type="time" id="time-task">    
                    
                    <label for="categories" class="screen-readers-only">Selecione a Categoria</label>
                    <select name="categories" id="categories" >
                        <option value="work">Trabalho</option>
                        <option value="health">Saúde</option>
                        <option value="personal">Pessoal</option>
                        <option value="shopping">Mercado</option>
                    </select>
                </div>
                <button id="save">Adicionar</button>
            </form>

Adicionar no GitPages e colocar atalho no celular