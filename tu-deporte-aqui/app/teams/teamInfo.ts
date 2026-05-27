export type League = "BSN" | "LBP" | "LAI"

export interface Player {
  name: string;
  position: string;
  height: string;
  isImport?: boolean;
}

export interface Coach {
  name: string;
  role: string;
}

export interface PastSeasonStats {
  season: string;
  wins: number;
  losses: number;
  notes?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
}

export interface TeamInfo {
  name: string;
  image: string;
  wins: number;
  losses: number;
  coaches?: Coach[];
  players?: Player[];
  pastSeasonStats?: PastSeasonStats[];
  socialLinks?: SocialLinks;
}

export const teamInfosBSN: TeamInfo[] = [
  {
    name: "Santeros de Aguada",
    image: "/team-images/BSN/santeros-de-aguada.jpeg",
    wins: 3,
    losses: 0,
    coaches: [
      { name: 'Rafael "Pachy" Cruz', role: "Head Coach" }
    ],
    players: [
      { name: "Zakai Zeigler", position: "PG", height: "5'9\"" },
      { name: "Iván Gandía Rosa", position: "PG", height: "6'1\"" },
      { name: "Matthew Lee", position: "PG", height: "6'0\"" },
      { name: "Harold Pérez", position: "G", height: "6'4\"" },
      { name: "Robiel Morales", position: "G", height: "6'2\"" },
      { name: "Rigoberto Mendoza", position: "SG", height: "6'3\"", isImport: true },
      { name: "Jase Febres", position: "SG", height: "6'5\"" },
      { name: "John Holland", position: "SF", height: "6'5\"" },
      { name: "Manny Camper", position: "GF", height: "6'7\"" },
      { name: "Miguel Martínez", position: "GF", height: "6'4\"" },
      { name: "Admiral Schofield", position: "F", height: "6'6\"", isImport: true },
      { name: "Leandro Allende", position: "F", height: "6'6\"" },
      { name: "Owen Pérez", position: "C", height: "6'8\"" },
      { name: "Arnaldo Toro", position: "C", height: "6'8\"" },
      { name: "Giancarlo Rosado", position: "C", height: "6'8\"" },
      { name: "John Brown III", position: "C", height: "6'8\"", isImport: true }
    ],
    pastSeasonStats: [
      { season: "BSN 2025", wins: 11, losses: 23, notes: "6th place, Conferencia B" }
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/santerosdeaguada",
      instagram: "https://www.instagram.com/santerosbsn"
    }
  },
  {
    name: "Capitanes de Arecibo",
    image: "/team-images/BSN/capitanes-de-arecibo.jpeg",
    wins: 3,
    losses: 2,
    coaches: [
      { name: "Juan Cardona", role: "Head Coach" }
    ],
    players: [
      { name: "Diego González", position: "PG", height: "6'1\"" },
      { name: "Malachi Smith", position: "PG", height: "6'1\"" },
      { name: "Derrick Walton Jr.", position: "PG", height: "6'1\"", isImport: true },
      { name: "Rafael Pinzón", position: "G", height: "6'6\"" },
      { name: "Jevin Muñiz", position: "G/F", height: "6'6\"" },
      { name: "Alfonso Plummer", position: "SG", height: "6'1\"" },
      { name: "Jonathan Zhao", position: "SG", height: "6'4\"" },
      { name: "Daniel Rosado", position: "SG", height: "6'4\"" },
      { name: "Fabián Rivera", position: "PG", height: "6'4\"" },
      { name: "Juan Pablo Piñeiro", position: "SG", height: "6'4\"" },
      { name: "Justin Reyes", position: "SG", height: "6'4\"" },
      { name: "Geancarlo Peguero", position: "GF", height: "6'5\"" },
      { name: "Marvin Mantilla", position: "SF", height: "6'7\"" },
      { name: "Ramses Meléndez", position: "SF", height: "6'7\"" },
      { name: "Emmy Andújar", position: "F", height: "6'6\"" },
      { name: "Jack McVeigh", position: "PF", height: "6'8\"", isImport: true },
      { name: "Félix Rivera Jr.", position: "PF", height: "6'9\"" },
      { name: "Timothy Soares", position: "C", height: "6'11\"", isImport: true },
      { name: "Matt López", position: "C", height: "7'0\"" },
      { name: "Thomas Robinson", position: "C", height: "6'10\"" }
    ],
    pastSeasonStats: [
      { season: "BSN 2025", wins: 18, losses: 16, notes: "3rd place, Conferencia B" }
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/loscapitanesarecibo",
      instagram: "https://www.instagram.com/arecibocapitanes"
    }
  },
  {
    name: "Vaqueros de Bayamón",
    image: "/team-images/BSN/vaqueros-de-bayamon.jpeg",
    wins: 0,
    losses: 2,
    coaches: [
      { name: "Christian Dalmau", role: "Head Coach" }
    ],
    players: [
      { name: "Gary Browne", position: "PG", height: "6'1\"" },
      { name: "Isiah Gaiter", position: "PG", height: "6'4\"" },
      { name: "Javier Ezquerra", position: "PG", height: "6'1\"" },
      { name: "Khary Mauras", position: "PG", height: "6'0\"" },
      { name: "Daniel Ortiz", position: "G", height: "6'0\"" },
      { name: "Neftalí Acevedo", position: "G", height: "5'11\"" },
      { name: "Javier Mojica", position: "SG", height: "6'3\"" },
      { name: "Stephen Thompson Jr.", position: "SG", height: "6'4\"" },
      { name: "Isaiah Palermo", position: "GF", height: "6'5\"" },
      { name: "Jordan Cintrón", position: "PF", height: "6'8\"" },
      { name: "Reinaldo Balkman", position: "PF", height: "6'8\"" },
      { name: "Luis P. Hernández", position: "C", height: "6'8\"" },
      { name: "Jae Crowder", position: "SF", height: "6'6\"", isImport: true },
      { name: "Jaylin Galloway", position: "SF", height: "6'6\"", isImport: true },
      { name: "Xavier Crooks", position: "PF", height: "6'8\"", isImport: true }
    ],
    pastSeasonStats: [
      { season: "BSN 2025", wins: 24, losses: 10, notes: "1st place, Conferencia A - BSN 2025 Champions" }
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/VaquerosBSN",
      instagram: "https://www.instagram.com/vaquerosbsn"
    }
  },
  {
    name: "Criollos de Caguas",
    image: "/team-images/BSN/criollos-de-caguas.jpeg",
    wins: 2,
    losses: 2,
    coaches: [
      { name: "Wilhelmus Caanen", role: "Head Coach" }
    ],
    players: [
      { name: "Luis Rivera", position: "PG", height: "5'11\"" },
      { name: "Michael O'Connell", position: "PG", height: "6'2\"" },
      { name: "Travis Trice", position: "PG", height: "6'0\"", isImport: true },
      { name: "Christian 'Cuco' López", position: "SG", height: "6'0\"" },
      { name: "Alejandro Ralat", position: "SG", height: "6'2\"" },
      { name: "Jeff Early Jr.", position: "SG", height: "6'3\"" },
      { name: "Hiram Huertas", position: "SG", height: "6'2\"" },
      { name: "Joshua Milton Denton", position: "GF", height: "6'6\"" },
      { name: "Anthony Morales", position: "SF", height: "6'8\"" },
      { name: "Isaiah Stone", position: "SF", height: "6'9\"" },
      { name: "Alexander Kappos", position: "PF", height: "6'10\"" },
      { name: "Maurice Harkless", position: "PF", height: "6'7\"", isImport: true },
      { name: "Richard Núñez", position: "PF", height: "6'9\"" },
      { name: "Oenis Medina", position: "C", height: "6'8\"" },
      { name: "Jorge Bryan Díaz", position: "C", height: "6'11\"" },
      { name: "Moses Brown", position: "C", height: "7'2\"", isImport: true }
    ],
    pastSeasonStats: [
      { season: "BSN 2025", wins: 18, losses: 16, notes: "3rd place, Conferencia A" }
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/caguascriollosbsn",
      instagram: "https://www.instagram.com/caguascriollosbsn"
    }
  },
  {
    name: "Gigantes de Carolina",
    image: "/team-images/BSN/gigantes-de-carolina.jpeg",
    wins: 1,
    losses: 3,
    coaches: [
      { name: "Carlos González", role: "Head Coach" }
    ],
    players: [
      { name: "Evander Ortiz", position: "PG", height: "5'11\"" },
      { name: "Tremont Waters", position: "PG", height: "5'10\"" },
      { name: "Isaac Rosa", position: "SG", height: "6'3\"" },
      { name: "Jaylen Nowell", position: "SG", height: "6'4\"", isImport: true },
      { name: "Joshua Rivera", position: "G", height: "6'6\"" },
      { name: "Jesús Cruz", position: "SF", height: "6'5\"" },
      { name: "Adrián Ocasio", position: "SF", height: "6'7\"" },
      { name: "Chad Baker-Mazara", position: "GF", height: "6'7\"" },
      { name: "Tory San Antonio", position: "GF", height: "6'5\"" },
      { name: "Chris Gastón", position: "PF", height: "6'7\"" },
      { name: "Timajh Parker-Rivera", position: "PF", height: "6'8\"" },
      { name: "Dyondre Domínguez", position: "PF", height: "6'8\"" },
      { name: "Alexander Franklin", position: "F", height: "6'6\"" },
      { name: "Daniel Rivera", position: "F", height: "6'7\"" },
      { name: "Hunter Tyson", position: "F", height: "6'8\"", isImport: true },
      { name: "George Conditt IV", position: "C", height: "6'11\"" },
      { name: "Kristian Doolittle", position: "F", height: "6'7\"", isImport: true }
    ],
    pastSeasonStats: [
      { season: "BSN 2025", wins: 16, losses: 18, notes: "4th place, Conferencia A" }
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/gigantesbsn",
      instagram: "https://www.instagram.com/gigantesbsn"
    }
  },
  {
    name: "Mets de Guaynabo",
    image: "/team-images/BSN/mets-de-guaynabo.jpeg",
    wins: 2,
    losses: 3,
    coaches: [
      { name: "Jorge Rincón", role: "Head Coach" }
    ],
    players: [
      { name: "Javon Bennett", position: "PG", height: "5'10\"" },
      { name: "KJ Maura", position: "PG", height: "5'8\"" },
      { name: "Brandon Knight", position: "PG", height: "6'2\"", isImport: true },
      { name: "Dante Treacy", position: "PG", height: "6'0\"" },
      { name: "Duran 'DJ' Alicea", position: "PG", height: "6'2\"" },
      { name: "Brandon Boyd", position: "G", height: "6'0\"" },
      { name: "Jaysean Paige", position: "G", height: "6'2\"" },
      { name: "William Martínez", position: "SG", height: "6'1\"" },
      { name: "Gianfranco Grafals", position: "SG", height: "6'5\"" },
      { name: "Eric Ayala", position: "SG", height: "6'6\"" },
      { name: "Theo Pinson", position: "GF", height: "6'6\"", isImport: true },
      { name: "Gerardo Texeira", position: "PF", height: "6'7\"" },
      { name: "Wilfredo Rodríguez", position: "PF", height: "6'6\"" },
      { name: "Ryan Pearson", position: "PF", height: "6'6\"" },
      { name: "JJ Romer", position: "PF", height: "6'9\"" },
      { name: "Devin Williams", position: "PF", height: "6'9\"", isImport: true },
      { name: "Ismael Romero", position: "C", height: "6'9\"" }
    ],
    pastSeasonStats: [
      { season: "BSN 2025", wins: 13, losses: 21, notes: "5th place, Conferencia A – Ismael Romero: BSN 2025 Domestic Player of the Year" }
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/metsbasketball",
      instagram: "https://www.instagram.com/metsbaloncesto"
    }
  },
  {
    name: "Osos de Manatí",
    image: "/team-images/BSN/osos-de-manati.jpeg",
    wins: 4,
    losses: 1,
    coaches: [
      { name: "Iván Ríos", role: "Head Coach" }
    ],
    players: [
      { name: "Alex Abreu", position: "PG", height: "5'11\"" },
      { name: "José Gines", position: "PG", height: "6'1\"" },
      { name: "Brayan Calderón", position: "PG", height: "6'0\"" },
      { name: "Ryan Arcidiacono", position: "PG", height: "6'3\"", isImport: true },
      { name: "Giovanni Santiago", position: "G", height: "6'1\"" },
      { name: "Tyquan Rolón", position: "G", height: "6'4\"" },
      { name: "Jhivvan Jackson", position: "G", height: "6'0\"" },
      { name: "Ethan Thompson", position: "SG", height: "6'5\"" },
      { name: "Raymond Cintrón", position: "SG", height: "6'0\"" },
      { name: "Ismael Yomar Cruz", position: "SG", height: "6'3\"" },
      { name: "Jakair Sánchez", position: "SG", height: "6'8\"" },
      { name: "Jonathan Rodríguez", position: "GF", height: "6'5\"" },
      { name: "Alex Morales", position: "GF", height: "6'6\"" },
      { name: "EJ Crawford", position: "GF", height: "6'6\"" },
      { name: "Mike Bruesewitz", position: "F", height: "6'7\"" },
      { name: "Jamil Wilson", position: "F", height: "6'7\"", isImport: true },
      { name: "Christopher Ortiz", position: "F", height: "6'8\"" },
      { name: "Tyler Cook", position: "PF", height: "6'8\"", isImport: true },
      { name: "José Guitián", position: "PF", height: "6'10\"" },
      { name: "Tyler Davis", position: "C", height: "6'10\"" },
      { name: "Cheick Diallo", position: "C", height: "6'9\"", isImport: true }
    ],
    pastSeasonStats: [
      { season: "BSN 2025", wins: 8, losses: 26, notes: "Last place, Conferencia A" }
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/ososdemanati",
      instagram: "https://www.instagram.com/ososdemanati"
    }
  },
  {
    name: "Indios de Mayagüez",
    image: "/team-images/BSN/indios-de-mayaguez.jpeg",
    wins: 1,
    losses: 1,
    coaches: [
      { name: 'Iván "Pipo" Vélez', role: "Head Coach" }
    ],
    players: [
      { name: "Jonathan García", position: "PG", height: "6'0\"" },
      { name: "Nathan Sobey", position: "PG", height: "6'3\"", isImport: true },
      { name: "Neftalí Álvarez", position: "PG", height: "6'0\"" },
      { name: "Yahir Cordero Meléndez", position: "PG/SG", height: "6'2\"" },
      { name: "Nick Lucena", position: "G", height: "6'2\"" },
      { name: "Tjader Fernández", position: "G", height: "5'10\"" },
      { name: "Benito Santiago Jr.", position: "SG", height: "6'6\"" },
      { name: "José Placer", position: "SG", height: "6'2\"" },
      { name: "Luis Henríquez", position: "SF", height: "6'5\"" },
      { name: "Miye Oni", position: "GF", height: "6'5\"", isImport: true },
      { name: "Bradley Camacho", position: "F", height: "6'7\"" },
      { name: "Josué Erazo", position: "F", height: "6'8\"" },
      { name: "Luis Cuascut", position: "PF", height: "6'7\"" },
      { name: "Sam Waardenburg", position: "PF", height: "6'10\"", isImport: true },
      { name: "Kevin Allen", position: "C", height: "6'11\"", isImport: true },
      { name: "Tyrell Harrison", position: "C", height: "7'0\"", isImport: true },
      { name: "Carlos Yao López", position: "C", height: "6'11\"" }
    ],
    pastSeasonStats: [
      { season: "BSN 2025", wins: 21, losses: 13, notes: "1st place, Conferencia B – Coach of the Year: Iván Vélez" }
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/IndiosBSNPR",
      instagram: "https://www.instagram.com/indiosbsnpr"
    }
  },
  {
    name: "Leones de Ponce",
    image: "/team-images/BSN/leones-de-ponce.jpeg",
    wins: 0,
    losses: 2,
    coaches: [
      { name: "Carlos Rivera", role: "Head Coach" }
    ],
    players: [
      { name: "Avry Holmes", position: "PG", height: "6'2\"", isImport: true },
      { name: "Janpier Lezcano", position: "PG", height: "6'2\"" },
      { name: "Johned Walker", position: "PG", height: "5'11\"" },
      { name: "Jezreel De Jesús", position: "G", height: "6'1\"" },
      { name: "Omar Figueroa", position: "G", height: "6'0\"" },
      { name: "Jared Ruiz", position: "SG", height: "6'2\"" },
      { name: "Kenneth Santos", position: "SG", height: "6'1\"" },
      { name: "Terence Davis II", position: "GF", height: "6'4\"", isImport: true },
      { name: "Alejandro Vázquez", position: "G/F", height: "6'4\"" },
      { name: "Bryan Powell", position: "SF", height: "6'7\"" },
      { name: "Aleem Ford", position: "F", height: "6'8\"" },
      { name: "Jordan Murphy", position: "PF", height: "6'7\"" },
      { name: "Christian Negrón", position: "C", height: "6'8\"" }
    ],
    pastSeasonStats: [
      { season: "BSN 2025", wins: 18, losses: 16, notes: "4th place, Conferencia B – BSN 2025 Runners-up (lost Finals 1-4 to Bayamón)" }
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/LeonesPonceBSN",
      instagram: "https://www.instagram.com/leonesponcebsn"
    }
  },
  {
    name: "Atleticos de San German",
    image: "/team-images/BSN/atleticos-de-san-german.jpeg",
    wins: 3,
    losses: 3,
    coaches: [
      { name: "Eddie Casiano", role: "Head Coach" }
    ],
    players: [
      { name: "Jorge L. Pacheco", position: "PG", height: "5'11\"" },
      { name: "André Curbelo", position: "PG", height: "6'0\"" },
      { name: "Christian Pizarro", position: "PG", height: "5'11\"" },
      { name: "Alex Hamilton", position: "G", height: "6'4\"", isImport: true },
      { name: "Kyle Rose", position: "G", height: "6'4\"" },
      { name: "Jorge Matos", position: "G", height: "6'3\"" },
      { name: "Rico Hopping", position: "SG", height: "6'5\"" },
      { name: "Braelee Albert", position: "SF", height: "6'5\"" },
      { name: "Joseph Bull", position: "SF", height: "6'5\"" },
      { name: "Marlon Hargis", position: "F", height: "6'7\"" },
      { name: "Onzie Branch", position: "F", height: "6'6\"" },
      { name: "Jorge Torres", position: "F", height: "6'5\"" },
      { name: "Montrezl Harrell", position: "PF", height: "6'7\"", isImport: true },
      { name: "Antonio Gordon", position: "PF", height: "6'9\"" },
      { name: "Chris Brady", position: "C", height: "6'10\"" },
      { name: "Julián Torres", position: "C", height: "6'9\"" },
      { name: "Nick Perkins", position: "C", height: "6'8\"", isImport: true }
    ],
    pastSeasonStats: [
      { season: "BSN 2025", wins: 15, losses: 19, notes: "5th place, Conferencia B" }
    ],
    socialLinks: {
      facebook: "https://www.facebook.com/AtleticosBSN",
      instagram: "https://www.instagram.com/atleticosbsn"
    }
  }
];

