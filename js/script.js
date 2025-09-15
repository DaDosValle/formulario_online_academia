document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#buttonIndex");
    const formAlunos = document.querySelector("#formIndex");

    // 🔑 Gera ou recupera ID do usuário
    let usuarioId = localStorage.getItem("usuario_id");
    if (!usuarioId) {
        usuarioId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        localStorage.setItem("usuario_id", usuarioId);
    }

    if (!btnSalvar || !formAlunos) return;

    // URL fixa do backend no Render
    const BASE_URL = "https://formulario-online-academia.onrender.com";

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        const dados = {};
        dados.usuario_id = usuarioId; //  sempre manda o mesmo ID do usuári
        dados.pagina = formAlunos.dataset.pagina || "index";

        Array.from(formAlunos.elements).forEach(el => {
            if (el.name) {
                if (el.type === "checkbox") {
                    if (!dados[el.name]) dados[el.name] = []; // ALTERADO
                    if (el.checked) dados[el.name].push(el.value); // ALTERADO
                } else if (el.type === "radio") {
                    if (el.checked) dados[el.name] = el.value;
                } else {
                    dados[el.name] = el.value || "";
                }
            }
        });

        console.log("Fui clicado ahah");
        console.log(dados);

        try {
            const resposta = await fetch(`${BASE_URL}/enviar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                const proximaPagina = formAlunos.dataset.next || "formulario1.html";
                window.location.href = proximaPagina;
            } else {
                alert("Erro ao enviar dados.");
            }
        } catch (err) {
            console.error("Erro ao conectar com o servidor:", err);
            alert("Não foi possível conectar com o servidor. Verifique sua conexão ou tente mais tarde.");
        }
    });
});
