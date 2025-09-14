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

        try {
            const resposta = await fetch("http://127.0.0.1:5000/enviar", {
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
        }
    });
});
