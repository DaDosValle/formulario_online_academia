document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#buttonIndex");
    const formAlunos = document.querySelector("#formIndex");

    // Gera ou recupera ID do usuário
    let usuarioId = localStorage.getItem("usuario_id");
    if (!usuarioId) {
        usuarioId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        localStorage.setItem("usuario_id", usuarioId);
    }

    if (!btnSalvar || !formAlunos) return;

    const STORAGE_KEY = "formulario_dados";

    btnSalvar.addEventListener("click", function (event) {
        event.preventDefault();

        // Recupera dados acumulados
        let dadosAcumulados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

        // Dados da página atual
        const dadosPagina = {};
        dadosPagina.usuario_id = usuarioId;
        dadosPagina.pagina = formAlunos.dataset.pagina || "index";

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

        // Acumula dados
        dadosAcumulados = { ...dadosAcumulados, ...dadosPagina };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosAcumulados));

        console.log("Dados acumulados:", dadosAcumulados);

        // Vai para a próxima página
        const proximaPagina = formAlunos.dataset.next || "formulario1.html";
        window.location.href = proximaPagina;
    });
});
