document.addEventListener("DOMContentLoaded", function () {
    const btnSalvar = document.querySelector("#buttonIndex");
    const formAlunos = document.querySelector("#formIndex");

    if (!btnSalvar || !formAlunos) return;

    btnSalvar.addEventListener("click", async function (event) {
        event.preventDefault();

        const nome = formAlunos.nome?.value || "";
        const email = formAlunos.email?.value || "";

        console.log("Fui clicado ahah");
        console.log("Nome:", nome);
        console.log("Email:", email);

        const dados = {
            pagina: "index",
            nome: nome,
            email: email
        };

        // Determina a URL do servidor de acordo com o ambiente
        const BASE_URL = window.location.hostname.includes("localhost")
            ? "http://127.0.0.1:5000"
            : "https://SEU_APP_RENDER.onrender.com"; // <--- substitua pela sua URL do Render

        try {
            const resposta = await fetch(`${BASE_URL}/enviar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                window.location.href = "formulario1.html";
            } else {
                alert("Erro ao enviar dados.");
            }
        } catch (err) {
            console.error("Erro ao conectar com o servidor:", err);
            alert("Não foi possível conectar com o servidor. Verifique sua conexão ou tente mais tarde.");
        }
    });
});
