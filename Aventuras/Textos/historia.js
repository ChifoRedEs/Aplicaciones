const DB_HISTORIA = {
    "inicio": {
        texto: "Despiertas en tu pequeña cabaña. El reclutamiento de la Secta del Dragón Azur comienza hoy.",
        opciones: [
            { texto: "Coger tu Espada de Bambú e ir al pueblo. (Tarda 1 hora)", tiempo: 1, accion: "item", itemId: "espada_madera", cant: 1, nodoSig: "pueblo" }
        ]
    },
    "pueblo": {
        texto: "Un matón local te corta el paso en un callejón: 'Paga peaje si quieres llegar al patio de pruebas, campesino'.",
        opciones: [
            { texto: "¡Enfrentarte a él con tu espada de bambú! (Tarda 1 hora)", tiempo: 1, accion: "combate", enemigo: "ganster_callejero", nodoVictoria: "entrada_secta", nodoDerrota: "muerte" }
        ]
    },
    "muerte": {
        texto: "Has caído en combate. Tu camino hacia la inmortalidad ha terminado.",
        opciones: [ { texto: "Reencarnar (Reiniciar)", accion: "reiniciar" } ]
    },
    "entrada_secta": {
        texto: "Llegas al patio. Un Anciano te evalúa y asiente. 'Eres aceptado como Discípulo Iniciado'. Un maestro te ofrece una sesión de meditación guiada de bienvenida.",
        opciones: [
            { texto: "Aceptar la meditación guiada (+15 Qi). (Tarda 2 horas)", tiempo: 2, accion: "stat", stat: "qi", valor: 15, nodoSig: "patio_central" }
        ]
    },
    "patio_central": {
        texto: "Estás en el Patio Central de la Secta. Diferentes caminos se abren ante ti. ¿Qué decides hacer?",
        opciones: [
            { texto: "Ir a los Jardines Exteriores (Caza Fácil - 2 horas)", tiempo: 2, nodoSig: "jardines" },
            { texto: "Ir al Bosque de Bambú (Caza Peligrosa - 3 horas)", tiempo: 3, nodoSig: "bosque_bambu" },
            { texto: "Entrar al Pabellón del Conocimiento (Acertijo - 1 hora)", tiempo: 1, nodoSig: "pabellon_acertijo" },
            { texto: "Visitar los Barracones (Socializar - 1 hora)", tiempo: 1, nodoSig: "barracones" },
            { texto: "Usar el Horno de Alquimia", nodoSig: "horno_alquimia" },
            { texto: "Dormir en tus aposentos (Descansar - 8 horas)", tiempo: 8, nodoSig: "patio_central" }
        ]
    },
    "jardines": {
        texto: "Los jardines exteriores son seguros, aunque hay plagas escurridizas comiéndose las hierbas espirituales.",
        opciones: [
            { texto: "Atacar a una Rata Busca-Tesoros", accion: "combate", enemigo: "rata_espiritual", nodoVictoria: "patio_central", nodoDerrota: "muerte" },
            { texto: "Atacar a un Mono Ladrón", accion: "combate", enemigo: "mono_ladron", nodoVictoria: "patio_central", nodoDerrota: "muerte" },
            { texto: "Volver al Patio", nodoSig: "patio_central" }
        ]
    },
    "bosque_bambu": {
        texto: "El espeso bosque alberga bestias salvajes con valiosos Lirios de Fuego en su territorio.",
        opciones: [
            { texto: "Luchar contra el Lobo de Ojos Rojos", accion: "combate", enemigo: "lobo_espiritual", nodoVictoria: "patio_central", nodoDerrota: "muerte" },
            { texto: "Buscar a un Bandido del Camino", accion: "combate", enemigo: "bandido_camino", nodoVictoria: "patio_central", nodoDerrota: "muerte" },
            { texto: "Volver al Patio", nodoSig: "patio_central" }
        ]
    },
    "horno_alquimia": {
        texto: "El calor del inmenso horno inunda la sala. Aquí refinarás tus plantas.",
        opciones: [
            { texto: "Abrir menú de Alquimia", accion: "alquimia", nodoSig: "horno_alquimia" },
            { texto: "Volver al Patio", nodoSig: "patio_central" }
        ]
    },
    "pabellon_acertijo": {
        texto: "El Maestro Sabio acaricia su barba. 'Joven discípulo. Te daré una armadura de seda si resuelves este enigma: Soy ligero como una pluma, pero ni el gigante más fuerte puede sostenerme mucho tiempo. ¿Qué soy?'",
        opciones: [
            { texto: "Responder: 'El aliento'", accion: "item", itemId: "tunica_seda", cant: 1, nodoSig: "acertijo_correcto" },
            { texto: "Responder: 'El agua'", nodoSig: "acertijo_incorrecto" },
            { texto: "Responder: 'La sombra'", nodoSig: "acertijo_incorrecto" }
        ]
    },
    "acertijo_correcto": {
        texto: "El Maestro sonríe complacido. 'Excelente mente. Toma esta túnica, aumentará tu vitalidad máxima y te protegerá'.",
        opciones: [
            { texto: "Equipar Túnica (+20 Max HP) y volver.", accion: "stat", stat: "maxHp", valor: 20, nodoSig: "patio_central" }
        ]
    },
    "acertijo_incorrecto": {
        texto: "El Maestro suspira decepcionado. 'Tu mente aún está nublada por la ignorancia terrenal. Vuelve a tus tareas'.",
        opciones: [ { texto: "Volver al Patio", nodoSig: "patio_central" } ]
    },
    "barracones": {
        texto: "Encuentras a Wang, un discípulo mayor arrogante. '¡Eh, novato! Dame todas tus monedas o te enseñaré a respetar a tus superiores'.",
        opciones: [
            { texto: "Darle 10 monedas.", reqItem: "moneda", reqCant: 10, accion: "perderItem", itemId: "moneda", cant: 10, nodoSig: "patio_central" },
            { texto: "¡Desenvainar tu espada y negarte!", accion: "combate", enemigo: "discipulo_arrogante", nodoVictoria: "victoria_wang", nodoDerrota: "muerte" },
            { texto: "Ignorarlo y huir rápidamente.", nodoSig: "patio_central" }
        ]
    },
    "victoria_wang": {
        texto: "Wang escupe sangre y te mira con terror. '¡Me las pagarás!'. Le quitas sus pertenencias de valor.",
        opciones: [ { texto: "Volver al Patio triunfante.", nodoSig: "patio_central" } ]
    }
};
