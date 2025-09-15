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

    // Determina a URL do servidor de acordo com o ambiente
    const BASE_URL = "https://formulario-online-academia.onrender.com"; // <--- substitua pela sua URL do Render

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        // Monta o objeto de dados dinamicamente
        const dados = {};
        dados.usuario_id = usuarioId;
        dados.pagina3 = formAlunos.dataset.pagina || "formulario3";

        Array.from(formAlunos.elements).forEach(el => {
            if (el.name) {
                if (el.type === "checkbox") {
                    if (!dados[el.name]) dados[el.name] = [];
                    if (el.checked) dados[el.name].push(el.value);
                } else if (el.type === "radio") {
                    if (el.checked) dados[el.name] = el.value;
                } else {
                    dados[el.name] = el.value || "";
                }
            }
        });

        console.log("Enviando dados do formulário 3:", dados);

        try {
            const resposta = await fetch(`${BASE_URL}/enviar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                console.log("Dados enviados com sucesso!");
                const proximaPagina = formAlunos.dataset.next || "obrigado.html";
                window.location.href = proximaPagina;
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
