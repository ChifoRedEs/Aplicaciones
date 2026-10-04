const HISTORIA = {
    "inicio": {
        texto: "La lluvia golpea los tejados de la Secta del Dragón Azur. Eres un sirviente que barre los patios exteriores. Esta noche, mientras limpias la biblioteca, encuentras un panel suelto en la pared. Al moverlo, descubres un antiguo manual de cultivación polvoriento y una pequeña píldora roja que emana un calor antinatural.",
        opciones: [
            { texto: "Tomar el manual y la píldora en secreto.", set: ["manual_prohibido", "pildora_roja"], nodoSig: "robo_secreto" },
            { texto: "Dejarlo todo donde está e informar al Maestro de la Biblioteca.", nodoSig: "camino_honesto" }
        ]
    },
    "robo_secreto": {
        texto: "Escondes los objetos entre tus ropas. Esa misma noche, en tu celda, decides dar tu primer paso hacia la cultivación.",
        opciones: [
            { texto: "Tragar la píldora roja inmediatamente para ganar poder.", req: ["pildora_roja"], nodoSig: "muerte_pildora" },
            { texto: "Leer el manual prohibido toda la noche.", req: ["manual_prohibido"], nodoSig: "lectura_manual" }
        ]
    },
    "camino_honesto": {
        texto: "El Maestro Anciano acaricia su barba blanca cuando le entregas los objetos. 'Has resistido la tentación, joven. Ese manual contiene artes demoníacas que te habrían destruido. Por tu lealtad, te acepto como mi discípulo'.",
        opciones: [
            { texto: "Aceptar y comenzar tu entrenamiento oficial.", set: ["discipulo_oficial"], nodoSig: "patio_entrenamiento" }
        ]
    },
    "muerte_pildora": {
        texto: "Tus meridianos, frágiles como cristal, no soportan la violenta energía del Lirio de Llama concentrado en la píldora. Ardes desde dentro. Tu camino a la inmortalidad termina aquí.",
        opciones: [
            { texto: "Volver a empezar", nodoSig: "inicio" }
        ]
    },
    "lectura_manual": {
        texto: "El manual detalla el 'Arte de la Sombra Respirante'. Tras semanas practicando en secreto, logras condensar tu primer hilo de Qi. Un día, un matón de la secta te acorrala para robarte tu ración de comida.",
        opciones: [
            { texto: "Usar tu nueva técnica de sombras para esquivarlo y huir.", nodoSig: "huida_sombras" },
            { texto: "Entregarle la comida. Mantener un perfil bajo.", nodoSig: "perfil_bajo" }
        ]
    },
    "patio_entrenamiento": {
        texto: "Como discípulo oficial, tu vida cambia. Ahora vistes la túnica blanca del Dragón Azur. Tu maestro te entrega una espada de madera y te ordena golpear un muñeco de bambú mil veces.",
        opciones: [
            { texto: "Entrenar sin descanso hasta que tus manos sangren.", nodoSig: "entrenamiento_duro" }
        ]
    }
};
