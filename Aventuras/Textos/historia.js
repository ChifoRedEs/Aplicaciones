
// Textos/historia.js
const DB_HISTORIA = {
    "inicio": {
        texto: "Despiertas en una pequeña cabaña en las afueras de la Provincia del Este. El viento trae el eco de las campanas de la Secta del Dragón Azur. Eres un simple mortal, pero tu sueño es alcanzar la inmortalidad. El reclutamiento anual comienza hoy.",
        opciones: [
            { texto: "Coger tu Espada de Bambú e ir al pueblo.", accion: "item", itemId: "espada_madera", cant: 1, nodoSig: "pueblo" },
            { texto: "Buscar en tu baúl antes de salir.", accion: "item", itemId: "moneda", cant: 10, nodoSig: "baul_revisado" }
        ]
    },
    "baul_revisado": {
        texto: "Encuentras unos ahorros. Con esto podrás comprar comida o sobornar a algún guardia. Coges un viejo palo a modo de arma y sales de casa.",
        opciones: [
            { texto: "Dirigirte al pueblo.", nodoSig: "pueblo" }
        ]
    },
    "pueblo": {
        texto: "El pueblo está a rebosar de jóvenes que aspiran a entrar en las 4 Grandes Sectas. Un matón local te corta el paso en un callejón: 'Paga peaje si quieres llegar al patio de pruebas, campesino'.",
        opciones: [
            { texto: "Pagarle 10 monedas.", reqItem: "moneda", reqCant: 10, accion: "perderItem", itemId: "moneda", cant: 10, nodoSig: "entrada_secta" },
            { texto: "¡Enfrentarte a él!", accion: "combate", enemigo: "ganster_callejero", nodoVictoria: "entrada_secta", nodoDerrota: "muerte" }
        ]
    },
    "muerte": {
        texto: "Tu visión se oscurece. Tu camino hacia la inmortalidad ha terminado antes de empezar.",
        opciones: [
            { texto: "Reencarnar (Reiniciar)", accion: "reiniciar" }
        ]
    },
    "entrada_secta": {
        texto: "Llegas al majestuoso patio de la Secta del Dragón Azur. Los Maestros Comunes evalúan tu talento. Tras una dura prueba física, un Anciano te asiente. 'Tienes un Qi débil, pero tu voluntad es fuerte. Eres aceptado como Discípulo Iniciado'.",
        opciones: [
            { texto: "Comenzar entrenamiento.", accion: "stat", stat: "nivelSecta", valor: 1, nodoSig: "patio_central" } // 1 = Discípulo Común
        ]
    },
    "patio_central": {
        texto: "Estás en el Patio Central de la Secta. Aquí puedes decidir cómo pasar tu tiempo para mejorar tu cultivación antes del torneo de las 4 sectas.",
        opciones: [
            { texto: "Ir al Bosque de Bambú (Recolectar y Combatir)", nodoSig: "bosque_bambu" },
            { texto: "Ir al Horno de Alquimia", nodoSig: "horno_alquimia" },
            { texto: "Meditar en tu celda (+5 Qi)", accion: "stat", stat: "qi", valor: 5, nodoSig: "patio_central" }
        ]
    },
    "bosque_bambu": {
        texto: "El bosque está lleno de energía espiritual, pero también de bestias salvajes. Ves unas hojas brillantes a lo lejos.",
        opciones: [
            { texto: "Recolectar Hierba de Qi.", accion: "item", itemId: "hierba_qi", cant: 1, nodoSig: "encuentro_bosque" },
            { texto: "Volver al Patio.", nodoSig: "patio_central" }
        ]
    },
    "encuentro_bosque": {
        texto: "Mientras recolectas, un Lobo de Ojos Rojos salta de la maleza gruñendo.",
        opciones: [
            { texto: "¡Luchar!", accion: "combate", enemigo: "lobo_espiritual", nodoVictoria: "patio_central", nodoDerrota: "muerte" },
            { texto: "Huir rápidamente al patio.", nodoSig: "patio_central" }
        ]
    },
    "horno_alquimia": {
        texto: "El calor del horno inmenso calienta la sala. Aquí puedes usar tus hierbas para refinar píldoras.",
        opciones: [
            { texto: "Abrir menú de Alquimia", accion: "alquimia", nodoSig: "horno_alquimia" },
            { texto: "Volver al Patio", nodoSig: "patio_central" }
        ]
    }
};
