document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#btnForm1");
    const formAlunos = document.querySelector("#form1");

    // 🔑 Gera ou recupera ID do usuário
    let usuarioId = localStorage.getItem("usuario_id");
    if (!usuarioId) {
        usuarioId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        localStorage.setItem("usuario_id", usuarioId);
    }

    if (!btnSalvar || !formAlunos) return;

    // Nome da chave no localStorage para acumular dados
    const STORAGE_KEY = "formulario_dados";

    btnSalvar.addEventListener("click", function (event) {
        event.preventDefault();

        // Recupera dados acumulados ou inicia objeto vazio
        let dadosAcumulados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

        // Dados da página atual
        const dadosPagina = {};
        dadosPagina.usuario_id = usuarioId; // ID único do usuário
        dadosPagina.pagina1 = formAlunos.dataset.pagina || "formulario1";

        Array.from(formAlunos.elements).forEach(el => {
            if (el.name) {
                if (el.type === "checkbox") {
                    if (!dadosPagina[el.name]) dadosPagina[el.name] = [];
                    if (el.checked) dadosPagina[el.name].push(el.value);
                } else if (el.type === "radio") {
                    if (el.checked) dadosPagina[el.name] = el.value;
                } else {
                    dadosPagina[el.name] = el.value || "";
                }
            }
        });

        // 🔄 Acumula dados
        dadosAcumulados = { ...dadosAcumulados, ...dadosPagina };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosAcumulados));

        console.log("Dados acumulados:", dadosAcumulados);

        // Navega para próxima página
        const proximaPagina = formAlunos.dataset.next || "formulario2.html";
        window.location.href = proximaPagina;
    });
});
