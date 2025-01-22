const urlParams = new URLSearchParams(window.location.search);
let product = urlParams.get('product');
let url = 'https://world.openfoodfacts.org/api/v2/product/' + product;

fetch(url)
    .then(response => response.json())
    .then(data => { 
        console.log(data)
        console.log(data.status)
        if (data.status == 0 && product != null && product != "") {
            document.getElementById('nomProduit').innerText = "Produit non trouvé ou mauvais numéro de code-barre";
        } else {
    document.getElementById('informations').innerHTML =`<div class="nomProduit" id="nomProduit">
        <h1>${data.product.product_name}</h1>
      </div>
      <div class="photoProduit" id="photoProduit">
        <img src="${data.product.image_front_small_url}" alt="photoproduitscanner">
      </div>
      <div class="code-barre" id="code-barre">
        <h2>Code-barre</h2>
        <p>${data.product.code == null || data.product.code == "" || data.product.code == 'unknown' ? "Non renseigné" : data.product.code}</p>
      </div>
      <div class="dénomination-générique" id="dénomination-générique">
        <h2>Dénomination générique</h2>
        <p>${data.product.generic_name_fr == null || data.product.generic_name_fr == "" || data.product.generic_name_fr == 'unknown' ? "Non renseigné" : data.product.generic_name_fr}</p>
      </div>
      <div class="quantité" id="quantité">
        <h2>Quantité</h2>
        <p>${data.product.quantity == null || data.product.quantity == "" || data.product.quantity == 'unknown' ? "Non renseigné" : data.product.quantity}</p>
      </div>
      <div class="marque" id="marque">
        <h2>Marque</h2>
        <p>${data.product.brands == null || data.product.brands == "" || data.product.brands == 'unknown' ? "Non renseigné" : data.product.brands}</p>
      </div>
      <div class="catégorie" id="catégorie">
        <h2>Catégorie</h2>
        <p>${data.product.categories == null || data.product.categories == "" || data.product.categories == 'unknown' ? "Non renseigné" : data.product.categories}</p>
      </div>
        <div class="nutriscore" id="nutriscore">
        <h2>Nutriscore</h2>
                <img src="${data.product.nutriscore_grade == null || data.product.nutriscore_grade == 'unknown' ? "img/nutri/IDK.svg" : `img/nutri/${data.product.nutriscore_grade}.svg`}" alt="PhotoNovascore"></img>
        <p></p>
      </div>
      <div class="novascore" id="novascore">
      <h2>Novascore</h2>
        <img src="${data.product.nova_group == null || data.product.nova_group == 'unknown' ? "img/nova/NovaIDK.svg" : `img/nova/Nova${data.product.nova_group}.svg`}" alt="PhotoNovascore"></img>
        <p></p>
      </div>
      <div class="greenscore" id="greenscore">
        <h2>Greenscore</h2>
        <img src="${data.product.ecoscore_grade == null || data.product.ecoscore_grade == 'unknown'? "img/Green/green-score-IDK.svg" : `img/Green/green-score-${data.product.ecoscore_grade}.svg`}" alt="PhotoGreenscore"></img>
      </div>`;
    }});