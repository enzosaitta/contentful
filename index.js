function addWorkCard(params = {}) {
  const template = document.querySelector("#portfolio-card-template");
  const container = document.querySelector(".secction");

  template.content.querySelector(".title-card").textContent = params.title;
  template.content.querySelector(".text-card").textContent = params.description;
  template.content.querySelector(".img-card").src = params.image;
  template.content.querySelector(".link").href = params.url;

  let clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getWorks() {
  return fetch(
    "https://cdn.contentful.com/spaces/grnneudz7zc6/environments/master/entries?access_token=4PkJ6AkXJIZ2PLugew0rZ5qDEsHXi-TXA5ERLl3nAiM&&content_type=work"
  )
    .then((res) => res.json())
    .then((data) => {
      const fieldsCollection = data.items.map((item) => {
        const imageId = data.includes.Asset[0].sys.id;
        const image = data.includes.Asset.find(
          (asset) => asset.sys.id === imageId
        ).fields.file.url;
        return {
          title: item.fields.titlework,
          description: item.fields.description,
          image: image,
          url: item.fields.url,
        };
      });
      return fieldsCollection;
    });
}

function main() {
  getWorks().then(function (works) {
    for (const p of works) {
      addWorkCard(p);
    }
  });
}

main();
