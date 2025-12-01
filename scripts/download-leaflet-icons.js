import fs from "fs"
import path from "path"
import https from "https"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Créer le dossier images s'il n'existe pas
const imagesDir = path.join(__dirname, "../public/images")
const markersDir = path.join(imagesDir, "markers")

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

if (!fs.existsSync(markersDir)) {
  fs.mkdirSync(markersDir, { recursive: true })
}

// URLs des icônes Leaflet par défaut
const iconUrls = {
  "marker-icon.png": "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  "marker-icon-2x.png": "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  "marker-shadow.png": "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
}

// Télécharger les icônes
Object.entries(iconUrls).forEach(([filename, url]) => {
  const filePath = path.join(imagesDir, filename)

  if (!fs.existsSync(filePath)) {
    console.log(`Téléchargement de ${filename}...`)

    const file = fs.createWriteStream(filePath)
    https
      .get(url, (response) => {
        response.pipe(file)
        file.on("finish", () => {
          file.close()
          console.log(`${filename} téléchargé avec succès.`)
        })
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {}) // Supprimer le fichier en cas d'erreur
        console.error(`Erreur lors du téléchargement de ${filename}: ${err.message}`)
      })
  } else {
    console.log(`${filename} existe déjà.`)
  }
})

// Créer des marqueurs colorés pour les différentes catégories
const categories = [
  { name: "default", color: "#3388ff" },
  { name: "education", color: "#4285F4" },
  { name: "environment", color: "#34A853" },
  { name: "technology", color: "#9C27B0" },
  { name: "water", color: "#03A9F4" },
  { name: "health", color: "#F44336" },
  { name: "economy", color: "#FFC107" },
  { name: "culture", color: "#E91E63" },
  { name: "tourism", color: "#673AB7" },
]

// Créer un SVG pour chaque catégorie
categories.forEach(({ name, color }) => {
  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
  <path fill="${color}" stroke="#000" stroke-width="1" d="M12.5 0C5.596 0 0 5.596 0 12.5c0 1.886.43 3.68 1.194 5.29.55 1.16 4.03 7.11 11.305 22.616 7.277-15.515 10.756-21.463 11.305-22.617A12.428 12.428 0 0025 12.5C25 5.596 19.404 0 12.5 0zm0 17.5a5 5 0 110-10 5 5 0 010 10z"/>
</svg>
  `

  const svgPath = path.join(markersDir, `${name}-marker.svg`)
  fs.writeFileSync(svgPath, svgContent)
  console.log(`Marqueur SVG créé pour ${name}.`)

  // Convertir SVG en PNG (vous aurez besoin d'une bibliothèque comme sharp pour cela)
  // Pour cet exemple, nous allons simplement créer un fichier PNG vide
  const pngPath = path.join(markersDir, `${name}-marker.png`)
  if (!fs.existsSync(pngPath)) {
    fs.writeFileSync(pngPath, "") // Fichier vide, à remplacer par une vraie conversion
    console.log(`Fichier PNG créé pour ${name} (à remplacer par une vraie image).`)
  }
})

console.log("Téléchargement et création des icônes terminés.")

