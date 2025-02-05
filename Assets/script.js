// Récupérer les paramètres d'URL
const urlParams = new URLSearchParams(window.location.search);
let product = urlParams.get('product');
let result = urlParams.get('result');
const son = new Audio("beep.mp3");

function fetchProductData(url) {
fetch(url)
    .then(response => response.json())
    .then(data => { 
        console.log(data)
        console.log(data.status)
        if (data.status == 0 && product != null && product != "") {
            document.getElementById('nomProduit').innerText = "Produit non trouvé ou mauvais numéro de code-barre";
        } else {
          son.play();
    document.getElementById('informations').innerHTML =`<div class="nomProduit" id="nomProduit">
        <h2>${data.product.product_name}</h2>
      </div>
      <div class="photoProduit" id="photoProduit">
        <img src="${data.product.image_front_small_url == null || data.product.image_front_small_url == 'unknown' || data.product.image_front_small_url == 'not-applicable' ? "img/Green/green-score-IDK.svg" : `${data.product.image_front_small_url}`}" alt="photoproduitscanner"></img>
      </div>
      <div class="code-barre" id="code-barre">
        <h3>Code-barre</h3>
        <p>${data.product.code == null || data.product.code == "" || data.product.code == 'unknown' || data.product.code == 'not-applicable' ? "Non renseigné" : data.product.code}</p>
      </div>
      <div class="dénomination-générique" id="dénomination-générique">
        <h3>Dénomination générique</h3>
        <p>${data.product.generic_name_fr == null || data.product.generic_name_fr == "" || data.product.generic_name_fr == 'unknown' || data.product.generic_name_fr == 'not-applicable' ? "Non renseigné" : data.product.generic_name_fr}</p>
      </div>
      <div class="quantité" id="quantité">
        <h3>Quantité</h3>
        <p>${data.product.quantity == null || data.product.quantity == "" || data.product.quantity == 'unknown' || data.product.quantity == 'not-applicable' ? "Non renseigné" : data.product.quantity}</p>
      </div>
      <div class="marque" id="marque">
        <h3>Marque</h3>
        <p>${data.product.brands == null || data.product.brands == "" || data.product.brands == 'unknown' || data.product.brands == 'not-applicable' ? "Non renseigné" : data.product.brands}</p>
      </div>
      <div class="catégorie" id="catégorie">
        <h3>Catégorie</h3>
        <p>${data.product.categories == null || data.product.categories == "" || data.product.categories == 'unknown' || data.product.categories == 'not-applicable' ? "Non renseigné" : data.product.categories}</p>
      </div>
        <div class="nutriscore" id="nutriscore">
        <h3>Nutriscore</h3>
        <img src="${data.product.nutriscore_grade == null || data.product.nutriscore_grade == 'unknown' || data.product.nutriscore_grade == 'not-applicable' ? "img/nutri/IDK.svg" : `img/nutri/${data.product.nutriscore_grade}.svg`}" alt="PhotoNovascore"></img>
        <p></p>
      </div>
      <div class="novascore" id="novascore">
      <h3>Novascore</h3>
        <img src="${data.product.nova_group == null || data.product.nova_group == 'unknown' || data.product.nova_group == 'not-applicable' ? "img/nova/NovaIDK.svg" : `img/nova/Nova${data.product.nova_group}.svg`}" alt="PhotoNovascore"></img>
        <p></p>
      </div>
      <div class="greenscore" id="greenscore">
        <h3>Greenscore</h3>
        <img src="${data.product.ecoscore_grade == null || data.product.ecoscore_grade == 'unknown' || data.product.ecoscore_grade == 'not-applicable' ? "img/Green/green-score-IDK.svg" : `img/Green/green-score-${data.product.ecoscore_grade}.svg`}" alt="PhotoGreenscore"></img>
      </div>`;
    }});
};

// scanner
    window.addEventListener('load', function () {
      let selectedDeviceId;
      const codeReader = new ZXing.BrowserMultiFormatReader()
      console.log('ZXing code reader initialized')
      codeReader.listVideoInputDevices()
        .then((videoInputDevices) => {
          const sourceSelect = document.getElementById('sourceSelect')
          selectedDeviceId = videoInputDevices[0].deviceId
          if (videoInputDevices.length >= 1) {
            videoInputDevices.forEach((element) => {
              const sourceOption = document.createElement('option')
              sourceOption.text = element.label
              sourceOption.value = element.deviceId
              sourceSelect.appendChild(sourceOption)
            })
            sourceSelect.onchange = () => {
              selectedDeviceId = sourceSelect.value;
            };
            const sourceSelectPanel = document.getElementById('sourceSelectPanel')
            sourceSelectPanel.style.display = 'block'
          }
          document.getElementById('startButton').addEventListener('click', () => {
            codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
              if (result) {
                console.log(result)
                son.play();
                document.location.href = "index.html?product=" + result;
              }
              if (err && !(err instanceof ZXing.NotFoundException)) {
                console.error(err)
                document.getElementById('result').textContent = err
              }
            })
            console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
          })
          document.getElementById('resetButton').addEventListener('click', () => {
            codeReader.reset()
            document.getElementById('result').textContent = '';
            console.log('Reset.')
          })
        })
        .catch((err) => {
          console.error(err)
        })
    })

   // Chargement initial (si "product" ou "result" est défini dans l'URL)
let productOrResult = product || result;
if (productOrResult) {
    const url = createUrl(productOrResult);
    fetchProductData(url);
}

// Fonction pour créer l'URL API
function createUrl(code) {
  return `https://world.openfoodfacts.org/api/v2/product/${code}`;
}

// Faire défiler en douceur vers le haut
const boutonRemonte = document.querySelector('.bouttonremonte');
boutonRemonte.addEventListener('click', function(event) {
  event.preventDefault();
      window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});