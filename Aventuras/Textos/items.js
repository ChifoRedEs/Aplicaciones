// Textos/items.js
const DB_ITEMS = {
    "moneda": { nombre: "Moneda de Cobre", tipo: "recurso", desc: "Moneda común en los reinos mortales." },
    "hierba_qi": { nombre: "Hierba de Qi Menor", tipo: "material", desc: "Una planta que emana una ligera energía verde." },
    "lirio_fuego": { nombre: "Lirio de Llama", tipo: "material", desc: "Crece cerca de volcanes. Caliente al tacto." },
    "pildora_qi": { nombre: "Píldora de Concentración", tipo: "consumible", desc: "Otorga +10 de Qi al consumirse.", efecto: { stat: "qi", valor: 10 } },
    "pildora_salud": { nombre: "Píldora de Sangre", tipo: "consumible", desc: "Restaura 50 HP.", efecto: { stat: "hp", valor: 50 } },
    "espada_madera": { nombre: "Espada de Bambú", tipo: "arma", ataque: 5, desc: "Arma de entrenamiento para iniciados." },
    "espada_acero": { nombre: "Espada de Acero Frío", tipo: "arma", ataque: 15, desc: "Arma estándar de los Discípulos Comunes." }
};

const DB_ALQUIMIA = [
    {
        resultado: "pildora_qi",
        ingredientes: { "hierba_qi": 2 },
        nivelReq: 1, // Nivel de Qi requerido
        desc: "Combina 2 Hierbas de Qi Menor para crear una píldora."
    },
    {
        resultado: "pildora_salud",
        ingredientes: { "hierba_qi": 1, "lirio_fuego": 1 },
        nivelReq: 2,
        desc: "Crea una píldora curativa básica."
    }
];

