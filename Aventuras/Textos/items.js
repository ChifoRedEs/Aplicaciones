const DB_ITEMS = {
    "moneda": { nombre: "Moneda de Cobre", tipo: "recurso", desc: "Moneda común en los reinos mortales." },
    "hierba_qi": { nombre: "Hierba de Qi Menor", tipo: "material", desc: "Una planta que emana una ligera energía verde." },
    "lirio_fuego": { nombre: "Lirio de Llama", tipo: "material", desc: "Crece cerca de volcanes. Muy útil en alquimia." },
    "pildora_qi": { nombre: "Píldora de Concentración", tipo: "consumible", desc: "Otorga +20 de Qi.", efecto: { stat: "qi", valor: 20 } },
    "pildora_salud": { nombre: "Píldora de Sangre", tipo: "consumible", desc: "Restaura 60 HP.", efecto: { stat: "hp", valor: 60 } },
    "espada_madera": { nombre: "Espada de Bambú", tipo: "arma", ataque: 5, desc: "Arma de entrenamiento para iniciados." },
    "espada_acero": { nombre: "Espada de Acero Frío", tipo: "arma", ataque: 15, desc: "Arma estándar de los Discípulos Comunes." },
    "tunica_seda": { nombre: "Túnica de Seda Espiritual", tipo: "armadura", desc: "Armadura ligera que absorbe daño y aumenta tu vitalidad." },
    "medalla_acertijo": { nombre: "Medalla del Maestro", tipo: "clave", desc: "Prueba de que has superado el enigma." }
};

const DB_ALQUIMIA = [
    {
        resultado: "pildora_qi",
        ingredientes: { "hierba_qi": 2 },
        nivelReq: 1,
        desc: "Combina 2 Hierbas de Qi Menor para ganar experiencia."
    },
    {
        resultado: "pildora_salud",
        ingredientes: { "hierba_qi": 1, "lirio_fuego": 1 },
        nivelReq: 1,
        desc: "Crea una píldora curativa potente (+60 HP)."
    }
];
