// Datos de postulados - Premios Juventud Level Up 2026
// Fuente: Google Sheet (id: 1oBT637KrxIOFDLeAqNr1OZoCw-mTcAAWTr3GVM9OkaE)
// Generado a partir de la información compartida por Ju. Revisar antes de publicar.

const CATEGORIAS = [
  { id: "cambio-social", emoji: "✨", nombre: "Agente de Cambio Social" },
  { id: "talento-deportivo", emoji: "⚽", nombre: "Talento Deportivo" },
  { id: "trayectoria", emoji: "❤️", nombre: "Reconocimiento a la Trayectoria Juvenil" },
  { id: "liderazgo-ambiental", emoji: "🌿", nombre: "Liderazgo Ambiental" },
  { id: "lider-del-ano", emoji: "🏆", nombre: "Líder Juvenil del Año" },
  { id: "excelencia-academica", emoji: "🎓", nombre: "Excelencia Académica" },
  { id: "innovacion", emoji: "💻", nombre: "Innovación, Ciencia y Tecnología" },
  { id: "creador-contenido", emoji: "📱", nombre: "Creador de Contenido con Propósito" },
  { id: "voluntariado", emoji: "🤝", nombre: "Voluntariado e Impacto Comunitario" }
];

// Utilidad: URL de imagen de Google Drive a partir del ID del archivo
function driveImg(id, size) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${size || 1000}`;
}

const POSTULADOS = [
  {
    id: "santiago-delgado",
    categoria: "cambio-social",
    nombre: "Santiago Delgado",
    barrio: "Algarra 3",
    resumen: "Bailarín, profesor y director de su propio grupo de danza urbana (be-1) desde 2024, formado por niños y jóvenes de Zipaquirá. En julio de 2026 representó a Colombia en World of Dance, California, junto a la academia V-14 de Bogotá.",
    historia: "Su historia con la danza comenzó hace 4 años y medio. En 2024 creó be-1, su propio grupo de danza urbana infantil y juvenil en Zipaquirá, con el que ha representado al municipio en Ibagué (2024), Neiva (2025) y distintos escenarios de Bogotá y Cundinamarca. Actualmente es bailarín profesional y profesor en la academia V-14 de Bogotá, experiencia que lo llevó a representar a Colombia en World of Dance, California, en julio de 2026.",
    tiempo: "2 años",
    beneficiarios: "~30 niños y jóvenes de forma directa",
    logro: "Representar a Colombia en World of Dance (California, EE. UU.) en julio de 2026, junto a la academia V-14.",
    fotoId: "1gz_PFdy92YZqaC3zRDIBHmQbsz6IKF5q",
    evidenciaIds: ["19PD2HCM1s74yEmUSgIb6YBoJfJkD1Cvv"]
  },
  {
    id: "miguel-lombana",
    categoria: "talento-deportivo",
    nombre: "Miguel Angel Lombana Garnica",
    barrio: "San Carlos",
    resumen: "Deportista apasionado desde pequeño por el fútbol y el running, que ha representado a Zipaquirá con y sin apoyo institucional y está construyendo una comunidad local de corredores.",
    historia: "Comenzó a correr para mejorar su condición física en el fútbol y encontró en el running una forma de buscar su mejor versión sin rendirse. Ha apoyado iniciativas y proyectos deportivos locales y actualmente está creando una comunidad deportiva de running en Zipaquirá.",
    tiempo: "Cerca de 8 años",
    beneficiarios: "La población zipaquireña",
    logro: "Inspirar a otras personas a través de su ejemplo como deportista.",
    fotoId: "1sze3wCns8ktWF_BbePK02m-MBimEFICY",
    evidenciaIds: ["1DjBFY7npnauOqc7vxp0InH5PC-8s6xKi"]
  },
  {
    id: "samuel-toquica",
    categoria: "cambio-social",
    nombre: "Samuel Toquica",
    barrio: "Julio Caro",
    resumen: "Deportista universitario (Administración Deportiva) que combina tenis, pádel y tenis de mesa con liderazgo comunitario: acompañamiento a adultos mayores, música, medio ambiente y representación estudiantil.",
    historia: "Desde pequeño buscó servir desde distintos espacios: acompañando adultos mayores, participando en actividades con niños, promoviendo el cuidado del medio ambiente y representando a su comunidad en escenarios deportivos y académicos. El tenis, el pádel y el tenis de mesa le enseñaron disciplina y constancia, valores que hoy conecta con su liderazgo social mientras estudia Administración Deportiva.",
    tiempo: "Desde los 8 años",
    beneficiarios: "~100 personas de forma directa",
    logro: "Convertir las dificultades familiares y personales en motivación para servir y ser ejemplo para otros jóvenes de Zipaquirá.",
    fotoId: "1MT9jdEIQJvIhIbz7hAZX0e10F3Beeumn",
    evidenciaIds: ["1s5Q_9QCgT6kCsDXx6K3-JFNM7dVJW1Eg"]
  },
  {
    id: "daes-mendez",
    categoria: "talento-deportivo",
    nombre: "Daes Méndez Jiménez",
    barrio: "El Codito",
    resumen: "Jugador de voleibol y preparador físico que convirtió al deporte en una herramienta para salvar su propia vida, y hoy prepara físicamente a deportistas y clubes de Zipaquirá.",
    historia: "Su proceso en el deporte comenzó desde niño, pero un trastorno del sueño y un trastorno alimenticio lo llevaron a un momento crítico del que el deporte —y en particular el voleibol— lo ayudó a salir adelante. Desde entonces se ha dedicado a la preparación física de deportistas de medio y alto rendimiento en clubes como Golden Age Volley Club, Zipaquirá FC, TBT FC, Pachuca FC y el equipo de tenis del Instituto de Zipaquirá, además de deportistas independientes.",
    tiempo: "3 años",
    beneficiarios: "~100 personas o más",
    logro: "Representar a Zipaquirá en dos ocasiones seguidas en los Juegos de Cundinamarca y ser parte del grupo técnico de preparación física de Zipaquirá FC.",
    fotoId: "1ujXH4blOSHZIKANyqVcHneFK4AFHFIEC",
    evidenciaIds: []
  },
  {
    id: "diego-rojas",
    categoria: "trayectoria",
    nombre: "Diego Andrés Rojas Suárez",
    barrio: "Prados del Mirador",
    resumen: "Artista zipaquireño que retrata la cotidianidad del municipio —la plaza de mercado, el parque principal, su gente— y ha desarrollado murales comunitarios, llevando su obra hasta Rusia.",
    historia: "Desde temprana edad ha participado en eventos artísticos en el municipio y en el país, ganando algunos de ellos con obras que muestran la cotidianidad propia de la región. Retrata espacios cotidianos y a quienes los habitan, buscando a quienes suelen pasar desapercibidos, y ha desarrollado murales que embellecen el municipio.",
    tiempo: "Hace más de 10 años",
    beneficiarios: "El ciudadano de a pie que interactúa con el entorno",
    logro: "Representar a Colombia en el exterior, entre otros países en Rusia, llevando pinturas inspiradas en la plaza de mercado de Zipaquirá.",
    fotoId: "1Bzef01xtJ02LWKcqUivFO87DnKGumIPe",
    evidenciaIds: ["10xCT9k79lSLGrPqPcF1RJ0S0vNBTyvGz", "1Fcl02Doed95nKa-jzIRCHO_VVkfSvvoo", "15-jY-bro9x8EWbbJ4z5bWa47UQ59yxyB"]
  },
  {
    id: "diana-parra",
    categoria: "trayectoria",
    nombre: "Diana Mariant Parra Lisarazo",
    barrio: "San Rafael",
    resumen: "Joven con autismo que ha demostrado que su condición no es una barrera: a través del canto y la danza apoya procesos y fundaciones que trabajan con personas con discapacidad.",
    historia: "Ha participado en procesos de formación musical (coro, Big Band, conjunto vallenato) y apoya, mediante su voz y la danza, a organizaciones dirigidas a poblaciones con discapacidad. Ha obtenido méritos en eventos y concursos a escala local y nacional, convirtiéndose en ejemplo de diversidad, perseverancia y superación.",
    tiempo: "7 años",
    beneficiarios: "~200 personas, entre niños y jóvenes con discapacidad",
    logro: "Usar su voz y su talento artístico para visibilizar causas e historias relacionadas con la discapacidad en todo el municipio.",
    fotoId: "1_oefQwdP7aWy84zGqlM_UR5SQcbujxiP",
    evidenciaIds: ["1aoaV6FNc_krqhxuwjK2rWP342cz5POPO"]
  },
  {
    id: "ana-forero",
    categoria: "liderazgo-ambiental",
    nombre: "Ana María Forero Pinzón",
    barrio: "San Carlos",
    resumen: "Joven apicultora, fundadora de Alas de Miel, que usa la apicultura como herramienta de conservación, educación y desarrollo sostenible, cambiando la percepción sobre las abejas.",
    historia: "Su camino comenzó en un proyecto de la Alcaldía de Zipaquirá dirigido a apicultores. Hoy desarrolla su actividad en un predio con cultivo de arándanos, lo que le permitió comprender de cerca la relación entre agricultura y polinizadores. De esa experiencia nació Alas de Miel, con la que produce miel, polen y propóleo, y dicta charlas y capacitaciones para enseñar que las abejas son defensivas, no agresivas, y cumplen un papel fundamental en los ecosistemas.",
    tiempo: "Desde 2021",
    beneficiarios: "Más de 100 personas de forma directa",
    logro: "Generar conciencia sobre la importancia de las abejas, ayudando a cambiar la percepción de que son animales agresivos.",
    fotoId: "1fZfdJnuJx1Gzu8F2SqZppiqvuVpRK9qc",
    evidenciaIds: ["1ea7WVJofe_c2GmujLAiouX8nnqdSpewl", "1Qu5_l_zABT9_m4OSkXEArzZ9-LGQTLuO", "1EfXliAcXUN5zPUhr1XWxRaateSXotYLJ"]
  },
  {
    id: "juan-bustos",
    categoria: "lider-del-ano",
    nombre: "Juan Sebastián Bustos Rodríguez",
    barrio: "Algarra 3",
    resumen: "Gestor cultural independiente y creador de la marca #ZipaEsMásQueSal, que durante el último año ha impulsado festivales, galerías y espacios de emprendimiento cultural en Zipaquirá.",
    historia: "Desde hace 5 años promueve espacios culturales en Zipaquirá, principalmente en la galería Colonial Art. De ahí nació #ZipaEsMásQueSal, con la idea de impulsar la ciudad colaborando entre proyectos, gestores, emprendimientos, empresas y el gobierno municipal. Fue realizador del Festival Alameda de Colores (26 muralistas, 30 emprendimientos), gestionó el 3er Festival Palabras al Aire, ganó la convocatoria Zipaquirá Cultural, Creativa y Sostenible, y actualmente expone la muestra fotográfica \"Instantes de Luz\" con 22 fotógrafos zipaquireños.",
    tiempo: "5 años",
    beneficiarios: "Eventos de hasta 200 asistentes; ~500.000 visitas orgánicas a sus contenidos en el último año",
    logro: "Ver cómo varios artistas y gestores que ha apoyado ahora viven de su arte y sus procesos.",
    fotoId: "1R1Db7TQFM19-RWnZILJoVnUvmUiDWwJm",
    evidenciaIds: []
  },
  {
    id: "sergio-sarmiento",
    categoria: "excelencia-academica",
    nombre: "Sergio Duván Sarmiento Moreno",
    barrio: "San Pablo",
    resumen: "Estudiante de Ingeniería Industrial en UNIMINUTO con promedio cercano a 4.65/5.0, varias Matrículas de Honor, miembro del Consejo Académico y becario de movilidad internacional en Perú.",
    historia: "Ha representado a los estudiantes en espacios institucionales y participó en la construcción del nuevo pensum de Ingeniería Industrial. Obtuvo una beca de movilidad internacional para estudiar un semestre en la Universidad Andina del Cusco (Perú) y realizó su práctica profesional en el sector floricultor. Uno de sus mayores sueños es contribuir al crecimiento de Zipaquirá como ciudad referente a nivel nacional e internacional.",
    tiempo: "Toda su trayectoria universitaria",
    beneficiarios: "Comunidad estudiantil de UNIMINUTO Cundinamarca y Boyacá",
    logro: "Cambiar su propio rumbo de vida: terminar una carrera profesional, vivir experiencias internacionales y demostrarse que la disciplina puede llevarlo más lejos de lo que imaginaba.",
    fotoId: "1KEha21kImS2V62KokMtGVHnxMDw_fWv8",
    evidenciaIds: ["1TydCBqcCl2e0xWdEBV3hvKi7IKWYBL_J"]
  },
  {
    id: "julian-paez",
    categoria: "innovacion",
    nombre: "Julián Estiben Páez Murcia",
    barrio: "Zipaquirá",
    resumen: "Estudiante de Comunicación Social y Periodismo (UNIMINUTO), creador junto a su semillero de \"Voces para el Cambio: Pódcast para el Cambio\", proyecto de investigación con estudiantes del Liceo Integrado de Zipaquirá.",
    historia: "El proyecto nació de una necesidad real dentro del contexto escolar: usar la comunicación para escuchar, dialogar y abordar situaciones de convivencia. Junto a estudiantes del Liceo Integrado de Zipaquirá construyeron un pódcast donde ellos mismos contaron sus experiencias. El proceso llegó a la Universidad Militar (Cajicá), a UNIMINUTO Bogotá y a una ponencia internacional en México, donde obtuvieron el segundo lugar en su línea de investigación.",
    tiempo: "Desde abril de 2024, ~2 años",
    beneficiarios: "~35 personas de forma directa (estudiantes del Liceo Integrado de Zipaquirá)",
    logro: "Llevar un proyecto nacido en Zipaquirá a un escenario de investigación internacional en México.",
    fotoId: "12jgsnivOZ4njZo9U4KwkmBO6IiXqhTS1",
    evidenciaIds: ["1xrVibeyv81ByydvKOJwbtzNKB6zH7EZz"]
  },
  {
    id: "paula-ortiz",
    categoria: "creador-contenido",
    nombre: "Paula Sofía Ortiz Pinilla",
    barrio: "San Rafael",
    resumen: "Creadora de contenido zipaquireña que resalta lo lindo de su ciudad y recomienda lugares y productos locales a través de sus redes sociales.",
    historia: "Empezó a crear contenido hace 2 años y este último año se lo tomó más en serio, motivada por su familia y su pareja. Realiza contenido de recomendaciones de lugares y productos, buscando que su comunidad se anime a probar cosas nuevas gracias a sus videos.",
    tiempo: "2 años",
    beneficiarios: "Varias personas le han escrito agradeciendo haber visitado lugares o probado productos gracias a sus videos",
    logro: "Empezar a hacer colaboraciones con marcas internacionales como Maybelline.",
    fotoId: "1Gft6OlueKZZhmUhCh4kOumHwYbGMWqE3",
    evidenciaIds: []
  },
  {
    id: "sergio-mendoza",
    categoria: "lider-del-ano",
    nombre: "Sergio Andrés Mendoza López",
    barrio: "Villa María",
    resumen: "Presidente del Consejo Municipal de Juventudes de Zipaquirá (2026–2029), con un liderazgo enfocado en participación, salud mental, cultura y política pública juvenil.",
    historia: "Desde 2025 asumió el reto de representar a los jóvenes desde el CMJ, buscando convertirlo en un puente real entre las juventudes, las comunidades y la institucionalidad. Su equipo ha trabajado en articulación institucional, incidencia en la planeación municipal, veeduría a la Política Pública de Juventud y formación en ciudadanía juvenil (estrategia Ruta Joven sobre el Estatuto de Ciudadanía Juvenil).",
    tiempo: "3 años vinculado a procesos de liderazgo juvenil; 1 año como Consejero Municipal de Juventudes",
    beneficiarios: "Jóvenes de diferentes sectores de Zipaquirá",
    logro: "Ser elegido Consejero y posteriormente Presidente del Consejo Municipal de Juventudes, y construir junto a su equipo espacios reales de participación, articulación y gestión para los jóvenes de Zipaquirá.",
    fotoId: "1Kkgt6AUE02kANFoZ-LRy0TwebM19UeMT",
    evidenciaIds: ["1YhMHYZ8q58m9-vA4H15EFLvwaguucv3o"]
  },
  {
    id: "andres-salamanca",
    categoria: "talento-deportivo",
    nombre: "Andrés Felipe Salamanca",
    barrio: "La Libertad",
    resumen: "Ciclista y estudiante de Ciencias del Deporte, desarrollando actualmente el proyecto Origen Race para acercar el ciclismo a más jóvenes de Zipaquirá.",
    historia: "Inició en el ciclismo a los 12 años por vínculos familiares, lo que lo motivó a estudiar Ciencias del Deporte para entrenar de forma más consciente y ayudar a otras personas a iniciar una práctica deportiva o de actividad física.",
    tiempo: "5 años practicando; 3 meses con Origen Race",
    beneficiarios: "Jóvenes interesados en el ciclismo en Zipaquirá",
    logro: "Aprender del deporte y llevarlo a conocer a más personas.",
    fotoId: "1o22wDo8XciZGDa6jllrltTCyzZRmXsj9",
    evidenciaIds: ["1L7hK3iCcB3u8XpJn_ROvU3HV53tmoHRo"]
  },
  {
    id: "yeimy-gutierrez",
    categoria: "voluntariado",
    nombre: "Yeimy Natalia Gutiérrez Lisca",
    barrio: "San Jorge (rural)",
    resumen: "Consejera de juventudes campesinas que organiza soluciones comunitarias en su vereda: desde arreglar una vía hasta esterilizar mascotas abandonadas en su propia casa.",
    historia: "Creció en el campo viendo a su mamá ayudar a los demás. Estudia producción de ganadería sostenible. Organizó una chocolatada navideña para unir a la comunidad, gestionó maquinaria de Obras Públicas para reparar una vía dañada con material aportado por los vecinos, ofreció su casa para jornadas de esterilización de mascotas (15 esterilizadas en la primera jornada) y colaboró con el CMJ en una jornada de reforestación.",
    tiempo: "Año y medio aproximadamente",
    beneficiarios: "Más de las que había imaginado, según sus propias palabras",
    logro: "Poder ayudar a su comunidad sin esperar nada a cambio.",
    fotoId: "1sLm76IGWYYframl465y5BhlwyymATFQ8",
    evidenciaIds: ["1hkXb7yf-3LoRdH44JV8hFqDFMsoPmLSX", "1QIddgd55pcVko5tn4s2XoS9yuQOAcGsv", "1lG2uu1U6a9lj-y-c5Ds4HTVzzfRgKEYj", "1RaPGNkvwyX-AaBMD69R1nBuAGLMMoDBs", "1QBVx8uqHCEtRjvvomths4Vhzs4DxVY7k"]
  },
  {
    id: "alejandro-noval",
    categoria: "trayectoria",
    nombre: "Alejandro Noval Pinzón",
    barrio: "Algarra III",
    resumen: "Seis años de trabajo comunal y ambiental ininterrumpido: ex edil de la Comuna 4, líder comunal en Algarra III y activista ambiental en el Páramo de Guerrero.",
    historia: "Estudiante de Ciencia Política que hace 6 años inició este camino buscando que los jóvenes tuvieran incidencia real en las decisiones del municipio. Ha ejercido como edil de la Comuna 4, liderado jornadas de restauración ecológica y siembra de frailejones nativos en el Páramo de Guerrero, y dinamizado comités de la Plataforma de Juventudes (Ojo Público, Enlace y Acción, Buen Ambiente, Comunicaciones).",
    tiempo: "6 años",
    beneficiarios: "Más de 2.000 personas de forma directa e indirecta",
    logro: "Sostener un proceso legítimo de vocería y trabajo territorial, ganando la confianza de los vecinos de su comuna y de los jóvenes del municipio.",
    fotoId: "1s_5i3oxBdGGijEHnRxvPvB6Z-x6ghEXr",
    evidenciaIds: ["1HFN9IBvJDSgw0QOCdkdZ49ArAXf2S4CP", "1l2XrJs7XJSxD4ZTBvDxWMVjOFZPX-_4T"]
  },
  {
    id: "sebastian-abello",
    categoria: "creador-contenido",
    nombre: "Sebastián Abello",
    barrio: "Centro",
    nota_interna: "Postulación presentada por Juan Sebastián Cárdenas Abello a nombre de un tercero. Confirmar con Ju el nombre exacto a mostrar antes de publicar.",
    resumen: "Administrador de negocios y creador de Zipaquirá Emprende, una comunidad de más de 500 emprendedores locales, y de Zipa Lo Tiene, una vitrina para conectar comercios con clientes.",
    historia: "Recorriendo Zipaquirá encontró negocios construidos con mucho esfuerzo que no tenían visibilidad ni conexiones para crecer. Así nació Zipaquirá Emprende: formación empresarial gratuita, networking, difusión de convocatorias y contenido audiovisual que ha visibilizado a más de 80 emprendimientos. Ahora desarrolla Zipa Lo Tiene, una vitrina comercial para conectar clientes con los negocios de la ciudad.",
    tiempo: "Cerca de dos años",
    beneficiarios: "Más de 500 emprendedores en la comunidad; más de 80 emprendimientos visibilizados directamente",
    logro: "Ver emprendimientos que vendían en la calle lograr pasar a un local propio gracias a la visibilidad y las nuevas conexiones.",
    fotoId: "1wh9WGkk8_11wvKMv3lssYHIBzZnsSssx",
    evidenciaIds: ["1IdX6AsMcAKDXIF-NWGMF4VYT5VD3ggZ4"]
  },
  {
    id: "darwin-lizarazo",
    categoria: "trayectoria",
    nombre: "Darwin Gabriel Lizarazo Ayala",
    organizacion: "Colectivo Somos Uno Zipaquirá",
    barrio: "Arboleda San Rafael",
    resumen: "Vocero del colectivo Somos Uno Zipaquirá (antes Movimiento 180°), que desde 2021 ha llevado la participación juvenil al Consejo Municipal de Juventudes y a la construcción de política pública, con un programa de salud mental que ya impactó a más de 600 jóvenes.",
    historia: "El proceso nació el 14 de julio de 2021 como Movimiento 180°, y logró 7 curules en el CMJ 2022-2025. En 2025 se transformó en Somos Uno Zipaquirá, obteniendo 5 curules para 2026-2029. A lo largo de estos años impulsaron el Cultural Day, veedurías ciudadanas, jornadas de limpieza (Limpiatón), aportes a la Política Pública de Juventudes de Zipaquirá y Cundinamarca, y en 2026 un programa de salud mental para jóvenes.",
    tiempo: "Desde 2021",
    beneficiarios: "Más de 1.500 personas a lo largo de la trayectoria; más de 600 jóvenes por el programa de salud mental en 2026",
    logro: "Convertir la participación juvenil en representación real y sostenida en el tiempo, con presencia continua en el Consejo Municipal de Juventudes desde 2022 hasta 2029.",
    fotoId: "1zrjg5fdxzv4fNLUmhyW9ZCSqytBF3uku",
    evidenciaIds: ["1XWcXGu4SHtU_Uz2YG4mPbZ-MIRu099Gr"]
  }
];
