export interface TeamInfo {
  name: string,
  image: string,
  wins: number,
  losses: number
}

export type League = "BSN" | "LBP" | "LAI";

export const teamInfosBSN: TeamInfo[] = [
  {
    "name": "Santeros de Aguada",
    "image": "/team-images/BSN/santeros-de-aguada.jpeg",
    "wins": 3,
    "losses": 0
  },
  {
    "name": "Capitanes de Arecibo",
    "image": "/team-images/BSN/capitanes-de-arecibo.jpeg",
    "wins": 3,
    "losses": 2
  },
  {
    "name": "Vaqueros de Bayamón",
    "image": "/team-images/BSN/vaqueros-de-bayamon.jpeg",
    "wins": 0,
    "losses": 2
  },
  {
    "name": "Criollos de Caguas",
    "image": "/team-images/BSN/criollos-de-caguas.jpeg",
    "wins": 2,
    "losses": 2
  },
  {
    "name": "Gigantes de Carolina",
    "image": "/team-images/BSN/gigantes-de-carolina.jpeg",
    "wins": 1,
    "losses": 3
  },
  {
    "name": "Mets de Guaynabo",
    "image": "/team-images/BSN/mets-de-guaynabo.jpeg",
    "wins": 2,
    "losses": 3
  },
  {
    "name": "Osos de Manatí",
    "image": "/team-images/BSN/osos-de-manati.jpeg",
    "wins": 4,
    "losses": 1
  },
  {
    "name": "Indios de Mayagüez",
    "image": "/team-images/BSN/indios-de-mayaguez.jpeg",
    "wins": 1,
    "losses": 1
  },
  {
    "name": "Leones de Ponce",
    "image": "/team-images/BSN/leones-de-ponce.jpeg",
    "wins": 0,
    "losses": 2
  },
  {
    "name": "Atleticos de San German",
    "image": "/team-images/BSN/atleticos-de-san-german.jpeg",
    "wins": 3,
    "losses": 3
  }
]

export const teamInfosBaseLBP: TeamInfo[] = [
  {
    "name": "Llaneros de Toa Baja",
    "image": "/team-images/LBP/llaneros-de-toa-baja.jpeg",
    "wins": 12,
    "losses": 4
  },
  {
    "name": "La Tribu de Mayagüez",
    "image": "/team-images/LBP/la-tribu-de-mayaguez.jpeg",
    "wins": 9,
    "losses": 7
  },
  {
    "name": "San Juan Capitalinos",
    "image": "/team-images/LBP/san-juan-capitalinos.jpeg",
    "wins": 5,
    "losses": 11
  },
  {
    "name": "Peregrinos de Hormigueros",
    "image": "/team-images/LBP/peregrinos-de-hormigueros.jpeg",
    "wins": 10,
    "losses": 6
  },
  {
    "name": "Artesanos de Las Piedras",
    "image": "/team-images/LBP/artesanos-de-las-piedras.jpeg",
    "wins": 8,
    "losses": 8
  },
  {
    "name": "Avancinos de Villalba",
    "image": "/team-images/LBP/avancinos-de-villalba.jpeg",
    "wins": 7,
    "losses": 9
  },
  {
    "name": "Bravos de Cidra",
    "image": "/team-images/LBP/bravos-de-cidra.jpeg",
    "wins": 14,
    "losses": 2
  },
  {
    "name": "Cafeteros de Yauco",
    "image": "/team-images/LBP/cafeteros-de-yauco.jpeg",
    "wins": 11,
    "losses": 5
  },
  {
    "name": "Caribes de Peñuelas",
    "image": "/team-images/LBP/caribes-de-penuelas.jpeg",
    "wins": 3,
    "losses": 13
  },
  {
    "name": "Gladiadores de Adjuntas",
    "image": "/team-images/LBP/gladiadores-de-adjuntas.jpeg",
    "wins": 6,
    "losses": 10
  }
]

export const teamInfosLAI: TeamInfo[] = [
  {
    "name": "UPR - Arecibo",
    "image": "/team-images/LAI/arecibo.jpeg",
    "wins": 15,
    "losses": 3
  },
  {
    "name": "UPR - Bayamon",
    "image": "/team-images/LAI/bayamon.jpeg",
    "wins": 12,
    "losses": 6
  },
  {
    "name": "UPR - Carolina",
    "image": "/team-images/LAI/carolina.jpeg",
    "wins": 4,
    "losses": 14
  },
  {
    "name": "Universidad Interamericana de Puerto Rico",
    "image": "/team-images/LAI/inter.jpeg",
    "wins": 10,
    "losses": 8
  },
  {
    "name": "Universidad de Sagrado Corazon",
    "image": "/team-images/LAI/sagrado.jpeg",
    "wins": 9,
    "losses": 9
  },
  {
    "name": "Universidad Ana G Mendez",
    "image": "/team-images/LAI/ana.jpeg",
    "wins": 7,
    "losses": 11
  },
  {
    "name": "UPR - Mayagüez",
    "image": "/team-images/LAI/mayaguez.jpeg",
    "wins": 17,
    "losses": 1
  },
  {
    "name": "UPR - Humacao",
    "image": "/team-images/LAI/humacao.jpeg",
    "wins": 11,
    "losses": 7
  },
  {
    "name": "Atlanic University",
    "image": "/team-images/LAI/atlantic.jpeg",
    "wins": 2,
    "losses": 16
  },
  {
    "name": "UPR - Río Piedras",
    "image": "/team-images/LAI/rio-piedras.jpeg",
    "wins": 8,
    "losses": 10
  }
]