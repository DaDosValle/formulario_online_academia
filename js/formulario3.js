document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#btnForm3");
    const formAlunos = document.querySelector("#form33");

    // 🔑 Gera ou recupera ID do usuário
    let usuarioId = localStorage.getItem("usuario_id");
    if (!usuarioId) {
        usuarioId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        localStorage.setItem("usuario_id", usuarioId);
    }

    if (!btnSalvar || !formAlunos) return;

    // Nome da chave no localStorage para acumular dados
    const STORAGE_KEY = "formulario_dados";

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        // Recupera dados acumulados das páginas anteriores
        let dadosAcumulados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

        // Dados da página atual
        const dadosPagina = {};
        dadosPagina.usuario_id = usuarioId; // ID único do usuário
        dadosPagina.pagina3 = formAlunos.dataset.pagina || "formulario3";

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

        // 🔄 Acumula os dados da página atual
        dadosAcumulados = { ...dadosAcumulados, ...dadosPagina };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosAcumulados));

        console.log("Enviando todos os dados acumulados:", dadosAcumulados);

        // 🔹 Envia todos os dados para o backend de uma vez
        const BASE_URL = "https://formulario-online-academia.onrender.com"; // URL do servidor
        try {
            const resposta = await fetch(`${BASE_URL}/enviar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosAcumulados)
            });

            if (resposta.ok) {
                console.log("Dados enviados com sucesso!");
                localStorage.removeItem(STORAGE_KEY); // limpa o storage após envio
                window.location.href = formAlunos.dataset.next || "obrigado.html";
            } else {
                const erro = await resposta.json().catch(() => ({}));
                alert("Erro ao enviar: " + (erro.erro || "Erro desconhecido"));
            }
        } catch (e) {
            console.error("Erro na requisição:", e);
            alert("Não foi possível conectar com o servidor. Verifique sua conexão ou tente mais tarde.");
        }
    });
});
