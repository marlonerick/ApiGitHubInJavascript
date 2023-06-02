const listaRepos = document.getElementById("lista-repos");
const buscarPerfilBtn = document.getElementById("buscarPerfil");

// getApiGithub();
async function getApiGithub() {
  // entrada do de dado do input
  const repositoriosInput = document.getElementById("repositorios");

  const username = repositoriosInput.value;

  if (username) {
    await fetch(`https://api.github.com/users/${username}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        let data = await res.json();

        // Exiba as informações de perfil em seu HTML
        let perfil = document.createElement("div");
        perfil.innerHTML = `
        <ul class="list-group">
          <li class="list-group-item list-group-item-action">
            <img src=${data.avatar_url} alt="" />
              <strong>${data.name}</strong>
                <p>Repositorios: ${data.public_repos}</p>
                <p>Seguidores: ${data.followers}</p>
                <p>Seguindo: ${data.following}</p>
              <a target="_blank" href=${data.html_url}>ACESSAR</a>
          </li>
        </ul>
      `;
        // limpar antes de exibir
        listaRepos.innerHTML = "";

        listaRepos.appendChild(perfil);
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (username === "") {
    alert("Digite o perfil procurado para prosseguir com a pesquisa.");
  }
}

// ouve o evento de click
buscarPerfilBtn.addEventListener("click", (event) => {
  // Evita o comportamento padrão de recarregar a página
  event.preventDefault();
  // chama função
  getApiGithub();
});
