-- Ajouter une colonne location à la table projects
-- Cette colonne stockera le nom textuel du lieu (ex: "Cotonou, Bénin")
-- tandis que latitude et longitude stockent les coordonnées précises

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS location TEXT;

-- Ajouter un commentaire pour documenter la colonne
COMMENT ON COLUMN projects.location IS 'Nom textuel du lieu (ex: "Cotonou, Bénin")';

-- Mettre à jour les projets existants avec une valeur par défaut
UPDATE projects
SET location = CONCAT(
  ROUND(latitude::numeric, 2)::text, 
  ', ', 
  ROUND(longitude::numeric, 2)::text
)
WHERE location IS NULL;