export const teamInfosBaseLBP: TeamInfo[] = [
  {
    name: "Llaneros de Toa Baja",
    image: "/team-images/LBP/llaneros-de-toa-baja.jpeg",
    wins: 12,
    losses: 4,
    socialLinks: {
      facebook: "https://www.facebook.com/ToaBajaLlaneros"
    }
  },
  {
    name: "La Tribu de Mayagüez",
    image: "/team-images/LBP/la-tribu-de-mayaguez.jpeg",
    wins: 9,
    losses: 7,
    socialLinks: {
      facebook: "https://www.facebook.com/p/La-Tribu-Mayag%C3%BCez-LBP-100088112259888"
    }
  },
  {
    name: "San Juan Capitalinos",
    image: "/team-images/LBP/san-juan-capitalinos.jpeg",
    wins: 5,
    losses: 11,
    socialLinks: {
      facebook: "https://www.facebook.com/SanJuanCapitalinos",
      instagram: "https://www.instagram.com/sanjuancapitalinospr"
    }
  },
  {
    name: "Peregrinos de Hormigueros",
    image: "/team-images/LBP/peregrinos-de-hormigueros.jpeg",
    wins: 10,
    losses: 6,
    socialLinks: {
      facebook: "https://www.facebook.com/MayaguezCaciquesLBP",
      instagram: "https://www.instagram.com/peregrinoslbp"
    }
  },
  {
    name: "Artesanos de Las Piedras",
    image: "/team-images/LBP/artesanos-de-las-piedras.jpeg",
    wins: 8,
    losses: 8,
    socialLinks: {
      facebook: "https://www.facebook.com/people/Artesanos-de-Las-Piedras-LBP/61561135176437",
      instagram: "https://www.instagram.com/artesanos_lbp"
    }
  },
  {
    name: "Avancinos de Villalba",
    image: "/team-images/LBP/avancinos-de-villalba.jpeg",
    wins: 7,
    losses: 9,
    socialLinks: {
      facebook: "https://www.facebook.com/people/Avancinos-de-Villalba-LBP/100057386532191"
    }
  },
  {
    name: "Bravos de Cidra",
    image: "/team-images/LBP/bravos-de-cidra.jpeg",
    wins: 14,
    losses: 2,
    socialLinks: {
      facebook: "https://www.facebook.com/bravosdecidrabasketball"
    }
  },
  {
    name: "Cafeteros de Yauco",
    image: "/team-images/LBP/cafeteros-de-yauco.jpeg",
    wins: 11,
    losses: 5,
    socialLinks: {
      facebook: "https://www.facebook.com/Yaucocafeteroslbp"
    }
  },
  {
    name: "Caribes de Peñuelas",
    image: "/team-images/LBP/caribes-de-penuelas.jpeg",
    wins: 3,
    losses: 13
  },
  {
    name: "Gladiadores de Adjuntas",
    image: "/team-images/LBP/gladiadores-de-adjuntas.jpeg",
    wins: 6,
    losses: 10
  }
];

