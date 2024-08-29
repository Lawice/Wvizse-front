import { JobCard } from "./jobcard";
import { Faculty,Course } from "./enum";

export const JobCards : JobCard[] = [ 
    {
        name: "Directeur Technique",
        cursus : Course.PROG,
        school: Faculty.HORDE,
        picture:  "images/test_prog.png",
        pictureSmall:"images/test_prog2.png",
        tags: ["Directeur Technique", "CTO", "Chief Technology Officer"],
        skills: ["Maîtrise des langages de programmation"],
        description :"Le métier de Directeur Technique (Chief Technology Officer, CTO) est un rôle clé dans une organisation, particulièrement dans les entreprises technologiques et les startups. Le CTO est responsable de la direction technologique de l'entreprise, supervisant le développement et l'implémentation de la stratégie technologique pour s'assurer que les objectifs commerciaux sont atteints.",
        visible : true
    },{
        name: "Architecte Technique",
        cursus : Course.PROG,
        school: Faculty.HORDE,
        picture:  "images/test_prog.png",
        pictureSmall:"images/test_prog2.png",
        tags: ["Architecte Technique"],
        skills: ["Maîtrise des langages de programmation"],
        description :`L'architecte technique conçoit l'architecture technique du système d'information. C'est-à-dire qu'il contrôle tout l'aspect technique des différents projets informatiques qui sont sous sa gestion. Il définit les standards techniques du système d'information dans son domaine précis d'activité. Pour cela, il peut réaliser un audit des performances des systèmes existants. A la recherche de toujours plus de fiabilité, il élimine les dysfonctionnements potentiels et optimise l'architecture technique en définissant les normes et les procédures qu'il rédige dans ses cahiers d'architecture..`,
        visible : true
    },{
        name: "Directeur Artistique",
        cursus : Course.ART,
        school: Faculty.HORDE,
        picture:  "images/test_art.png",
        pictureSmall:"images/test_art2.png",
        tags: ["Directeur Artistique","DA","Artistic Director"],
        skills: ["Conception visuelle"],
        description :`Le DA traduit la vision artistique du créateur et s'assure que tous les artistes et techniciens respectent cette direction artistique. Il est chargé de déterminer le style ou l'aspect visuel global du projet et de le communiquer aux artistes qui créeront les éléments visuels nécessaires, tels que des illustrations, des graphiques, des photographies, des peintures ou des décors pour un scénario, parmi d'autres ressources artistiques. Le directeur artistique joue un rôle clé dans la préservation de la cohérence graphique et esthétique à tous les niveaux du projet.`,
        visible : true
    },{
        name: "Game Designer",
        cursus : Course.GD,
        school: Faculty.HORDE,
        picture:  "images/test_gd.png",
        pictureSmall:"images/test_gd2.png",
        tags: ["Game Designer","GD"],
        skills: ["Maîtrise des langages de programmation"],
        description :`Un game designer, ou concepteur de jeu en français, est un professionnel spécialisé dans la création et la conception de jeux vidéo. Le rôle du game designer est de définir les règles, les mécaniques de jeu, les niveaux, les objectifs et l’ensemble des éléments qui composent l’expérience interactive d’un jeu. Les game designers travaillent en étroite collaboration avec d’autres membres de l’équipe de développement, tels que les programmeurs, les artistes, les scénaristes et les testeurs, pour donner vie à la vision du jeu.`,
        visible : true
    },{
        name: "Directeur Technique Graphique",
        cursus : Course.TA,
        school: Faculty.HORDE,
        picture:  "images/test_techart.png",
        pictureSmall:"images/test_techart2.png",
        tags: ["Directeur Technique Graphique","Graphic Technical Director"],
        skills: [],
        description :`Un Directeur Technique Art se concentre principalement sur la liaison entre les équipes artistiques et techniques pour assurer que les visions artistiques sont réalisables d'un point de vue technique. Ce rôle implique de superviser et d'optimiser les pipelines de production artistiques, d'implémenter des outils et des techniques pour améliorer l'efficacité et la qualité des actifs artistiques, et de résoudre des problèmes techniques complexes liés à la production artistique.`,
        visible : true
    },{
        name: "Producer",
        cursus : Course.PROD,
        school: Faculty.HORDE,
        picture:  "images/test_prod.png",
        pictureSmall:"images/test_prod2.png",
        tags: ["Producer","Producteur"],
        skills: [],
        description :`Un producteur de jeu vidéo est une personne responsable de la supervision et de la gestion globale du processus de développement d’un jeu vidéo. Le rôle du producteur de jeu vidéo est souvent varié et peut impliquer plusieurs aspects, tels que la planification, la coordination, la budgétisation, la gestion des ressources, la prise de décisions stratégiques, et la supervision de l’équipe de développement.`,
        visible : true
    },{
        name: "Sound Designer",
        cursus : Course.SOUND,
        school: Faculty.HORDE,
        picture:  "images/test_sound.png",
        pictureSmall:"images/test_sound2.png",
        tags: ["Sound Designer","Concepteur sonore"],
        skills: [],
        description :`Le métier de compositeur et sound designer dans l’industrie du jeu vidéo est essentiel pour créer une expérience immersive et captivante. Ces professionnels sont responsables de la conception sonore du jeu, comprenant à la fois la composition musicale et la création des effets sonores.`,
        visible : true
    },{
        name: "Responsable de Production Evénementiel",
        cursus : Course.BUSN,
        school: Faculty.HORDE,
        picture:  "images/test_event.png",
        pictureSmall:"images/test_event2.png",
        tags: ["Responsable de Production Evénementiel","Event Production Manager"],
        skills: [],
        description :`Le responsable de production événementielle est en charge de la planification, de la coordination et de la réalisation d'événements, tels que des salons professionnels, des séminaires, des congrès, des lancements de produits, des soirées de gala, etc. Il est responsable de la gestion budgétaire, de la logistique, de la communication et de la coordination des équipes en place pour que l'événement se déroule de manière fluide et professionnelle. Il est le garant du bon déroulement de l'événement et est en contact direct avec les clients pour répondre à leurs besoins et attentes. `,
        visible : true
    },{
        name: "Data Analyst",
        cursus : Course.DATA,
        school: Faculty.TURING,
        picture:  "images/test_turring.png",
        pictureSmall:"images/test_turring2.png",
        tags: ["Data Analyst"],
        skills: [],
        description :`Le Data Analyst collecte, nettoie, organise et analyse de grandes quantités de données dans le but de fournir des informations pertinentes et exploitables pour les entreprises. Grâce à ses compétences en statistiques et en informatique, le Data Analyst identifie les tendances, les corrélations et les modèles cachés dans les données ce qui permet aux entreprises de prendre des décisions éclairées et d'optimiser leurs processus. Il s’appuie sur sa connaissances informatique mais aussi sur les outils basés sur l’Intelligence artificielle à l’instar du Data Scientist qui en est un spécialiste.`,
        visible : true
    }
]