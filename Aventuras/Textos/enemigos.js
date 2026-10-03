const DB_ENEMIGOS = {
    // TIER 1: Fácil (Mundo Mortal)
    "rata_espiritual": { nombre: "Rata Busca-Tesoros", hp: 20, ataque: 3, recompensa: { exp: 15, items: [{ id: "hierba_qi", cant: 1 }] } },
    "ganster_callejero": { nombre: "Matón de la Calle", hp: 30, ataque: 5, recompensa: { exp: 10, items: [{ id: "moneda", cant: 5 }, { id: "hierba_qi", cant: 1 }] } },
    "mono_ladron": { nombre: "Mono Ladrón de Píldoras", hp: 35, ataque: 6, recompensa: { exp: 20, items: [{ id: "pildora_salud", cant: 1 }] } },
    
    // TIER 2: Medio (Zonas de Secta Básicas)
    "lobo_espiritual": { nombre: "Lobo de Ojos Rojos", hp: 45, ataque: 8, recompensa: { exp: 30, items: [{ id: "lirio_fuego", cant: 1 }, { id: "hierba_qi", cant: 2 }] } },
    "bandido_camino": { nombre: "Bandido del Camino", hp: 55, ataque: 10, recompensa: { exp: 35, items: [{ id: "moneda", cant: 15 }, { id: "pildora_salud", cant: 1 }] } },
    "cultivador_renegado": { nombre: "Cultivador Renegado (Herido)", hp: 60, ataque: 12, recompensa: { exp: 45, items: [{ id: "pildora_qi", cant: 1 }] } },

    // TIER 3: Difícil (Rivalidades y Jefes Menores)
    "discipulo_arrogante": { nombre: "Wang, Discípulo Arrogante", hp: 70, ataque: 12, recompensa: { exp: 50, items: [{ id: "moneda", cant: 20 }, { id: "pildora_qi", cant: 1 }, { id: "pildora_salud", cant: 1 }] } },
    "oso_piedra": { nombre: "Oso Piel de Piedra", hp: 100, ataque: 14, recompensa: { exp: 60, items: [{ id: "lirio_fuego", cant: 3 }] } },
    "espiritu_madera": { nombre: "Espíritu de Madera Corrupto", hp: 90, ataque: 16, recompensa: { exp: 70, items: [{ id: "hierba_qi", cant: 5 }, { id: "pildora_salud", cant: 2 }] } },

    // TIER 4: Élite (Preparación para Maestro)
    "discipulo_tigre": { nombre: "Espadachín del Tigre Blanco", hp: 150, ataque: 22, recompensa: { exp: 120, items: [{ id: "pildora_qi", cant: 2 }, { id: "pildora_salud", cant: 2 }] } },
    "asesino_sombra": { nombre: "Asesino de la Sombra", hp: 130, ataque: 28, recompensa: { exp: 150, items: [{ id: "moneda", cant: 50 }, { id: "lirio_fuego", cant: 2 }] } },
    "demonio_fuego": { nombre: "Demonio de Fuego Menor", hp: 200, ataque: 25, recompensa: { exp: 250, items: [{ id: "pildora_qi", cant: 3 }, { id: "pildora_salud", cant: 3 }] } }
};