export const teamInfosLAI: TeamInfo[] = [
  {
    name: "UPR - Arecibo",
    image: "/team-images/LAI/arecibo.jpeg",
    wins: 15,
    losses: 3
  },
  {
    name: "UPR - Bayamon",
    image: "/team-images/LAI/bayamon.jpeg",
    wins: 12,
    losses: 6,
    socialLinks: {
      facebook: "https://www.facebook.com/uprb.basketball",
      instagram: "https://www.instagram.com/uprb.basketball"
    }
  },
  {
    name: "UPR - Carolina",
    image: "/team-images/LAI/carolina.jpeg",
    wins: 4,
    losses: 14
  },
  {
    name: "Universidad Interamericana de Puerto Rico",
    image: "/team-images/LAI/inter.jpeg",
    wins: 10,
    losses: 8
  },
  {
    name: "Universidad de Sagrado Corazon",
    image: "/team-images/LAI/sagrado.jpeg",
    wins: 9,
    losses: 9
  },
  {
    name: "Universidad Ana G Mendez",
    image: "/team-images/LAI/ana.jpeg",
    wins: 7,
    losses: 11
  },
  {
    name: "UPR - Mayagüez",
    image: "/team-images/LAI/mayaguez.jpeg",
    wins: 17,
    losses: 1
  },
  {
    name: "UPR - Humacao",
    image: "/team-images/LAI/humacao.jpeg",
    wins: 11,
    losses: 7
  },
  {
    name: "Atlantic University",
    image: "/team-images/LAI/atlantic.jpeg",
    wins: 2,
    losses: 16
  },
  {
    name: "UPR - Río Piedras",
    image: "/team-images/LAI/rio-piedras.jpeg",
    wins: 8,
    losses: 10
  }
];