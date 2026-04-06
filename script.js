//Fonction pour synchroniser les champs texte
function setupSync(inputId, outputId) {
  const input = document.getElementById(inputId)
  const output = document.getElementById(outputId)

  input.addEventListener('input', () => {
    output.innerText = input.value || 'Non renseigné'
  })
}

// Liste des champs à synchroniser
const fields = [
  ['inName', 'outName'],
  ['inRole', 'outRole'],
  ['inEmail', 'outEmail'],
  ['inPhone', 'outPhone'],
  ['inBio', 'outBio'],
  ['inExpPoste', 'outExpPoste'],
  ['inExpCompany', 'outExpCompany'],
  ['inExpDesc', 'outExpDesc'],
  ['inEduTitle', 'outEduTitle'],
  ['inEduSchool', 'outEduSchool'],
  ['inEduYear', 'outEduYear'],
]

fields.forEach(field => setupSync(field[0], field[1]))

// Gestion de l'upload de photo
document.getElementById('inPhoto').addEventListener('change', function (e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = function (event) {
      const outPhoto = document.getElementById('outPhoto')
      const container = document.getElementById('photo-container')
      outPhoto.src = event.target.result
      container.classList.remove('hidden')
    }
    reader.readAsDataURL(file)
  }
})

// Gestion des compétences (transforme la virgule en liste <li>)
document.getElementById('inSkills').addEventListener('input', function () {
  const val = this.value
  const list = val.split(',').filter(item => item.trim() !== '')
  const outputList = document.getElementById('outSkills')

  outputList.innerHTML = '' // Vide la liste actuelle

  list.forEach(skill => {
    const li = document.createElement('li')
    li.innerText = skill.trim()
    outputList.appendChild(li)
  })
})
document.querySelector('.btn-print').addEventListener('click', downloadPDF)
function downloadPDF() {
  let isValid = true
  const allInputs = document.querySelectorAll('.editor input, .editor textarea')

  allInputs.forEach(inp => {
    // On retire les espaces vides pour vérifier si c'est vraiment rempli
    if (!inp.value.trim()) {
      isValid = false
      inp.style.borderColor = 'red' // On colore le champ en rouge
    } else {
      inp.style.borderColor = '#cbd5e1' // On remet la couleur normale si c'est bon
    }
  })

  if (!isValid) {
    alert('Veuillez remplir tous les champs avant de télécharger le PDF.')
    return // ON ARRÊTE TOUT ICI : le code en dessous ne sera pas exécuté
  }

  // Si tout est valide, on lance html2pdf
  const element = document.getElementById('cv-preview')
  const options = {
    margin: 0,
    filename: 'mon-cv-clipnest.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  }
  html2pdf().set(options).from(element).save()
}
