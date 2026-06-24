import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// ─── Tipos ───────────────────────────────────────────────────────────────────
type Categoria =
    | "metal-alcalino"
    | "metal-alcalinoterreo"
    | "metal-transicion"
    | "metal-postransicion"
    | "metaloide"
    | "no-metal"
    | "halogen"
    | "gas-noble"
    | "lantanido"
    | "actinido";

type PropiedadVista = "categoria" | "electronegatividad" | "valencia" | "caracter";

interface Elemento {
    numero: number;
    simbolo: string;
    nombre: string;
    masa: number;
    categoria: Categoria;
    electronegatividad: number | null;
    valencia: string;
    caracter: "metal" | "metaloide" | "no metal";
    grupo: number | null;
    periodo: number;
    config: string;
}

// ─── Datos ────────────────────────────────────────────────────────────────────
const elementos: Elemento[] = [
    { numero: 1, simbolo: "H", nombre: "Hidrógeno", masa: 1.008, categoria: "no-metal", electronegatividad: 2.20, valencia: "1", caracter: "no metal", grupo: 1, periodo: 1, config: "1s¹" },
    { numero: 2, simbolo: "He", nombre: "Helio", masa: 4.003, categoria: "gas-noble", electronegatividad: null, valencia: "0", caracter: "no metal", grupo: 18, periodo: 1, config: "1s²" },
    { numero: 3, simbolo: "Li", nombre: "Litio", masa: 6.941, categoria: "metal-alcalino", electronegatividad: 0.98, valencia: "1", caracter: "metal", grupo: 1, periodo: 2, config: "[He] 2s¹" },
    { numero: 4, simbolo: "Be", nombre: "Berilio", masa: 9.012, categoria: "metal-alcalinoterreo", electronegatividad: 1.57, valencia: "2", caracter: "metal", grupo: 2, periodo: 2, config: "[He] 2s²" },
    { numero: 5, simbolo: "B", nombre: "Boro", masa: 10.811, categoria: "metaloide", electronegatividad: 2.04, valencia: "3", caracter: "metaloide", grupo: 13, periodo: 2, config: "[He] 2s² 2p¹" },
    { numero: 6, simbolo: "C", nombre: "Carbono", masa: 12.011, categoria: "no-metal", electronegatividad: 2.55, valencia: "2,4", caracter: "no metal", grupo: 14, periodo: 2, config: "[He] 2s² 2p²" },
    { numero: 7, simbolo: "N", nombre: "Nitrógeno", masa: 14.007, categoria: "no-metal", electronegatividad: 3.04, valencia: "3,5", caracter: "no metal", grupo: 15, periodo: 2, config: "[He] 2s² 2p³" },
    { numero: 8, simbolo: "O", nombre: "Oxígeno", masa: 15.999, categoria: "no-metal", electronegatividad: 3.44, valencia: "2", caracter: "no metal", grupo: 16, periodo: 2, config: "[He] 2s² 2p⁴" },
    { numero: 9, simbolo: "F", nombre: "Flúor", masa: 18.998, categoria: "halogen", electronegatividad: 3.98, valencia: "1", caracter: "no metal", grupo: 17, periodo: 2, config: "[He] 2s² 2p⁵" },
    { numero: 10, simbolo: "Ne", nombre: "Neón", masa: 20.180, categoria: "gas-noble", electronegatividad: null, valencia: "0", caracter: "no metal", grupo: 18, periodo: 2, config: "[He] 2s² 2p⁶" },
    { numero: 11, simbolo: "Na", nombre: "Sodio", masa: 22.990, categoria: "metal-alcalino", electronegatividad: 0.93, valencia: "1", caracter: "metal", grupo: 1, periodo: 3, config: "[Ne] 3s¹" },
    { numero: 12, simbolo: "Mg", nombre: "Magnesio", masa: 24.305, categoria: "metal-alcalinoterreo", electronegatividad: 1.31, valencia: "2", caracter: "metal", grupo: 2, periodo: 3, config: "[Ne] 3s²" },
    { numero: 13, simbolo: "Al", nombre: "Aluminio", masa: 26.982, categoria: "metal-postransicion", electronegatividad: 1.61, valencia: "3", caracter: "metal", grupo: 13, periodo: 3, config: "[Ne] 3s² 3p¹" },
    { numero: 14, simbolo: "Si", nombre: "Silicio", masa: 28.086, categoria: "metaloide", electronegatividad: 1.90, valencia: "4", caracter: "metaloide", grupo: 14, periodo: 3, config: "[Ne] 3s² 3p²" },
    { numero: 15, simbolo: "P", nombre: "Fósforo", masa: 30.974, categoria: "no-metal", electronegatividad: 2.19, valencia: "3,5", caracter: "no metal", grupo: 15, periodo: 3, config: "[Ne] 3s² 3p³" },
    { numero: 16, simbolo: "S", nombre: "Azufre", masa: 32.065, categoria: "no-metal", electronegatividad: 2.58, valencia: "2,4,6", caracter: "no metal", grupo: 16, periodo: 3, config: "[Ne] 3s² 3p⁴" },
    { numero: 17, simbolo: "Cl", nombre: "Cloro", masa: 35.453, categoria: "halogen", electronegatividad: 3.16, valencia: "1,3,5,7", caracter: "no metal", grupo: 17, periodo: 3, config: "[Ne] 3s² 3p⁵" },
    { numero: 18, simbolo: "Ar", nombre: "Argón", masa: 39.948, categoria: "gas-noble", electronegatividad: null, valencia: "0", caracter: "no metal", grupo: 18, periodo: 3, config: "[Ne] 3s² 3p⁶" },
    { numero: 19, simbolo: "K", nombre: "Potasio", masa: 39.098, categoria: "metal-alcalino", electronegatividad: 0.82, valencia: "1", caracter: "metal", grupo: 1, periodo: 4, config: "[Ar] 4s¹" },
    { numero: 20, simbolo: "Ca", nombre: "Calcio", masa: 40.078, categoria: "metal-alcalinoterreo", electronegatividad: 1.00, valencia: "2", caracter: "metal", grupo: 2, periodo: 4, config: "[Ar] 4s²" },
    { numero: 21, simbolo: "Sc", nombre: "Escandio", masa: 44.956, categoria: "metal-transicion", electronegatividad: 1.36, valencia: "3", caracter: "metal", grupo: 3, periodo: 4, config: "[Ar] 3d¹ 4s²" },
    { numero: 22, simbolo: "Ti", nombre: "Titanio", masa: 47.867, categoria: "metal-transicion", electronegatividad: 1.54, valencia: "2,3,4", caracter: "metal", grupo: 4, periodo: 4, config: "[Ar] 3d² 4s²" },
    { numero: 23, simbolo: "V", nombre: "Vanadio", masa: 50.942, categoria: "metal-transicion", electronegatividad: 1.63, valencia: "2,3,4,5", caracter: "metal", grupo: 5, periodo: 4, config: "[Ar] 3d³ 4s²" },
    { numero: 24, simbolo: "Cr", nombre: "Cromo", masa: 51.996, categoria: "metal-transicion", electronegatividad: 1.66, valencia: "2,3,6", caracter: "metal", grupo: 6, periodo: 4, config: "[Ar] 3d⁵ 4s¹" },
    { numero: 25, simbolo: "Mn", nombre: "Manganeso", masa: 54.938, categoria: "metal-transicion", electronegatividad: 1.55, valencia: "2,3,4,7", caracter: "metal", grupo: 7, periodo: 4, config: "[Ar] 3d⁵ 4s²" },
    { numero: 26, simbolo: "Fe", nombre: "Hierro", masa: 55.845, categoria: "metal-transicion", electronegatividad: 1.83, valencia: "2,3", caracter: "metal", grupo: 8, periodo: 4, config: "[Ar] 3d⁶ 4s²" },
    { numero: 27, simbolo: "Co", nombre: "Cobalto", masa: 58.933, categoria: "metal-transicion", electronegatividad: 1.88, valencia: "2,3", caracter: "metal", grupo: 9, periodo: 4, config: "[Ar] 3d⁷ 4s²" },
    { numero: 28, simbolo: "Ni", nombre: "Níquel", masa: 58.693, categoria: "metal-transicion", electronegatividad: 1.91, valencia: "2,3", caracter: "metal", grupo: 10, periodo: 4, config: "[Ar] 3d⁸ 4s²" },
    { numero: 29, simbolo: "Cu", nombre: "Cobre", masa: 63.546, categoria: "metal-transicion", electronegatividad: 1.90, valencia: "1,2", caracter: "metal", grupo: 11, periodo: 4, config: "[Ar] 3d¹⁰ 4s¹" },
    { numero: 30, simbolo: "Zn", nombre: "Zinc", masa: 65.38, categoria: "metal-transicion", electronegatividad: 1.65, valencia: "2", caracter: "metal", grupo: 12, periodo: 4, config: "[Ar] 3d¹⁰ 4s²" },
    { numero: 31, simbolo: "Ga", nombre: "Galio", masa: 69.723, categoria: "metal-postransicion", electronegatividad: 1.81, valencia: "3", caracter: "metal", grupo: 13, periodo: 4, config: "[Ar] 3d¹⁰ 4s² 4p¹" },
    { numero: 32, simbolo: "Ge", nombre: "Germanio", masa: 72.630, categoria: "metaloide", electronegatividad: 2.01, valencia: "2,4", caracter: "metaloide", grupo: 14, periodo: 4, config: "[Ar] 3d¹⁰ 4s² 4p²" },
    { numero: 33, simbolo: "As", nombre: "Arsénico", masa: 74.922, categoria: "metaloide", electronegatividad: 2.18, valencia: "3,5", caracter: "metaloide", grupo: 15, periodo: 4, config: "[Ar] 3d¹⁰ 4s² 4p³" },
    { numero: 34, simbolo: "Se", nombre: "Selenio", masa: 78.971, categoria: "no-metal", electronegatividad: 2.55, valencia: "2,4,6", caracter: "no metal", grupo: 16, periodo: 4, config: "[Ar] 3d¹⁰ 4s² 4p⁴" },
    { numero: 35, simbolo: "Br", nombre: "Bromo", masa: 79.904, categoria: "halogen", electronegatividad: 2.96, valencia: "1,3,5,7", caracter: "no metal", grupo: 17, periodo: 4, config: "[Ar] 3d¹⁰ 4s² 4p⁵" },
    { numero: 36, simbolo: "Kr", nombre: "Kriptón", masa: 83.798, categoria: "gas-noble", electronegatividad: 3.00, valencia: "0", caracter: "no metal", grupo: 18, periodo: 4, config: "[Ar] 3d¹⁰ 4s² 4p⁶" },
    { numero: 37, simbolo: "Rb", nombre: "Rubidio", masa: 85.468, categoria: "metal-alcalino", electronegatividad: 0.82, valencia: "1", caracter: "metal", grupo: 1, periodo: 5, config: "[Kr] 5s¹" },
    { numero: 38, simbolo: "Sr", nombre: "Estroncio", masa: 87.62, categoria: "metal-alcalinoterreo", electronegatividad: 0.95, valencia: "2", caracter: "metal", grupo: 2, periodo: 5, config: "[Kr] 5s²" },
    { numero: 39, simbolo: "Y", nombre: "Itrio", masa: 88.906, categoria: "metal-transicion", electronegatividad: 1.22, valencia: "3", caracter: "metal", grupo: 3, periodo: 5, config: "[Kr] 4d¹ 5s²" },
    { numero: 40, simbolo: "Zr", nombre: "Circonio", masa: 91.224, categoria: "metal-transicion", electronegatividad: 1.33, valencia: "4", caracter: "metal", grupo: 4, periodo: 5, config: "[Kr] 4d² 5s²" },
    { numero: 41, simbolo: "Nb", nombre: "Niobio", masa: 92.906, categoria: "metal-transicion", electronegatividad: 1.60, valencia: "3,5", caracter: "metal", grupo: 5, periodo: 5, config: "[Kr] 4d⁴ 5s¹" },
    { numero: 42, simbolo: "Mo", nombre: "Molibdeno", masa: 95.96, categoria: "metal-transicion", electronegatividad: 2.16, valencia: "2,3,4,6", caracter: "metal", grupo: 6, periodo: 5, config: "[Kr] 4d⁵ 5s¹" },
    { numero: 43, simbolo: "Tc", nombre: "Tecnecio", masa: 98, categoria: "metal-transicion", electronegatividad: 1.90, valencia: "4,6,7", caracter: "metal", grupo: 7, periodo: 5, config: "[Kr] 4d⁵ 5s²" },
    { numero: 44, simbolo: "Ru", nombre: "Rutenio", masa: 101.07, categoria: "metal-transicion", electronegatividad: 2.20, valencia: "2,3,4,6,8", caracter: "metal", grupo: 8, periodo: 5, config: "[Kr] 4d⁷ 5s¹" },
    { numero: 45, simbolo: "Rh", nombre: "Rodio", masa: 102.906, categoria: "metal-transicion", electronegatividad: 2.28, valencia: "2,3,4", caracter: "metal", grupo: 9, periodo: 5, config: "[Kr] 4d⁸ 5s¹" },
    { numero: 46, simbolo: "Pd", nombre: "Paladio", masa: 106.42, categoria: "metal-transicion", electronegatividad: 2.20, valencia: "2,4", caracter: "metal", grupo: 10, periodo: 5, config: "[Kr] 4d¹⁰" },
    { numero: 47, simbolo: "Ag", nombre: "Plata", masa: 107.868, categoria: "metal-transicion", electronegatividad: 1.93, valencia: "1,2", caracter: "metal", grupo: 11, periodo: 5, config: "[Kr] 4d¹⁰ 5s¹" },
    { numero: 48, simbolo: "Cd", nombre: "Cadmio", masa: 112.411, categoria: "metal-transicion", electronegatividad: 1.69, valencia: "2", caracter: "metal", grupo: 12, periodo: 5, config: "[Kr] 4d¹⁰ 5s²" },
    { numero: 49, simbolo: "In", nombre: "Indio", masa: 114.818, categoria: "metal-postransicion", electronegatividad: 1.78, valencia: "3", caracter: "metal", grupo: 13, periodo: 5, config: "[Kr] 4d¹⁰ 5s² 5p¹" },
    { numero: 50, simbolo: "Sn", nombre: "Estaño", masa: 118.710, categoria: "metal-postransicion", electronegatividad: 1.96, valencia: "2,4", caracter: "metal", grupo: 14, periodo: 5, config: "[Kr] 4d¹⁰ 5s² 5p²" },
    { numero: 51, simbolo: "Sb", nombre: "Antimonio", masa: 121.760, categoria: "metaloide", electronegatividad: 2.05, valencia: "3,5", caracter: "metaloide", grupo: 15, periodo: 5, config: "[Kr] 4d¹⁰ 5s² 5p³" },
    { numero: 52, simbolo: "Te", nombre: "Teluro", masa: 127.60, categoria: "metaloide", electronegatividad: 2.10, valencia: "2,4,6", caracter: "metaloide", grupo: 16, periodo: 5, config: "[Kr] 4d¹⁰ 5s² 5p⁴" },
    { numero: 53, simbolo: "I", nombre: "Yodo", masa: 126.904, categoria: "halogen", electronegatividad: 2.66, valencia: "1,5,7", caracter: "no metal", grupo: 17, periodo: 5, config: "[Kr] 4d¹⁰ 5s² 5p⁵" },
    { numero: 54, simbolo: "Xe", nombre: "Xenón", masa: 131.293, categoria: "gas-noble", electronegatividad: 2.60, valencia: "0", caracter: "no metal", grupo: 18, periodo: 5, config: "[Kr] 4d¹⁰ 5s² 5p⁶" },
    { numero: 55, simbolo: "Cs", nombre: "Cesio", masa: 132.905, categoria: "metal-alcalino", electronegatividad: 0.79, valencia: "1", caracter: "metal", grupo: 1, periodo: 6, config: "[Xe] 6s¹" },
    { numero: 56, simbolo: "Ba", nombre: "Bario", masa: 137.327, categoria: "metal-alcalinoterreo", electronegatividad: 0.89, valencia: "2", caracter: "metal", grupo: 2, periodo: 6, config: "[Xe] 6s²" },
    { numero: 57, simbolo: "La", nombre: "Lantano", masa: 138.905, categoria: "lantanido", electronegatividad: 1.10, valencia: "3", caracter: "metal", grupo: null, periodo: 6, config: "[Xe] 5d¹ 6s²" },
    { numero: 72, simbolo: "Hf", nombre: "Hafnio", masa: 178.49, categoria: "metal-transicion", electronegatividad: 1.30, valencia: "4", caracter: "metal", grupo: 4, periodo: 6, config: "[Xe] 4f¹⁴ 5d² 6s²" },
    { numero: 73, simbolo: "Ta", nombre: "Tantalio", masa: 180.948, categoria: "metal-transicion", electronegatividad: 1.50, valencia: "5", caracter: "metal", grupo: 5, periodo: 6, config: "[Xe] 4f¹⁴ 5d³ 6s²" },
    { numero: 74, simbolo: "W", nombre: "Wolframio", masa: 183.84, categoria: "metal-transicion", electronegatividad: 2.36, valencia: "2,3,4,5,6", caracter: "metal", grupo: 6, periodo: 6, config: "[Xe] 4f¹⁴ 5d⁴ 6s²" },
    { numero: 75, simbolo: "Re", nombre: "Renio", masa: 186.207, categoria: "metal-transicion", electronegatividad: 1.90, valencia: "2,4,6,7", caracter: "metal", grupo: 7, periodo: 6, config: "[Xe] 4f¹⁴ 5d⁵ 6s²" },
    { numero: 76, simbolo: "Os", nombre: "Osmio", masa: 190.23, categoria: "metal-transicion", electronegatividad: 2.20, valencia: "2,3,4,6,8", caracter: "metal", grupo: 8, periodo: 6, config: "[Xe] 4f¹⁴ 5d⁶ 6s²" },
    { numero: 77, simbolo: "Ir", nombre: "Iridio", masa: 192.217, categoria: "metal-transicion", electronegatividad: 2.20, valencia: "3,4,6", caracter: "metal", grupo: 9, periodo: 6, config: "[Xe] 4f¹⁴ 5d⁷ 6s²" },
    { numero: 78, simbolo: "Pt", nombre: "Platino", masa: 195.084, categoria: "metal-transicion", electronegatividad: 2.28, valencia: "2,4", caracter: "metal", grupo: 10, periodo: 6, config: "[Xe] 4f¹⁴ 5d⁹ 6s¹" },
    { numero: 79, simbolo: "Au", nombre: "Oro", masa: 196.967, categoria: "metal-transicion", electronegatividad: 2.54, valencia: "1,3", caracter: "metal", grupo: 11, periodo: 6, config: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹" },
    { numero: 80, simbolo: "Hg", nombre: "Mercurio", masa: 200.592, categoria: "metal-transicion", electronegatividad: 2.00, valencia: "1,2", caracter: "metal", grupo: 12, periodo: 6, config: "[Xe] 4f¹⁴ 5d¹⁰ 6s²" },
    { numero: 81, simbolo: "Tl", nombre: "Talio", masa: 204.383, categoria: "metal-postransicion", electronegatividad: 1.62, valencia: "1,3", caracter: "metal", grupo: 13, periodo: 6, config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹" },
    { numero: 82, simbolo: "Pb", nombre: "Plomo", masa: 207.2, categoria: "metal-postransicion", electronegatividad: 2.33, valencia: "2,4", caracter: "metal", grupo: 14, periodo: 6, config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²" },
    { numero: 83, simbolo: "Bi", nombre: "Bismuto", masa: 208.980, categoria: "metal-postransicion", electronegatividad: 2.02, valencia: "3,5", caracter: "metal", grupo: 15, periodo: 6, config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³" },
    { numero: 84, simbolo: "Po", nombre: "Polonio", masa: 209, categoria: "metaloide", electronegatividad: 2.00, valencia: "2,4,6", caracter: "metaloide", grupo: 16, periodo: 6, config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴" },
    { numero: 85, simbolo: "At", nombre: "Astato", masa: 210, categoria: "halogen", electronegatividad: 2.20, valencia: "1,3,5,7", caracter: "metaloide", grupo: 17, periodo: 6, config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵" },
    { numero: 86, simbolo: "Rn", nombre: "Radón", masa: 222, categoria: "gas-noble", electronegatividad: null, valencia: "0", caracter: "no metal", grupo: 18, periodo: 6, config: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶" },
    { numero: 87, simbolo: "Fr", nombre: "Francio", masa: 223, categoria: "metal-alcalino", electronegatividad: 0.70, valencia: "1", caracter: "metal", grupo: 1, periodo: 7, config: "[Rn] 7s¹" },
    { numero: 88, simbolo: "Ra", nombre: "Radio", masa: 226, categoria: "metal-alcalinoterreo", electronegatividad: 0.90, valencia: "2", caracter: "metal", grupo: 2, periodo: 7, config: "[Rn] 7s²" },
    { numero: 89, simbolo: "Ac", nombre: "Actinio", masa: 227, categoria: "actinido", electronegatividad: 1.10, valencia: "3", caracter: "metal", grupo: null, periodo: 7, config: "[Rn] 6d¹ 7s²" },
    // Lantánidos
    { numero: 58, simbolo: "Ce", nombre: "Cerio", masa: 140.116, categoria: "lantanido", electronegatividad: 1.12, valencia: "3,4", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f¹ 5d¹ 6s²" },
    { numero: 59, simbolo: "Pr", nombre: "Praseodimio", masa: 140.908, categoria: "lantanido", electronegatividad: 1.13, valencia: "3,4", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f³ 6s²" },
    { numero: 60, simbolo: "Nd", nombre: "Neodimio", masa: 144.242, categoria: "lantanido", electronegatividad: 1.14, valencia: "3", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f⁴ 6s²" },
    { numero: 61, simbolo: "Pm", nombre: "Prometio", masa: 145, categoria: "lantanido", electronegatividad: 1.13, valencia: "3", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f⁵ 6s²" },
    { numero: 62, simbolo: "Sm", nombre: "Samario", masa: 150.36, categoria: "lantanido", electronegatividad: 1.17, valencia: "2,3", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f⁶ 6s²" },
    { numero: 63, simbolo: "Eu", nombre: "Europio", masa: 151.964, categoria: "lantanido", electronegatividad: 1.20, valencia: "2,3", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f⁷ 6s²" },
    { numero: 64, simbolo: "Gd", nombre: "Gadolinio", masa: 157.25, categoria: "lantanido", electronegatividad: 1.20, valencia: "3", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f⁷ 5d¹ 6s²" },
    { numero: 65, simbolo: "Tb", nombre: "Terbio", masa: 158.925, categoria: "lantanido", electronegatividad: 1.20, valencia: "3,4", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f⁹ 6s²" },
    { numero: 66, simbolo: "Dy", nombre: "Disprosio", masa: 162.500, categoria: "lantanido", electronegatividad: 1.22, valencia: "3", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f¹⁰ 6s²" },
    { numero: 67, simbolo: "Ho", nombre: "Holmio", masa: 164.930, categoria: "lantanido", electronegatividad: 1.23, valencia: "3", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f¹¹ 6s²" },
    { numero: 68, simbolo: "Er", nombre: "Erbio", masa: 167.259, categoria: "lantanido", electronegatividad: 1.24, valencia: "3", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f¹² 6s²" },
    { numero: 69, simbolo: "Tm", nombre: "Tulio", masa: 168.934, categoria: "lantanido", electronegatividad: 1.25, valencia: "2,3", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f¹³ 6s²" },
    { numero: 70, simbolo: "Yb", nombre: "Iterbio", masa: 173.045, categoria: "lantanido", electronegatividad: 1.10, valencia: "2,3", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f¹⁴ 6s²" },
    { numero: 71, simbolo: "Lu", nombre: "Lutecio", masa: 174.967, categoria: "lantanido", electronegatividad: 1.27, valencia: "3", caracter: "metal", grupo: null, periodo: 8, config: "[Xe] 4f¹⁴ 5d¹ 6s²" },
    // Actínidos
    { numero: 90, simbolo: "Th", nombre: "Torio", masa: 232.038, categoria: "actinido", electronegatividad: 1.30, valencia: "4", caracter: "metal", grupo: null, periodo: 7, config: "[Rn] 6d² 7s²" },
    { numero: 91, simbolo: "Pa", nombre: "Protactinio", masa: 231.036, categoria: "actinido", electronegatividad: 1.50, valencia: "4,5", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f² 6d¹ 7s²" },
    { numero: 92, simbolo: "U", nombre: "Uranio", masa: 238.029, categoria: "actinido", electronegatividad: 1.38, valencia: "3,4,5,6", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f³ 6d¹ 7s²" },
    { numero: 93, simbolo: "Np", nombre: "Neptunio", masa: 237, categoria: "actinido", electronegatividad: 1.36, valencia: "3,4,5,6", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f⁴ 6d¹ 7s²" },
    { numero: 94, simbolo: "Pu", nombre: "Plutonio", masa: 244, categoria: "actinido", electronegatividad: 1.28, valencia: "3,4,5,6", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f⁶ 7s²" },
    { numero: 95, simbolo: "Am", nombre: "Americio", masa: 243, categoria: "actinido", electronegatividad: 1.30, valencia: "2,3,4,5,6", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f⁷ 7s²" },
    { numero: 96, simbolo: "Cm", nombre: "Curio", masa: 247, categoria: "actinido", electronegatividad: 1.30, valencia: "3", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f⁷ 6d¹ 7s²" },
    { numero: 97, simbolo: "Bk", nombre: "Berkelio", masa: 247, categoria: "actinido", electronegatividad: 1.30, valencia: "3,4", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f⁹ 7s²" },
    { numero: 98, simbolo: "Cf", nombre: "Californio", masa: 251, categoria: "actinido", electronegatividad: 1.30, valencia: "2,3", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f¹⁰ 7s²" },
    { numero: 99, simbolo: "Es", nombre: "Einsteinio", masa: 252, categoria: "actinido", electronegatividad: 1.30, valencia: "2,3", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f¹¹ 7s²" },
    { numero: 100, simbolo: "Fm", nombre: "Fermio", masa: 257, categoria: "actinido", electronegatividad: 1.30, valencia: "2,3", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f¹² 7s²" },
    { numero: 101, simbolo: "Md", nombre: "Mendelevio", masa: 258, categoria: "actinido", electronegatividad: 1.30, valencia: "2,3", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f¹³ 7s²" },
    { numero: 102, simbolo: "No", nombre: "Nobelio", masa: 259, categoria: "actinido", electronegatividad: 1.30, valencia: "2,3", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f¹⁴ 7s²" },
    { numero: 103, simbolo: "Lr", nombre: "Lawrencio", masa: 262, categoria: "actinido", electronegatividad: 1.30, valencia: "3", caracter: "metal", grupo: null, periodo: 9, config: "[Rn] 5f¹⁴ 7s² 7p¹" },
    { numero: 104, simbolo: "Rf", nombre: "Rutherfordio", masa: 267, categoria: "metal-transicion", electronegatividad: null, valencia: "4", caracter: "metal", grupo: 4, periodo: 7, config: "[Rn] 5f¹⁴ 6d² 7s²" },
    { numero: 105, simbolo: "Db", nombre: "Dubnio", masa: 268, categoria: "metal-transicion", electronegatividad: null, valencia: "5", caracter: "metal", grupo: 5, periodo: 7, config: "[Rn] 5f¹⁴ 6d³ 7s²" },
    { numero: 106, simbolo: "Sg", nombre: "Seaborgio", masa: 269, categoria: "metal-transicion", electronegatividad: null, valencia: "6", caracter: "metal", grupo: 6, periodo: 7, config: "[Rn] 5f¹⁴ 6d⁴ 7s²" },
    { numero: 107, simbolo: "Bh", nombre: "Bohrio", masa: 270, categoria: "metal-transicion", electronegatividad: null, valencia: "7", caracter: "metal", grupo: 7, periodo: 7, config: "[Rn] 5f¹⁴ 6d⁵ 7s²" },
    { numero: 108, simbolo: "Hs", nombre: "Hasio", masa: 277, categoria: "metal-transicion", electronegatividad: null, valencia: "8", caracter: "metal", grupo: 8, periodo: 7, config: "[Rn] 5f¹⁴ 6d⁶ 7s²" },
    { numero: 109, simbolo: "Mt", nombre: "Meitnerio", masa: 278, categoria: "metal-transicion", electronegatividad: null, valencia: "2,3,4", caracter: "metal", grupo: 9, periodo: 7, config: "[Rn] 5f¹⁴ 6d⁷ 7s²" },
    { numero: 110, simbolo: "Ds", nombre: "Darmstadtio", masa: 281, categoria: "metal-transicion", electronegatividad: null, valencia: "2,4", caracter: "metal", grupo: 10, periodo: 7, config: "[Rn] 5f¹⁴ 6d⁸ 7s²" },
    { numero: 111, simbolo: "Rg", nombre: "Roentgenio", masa: 282, categoria: "metal-transicion", electronegatividad: null, valencia: "1,3", caracter: "metal", grupo: 11, periodo: 7, config: "[Rn] 5f¹⁴ 6d⁹ 7s²" },
    { numero: 112, simbolo: "Cn", nombre: "Copernicio", masa: 285, categoria: "metal-transicion", electronegatividad: null, valencia: "2", caracter: "metal", grupo: 12, periodo: 7, config: "[Rn] 5f¹⁴ 6d¹⁰ 7s²" },
    { numero: 113, simbolo: "Nh", nombre: "Nihonio", masa: 286, categoria: "metal-postransicion", electronegatividad: null, valencia: "1,3", caracter: "metal", grupo: 13, periodo: 7, config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹" },
    { numero: 114, simbolo: "Fl", nombre: "Flerovio", masa: 289, categoria: "metal-postransicion", electronegatividad: null, valencia: "2,4", caracter: "metal", grupo: 14, periodo: 7, config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²" },
    { numero: 115, simbolo: "Mc", nombre: "Moscovio", masa: 290, categoria: "metal-postransicion", electronegatividad: null, valencia: "1,3", caracter: "metal", grupo: 15, periodo: 7, config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³" },
    { numero: 116, simbolo: "Lv", nombre: "Livermorio", masa: 293, categoria: "metal-postransicion", electronegatividad: null, valencia: "2,4", caracter: "metal", grupo: 16, periodo: 7, config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴" },
    { numero: 117, simbolo: "Ts", nombre: "Teneso", masa: 294, categoria: "halogen", electronegatividad: null, valencia: "1,3,5,7", caracter: "metaloide", grupo: 17, periodo: 7, config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵" },
    { numero: 118, simbolo: "Og", nombre: "Oganesón", masa: 294, categoria: "gas-noble", electronegatividad: null, valencia: "0", caracter: "no metal", grupo: 18, periodo: 7, config: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶" }
];

// ─── Config de categorías ─────────────────────────────────────────────────────
const catConfig: Record<Categoria, { label: string; bg: string; text: string }> = {
    "metal-alcalino": { label: "Metal alcalino", bg: "#ff6b6b", text: "#fff" },
    "metal-alcalinoterreo": { label: "Metal alcalinotérreo", bg: "#ffa94d", text: "#fff" },
    "metal-transicion": { label: "Metal de transición", bg: "#ffd43b", text: "#333" },
    "metal-postransicion": { label: "Metal postransición", bg: "#a9e34b", text: "#333" },
    "metaloide": { label: "Metaloide", bg: "#38d9a9", text: "#fff" },
    "no-metal": { label: "No metal", bg: "#74c0fc", text: "#333" },
    "halogen": { label: "Halógeno", bg: "#da77f2", text: "#fff" },
    "gas-noble": { label: "Gas noble", bg: "#f783ac", text: "#fff" },
    "lantanido": { label: "Lantánido", bg: "#63e6be", text: "#333" },
    "actinido": { label: "Actínido", bg: "#ffec99", text: "#333" },
};

// ─── Escala de calor (azul → verde → rojo) ───────────────────────────────────
function heatColor(value: number, min: number, max: number): { bg: string; text: string } {
    const t = (value - min) / (max - min);
    // Azul (baja) → Amarillo → Rojo (alta)
    const r = Math.round(t < 0.5 ? 59 + t * 2 * 196 : 255);
    const g = Math.round(t < 0.5 ? 130 + t * 2 * 70 : 200 - (t - 0.5) * 2 * 200);
    const b = Math.round(t < 0.5 ? 246 - t * 2 * 246 : 0);
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    return { bg: `rgb(${r},${g},${b})`, text: brightness > 140 ? "#333" : "#fff" };
}

// ─── Obtener color de celda según modo ───────────────────────────────────────
function getCeldaStyle(el: Elemento, propiedad: PropiedadVista): { bg: string; text: string } {
    if (propiedad === "electronegatividad") {
        if (el.electronegatividad === null) return { bg: "#94a3b8", text: "#fff" };
        return heatColor(el.electronegatividad, 0.7, 4.0);
    }
    if (propiedad === "caracter") {
        if (el.caracter === "metal") return { bg: "#f59e0b", text: "#333" };
        if (el.caracter === "metaloide") return { bg: "#06b6d4", text: "#fff" };
        return { bg: "#6366f1", text: "#fff" };
    }
    if (propiedad === "valencia") {
        // Colores por número de valencias posibles
        const count = el.valencia.split(",").length;
        const paleta = ["#94a3b8", "#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa"];
        const c = paleta[Math.min(count - 1, paleta.length - 1)];
        return { bg: c, text: "#fff" };
    }
    // Default: por categoría
    const cfg = catConfig[el.categoria];
    return { bg: cfg.bg, text: cfg.text };
}

// ─── Leyenda dinámica ─────────────────────────────────────────────────────────
function Leyenda({ propiedad }: { propiedad: PropiedadVista }) {
    if (propiedad === "categoria") {
        return (
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 mb-3">
                {Object.entries(catConfig).map(([key, val]) => (
                    <div key={key} className="flex items-center gap-1.5">
                        <div className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ background: val.bg }} />
                        <span className="text-xs text-muted-foreground">{val.label}</span>
                    </div>
                ))}
            </div>
        );
    }
    if (propiedad === "electronegatividad") {
        return (
            <div className="mt-3 mb-3 space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Escala de Pauling — mayor valor = atrae más electrones</p>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-28">Baja (0.7 — Cs/Fr)</span>
                    <div className="h-4 flex-1 rounded" style={{
                        background: "linear-gradient(to right, rgb(59,130,246), rgb(255,200,0), rgb(255,0,0))"
                    }} />
                    <span className="text-xs text-muted-foreground w-28 text-right">Alta (4.0 — Flúor)</span>
                </div>
                <span className="text-xs text-muted-foreground">Gris = sin dato (gases nobles)</span>
            </div>
        );
    }
    if (propiedad === "caracter") {
        return (
            <div className="mt-3 mb-3 space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Carácter metálico — aumenta hacia abajo y hacia la izquierda</p>
                <div className="flex flex-wrap gap-4">
                    {[
                        { bg: "#f59e0b", text: "#333", label: "Metal — conduce, brilla, maleable" },
                        { bg: "#06b6d4", text: "#fff", label: "Metaloide — propiedades intermedias" },
                        { bg: "#6366f1", text: "#fff", label: "No metal — no conduce, frágil o gaseoso" },
                    ].map((i) => (
                        <div key={i.label} className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ background: i.bg }} />
                            <span className="text-xs text-muted-foreground">{i.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    if (propiedad === "valencia") {
        return (
            <div className="mt-3 mb-3 space-y-1">
                <p className="text-xs text-muted-foreground font-medium">Valencia — número de electrones que usa para enlazarse</p>
                <div className="flex flex-wrap gap-3">
                    {[
                        { count: 1, bg: "#94a3b8", label: "1 valencia" },
                        { count: 2, bg: "#60a5fa", label: "2 valencias" },
                        { count: 3, bg: "#34d399", label: "3 valencias" },
                        { count: 4, bg: "#fbbf24", label: "4 valencias" },
                        { count: 5, bg: "#f87171", label: "5 valencias" },
                        { count: 6, bg: "#a78bfa", label: "6+ valencias" },
                    ].map((i) => (
                        <div key={i.label} className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ background: i.bg }} />
                            <span className="text-xs text-muted-foreground">{i.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
}

// ─── Celda Optimizada: Nombre Completo + Peso Bajo Símbolo ───────────────────
function Celda({
    el,
    propiedad,
    seleccionado,
    onClick,
    onMouseEnter,
}: {
    el: Elemento;
    propiedad: PropiedadVista;
    seleccionado: boolean;
    onClick: () => void;
    onMouseEnter?: () => void;
}) {
    const { bg, text } = getCeldaStyle(el, propiedad);

    // Formatear el valor del bloque inferior (Propiedad o Nombre completo/abreviado)
    const getValorInferior = () => {
        if (propiedad === "electronegatividad") {
            return el.electronegatividad !== null ? el.electronegatividad.toFixed(1) : "—";
        }
        if (propiedad === "valencia") {
            return el.valencia;
        }
        if (propiedad === "caracter") {
            return el.caracter.substring(0, 5).toUpperCase();
        }
        // Retorna el nombre completo en mayúsculas; el CSS se encargará de ajustarlo
        return el.nombre.toUpperCase();
    };

    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            title={`${el.nombre} (${el.numero})`}
            style={{
                backgroundColor: bg,
                color: text,
                borderColor: seleccionado ? '#8B5CF6' : 'rgba(0,0,0,0.06)'
            }}
            className={`
                relative w-full aspect-square rounded flex flex-col justify-between overflow-hidden border
                transition-all duration-150 hover:brightness-110 hover:scale-[1.12] hover:z-20 hover:shadow-lg
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]
                ${seleccionado
                    ? "scale-[1.12] z-20 shadow-xl ring-2 ring-[#8B5CF6] border-[#8B5CF6] brightness-105"
                    : "dark:border-white/10"
                }
            `}
        >
            {/* 1. Esquina Superior: Número Atómico */}
            <div className="w-full flex justify-start items-start p-0.5">
                <div
                    className="flex items-center justify-center rounded-[2px] px-1 h-3.5 bg-black/10 dark:bg-black/30 border border-black/5 dark:border-white/5"
                    style={{ minWidth: '15px' }}
                >
                    <span className="text-[55%] font-black font-mono leading-none tracking-tight text-slate-900 dark:text-slate-100 select-none">
                        {el.numero}
                    </span>
                </div>
            </div>

            {/* 2. Centro: Símbolo Químico + Peso Atómico directamente debajo */}
            <div className="w-full flex flex-col justify-center items-center flex-1 -mt-2 select-none">
                {/* Símbolo Químico */}
                <span className="text-[105%] font-black leading-none tracking-tighter drop-shadow-sm">
                    {el.simbolo}
                </span>
                {/* Peso/Masa Atómica justo debajo del símbolo */}
                <span className="text-[55%] font-medium opacity-75 mt-0.5 tracking-tight font-mono">
                    {el.masa.toFixed(1)}
                </span>
            </div>

            {/* 3. Bloque Inferior: Franja que ocupa TODO el ancho disponible */}
            <div className="w-full bg-black/10 dark:bg-black/30 py-0.5 px-0 border-t border-black/5 dark:border-white/5 flex items-center justify-center min-h-[13px]">
                <span className="text-[42%] font-black tracking-tighter leading-none text-center text-slate-900 dark:text-slate-100 select-none block w-full px-0.5 truncate">
                    {getValorInferior()}
                </span>
            </div>
        </button>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function TablaPeriodica() {
    const [seleccionado, setSeleccionado] = useState<Elemento | null>(null);
    const [propiedad, setPropiedad] = useState<PropiedadVista>("categoria");

    // 1. Grilla principal de 7 periodos × 18 grupos
    const grilla: (Elemento | null)[][] = Array.from({ length: 7 }, () => Array(18).fill(null));

    elementos
        .filter((e) => e.periodo <= 7 && e.grupo !== null)
        .forEach((e) => {
            grilla[e.periodo - 1][e.grupo! - 1] = e;
        });

    // 2. Filtramos los bloques inferiores incluyendo correctamente a La (57) y Ac (89)
    const lantanidos = elementos
        .filter((e) => e.categoria === "lantanido" || e.numero === 57)
        .sort((a, b) => a.numero - b.numero);

    const actinidos = elementos
        .filter((e) => e.categoria === "actinido" || e.numero === 89)
        .sort((a, b) => a.numero - b.numero);

    const propBotones: { id: PropiedadVista; label: string; desc: string }[] = [
        { id: "categoria", label: "Categorías", desc: "Vista por tipo de elemento" },
        { id: "electronegatividad", label: "Electronegatividad", desc: "Escala de Pauling (0.7 – 4.0)" },
        { id: "valencia", label: "Valencia", desc: "Electrones de enlace" },
        { id: "caracter", label: "Carácter metálico", desc: "Metal / Metaloide / No metal" },
    ];

    const handleClick = (el: Elemento) =>
        setSeleccionado((prev) => (prev?.numero === el.numero ? null : el));


    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="w-full px-3 py-4 md:px-6 md:py-6">

                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">Tabla periódica interactiva</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Toca un elemento para ver sus propiedades · Cambia la vista con los botones
                    </p>
                </div>

                {/* Selector de propiedad */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {propBotones.map((b) => (
                        <button
                            key={b.id}
                            onClick={() => setPropiedad(b.id)}
                            className={`
                flex flex-col items-start px-3 py-1.5 rounded-lg border text-left transition-all
                ${propiedad === b.id
                                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                    : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent"
                                }
              `}
                        >
                            <span className="text-sm font-medium leading-tight">{b.label}</span>
                            <span className={`text-[10px] leading-tight ${propiedad === b.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                {b.desc}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Leyenda */}
                <Leyenda propiedad={propiedad} />

                {/* Tabla periódica — scroll horizontal en móvil */}
                <div className="w-full overflow-x-auto pb-2 -mx-1 px-1 mt-3">
                    <div className="min-w-[640px]" style={{ containerType: "inline-size" }}>

                        {/* Números de grupo */}
                        <div className="grid mb-1" style={{ gridTemplateColumns: "24px repeat(18, 1fr)", gap: "2px" }}>
                            <div />
                            {Array.from({ length: 18 }, (_, i) => (
                                <div key={i} className="text-center text-[9px] text-muted-foreground font-medium py-0.5">
                                    {i + 1}
                                </div>
                            ))}
                        </div>

                        {/* Filas de periodos */}
                        {grilla.map((fila, pi) => (
                            <div key={pi} className="grid mb-[2px]" style={{ gridTemplateColumns: "24px repeat(18, 1fr)", gap: "2px" }}>
                                {/* Número de periodo */}
                                <div className="flex items-center justify-end pr-1">
                                    <span className="text-[9px] text-muted-foreground font-medium">{pi + 1}</span>
                                </div>
                                {fila.map((el, gi) => (
                                    <div key={gi}>
                                        {el ? (
                                            <Celda
                                                el={el}
                                                propiedad={propiedad}
                                                seleccionado={seleccionado?.numero === el.numero}
                                                onClick={() => handleClick(el)}
                                            />
                                        ) : (
                                            // Placeholder para La / Ac en periodo 6 y 7
                                            (pi === 5 && gi === 2) ? (
                                                <div className="w-full aspect-square rounded border border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/20">
                                                    <span className="text-[40%] text-muted-foreground text-center leading-tight">57–71</span>
                                                </div>
                                            ) : (pi === 6 && gi === 2) ? (
                                                <div className="w-full aspect-square rounded border border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/20">
                                                    <span className="text-[40%] text-muted-foreground text-center leading-tight">89–103</span>
                                                </div>
                                            ) : (
                                                <div className="w-full aspect-square" />
                                            )
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* Lantánidos y Actínidos */}
                        <div className="mt-3 border-t border-border pt-3 space-y-[2px]">
                            {[
                                { label: "Lantánidos", datos: lantanidos },
                                { label: "Actínidos", datos: actinidos },
                            ].map(({ label, datos }) => (
                                // Usamos exactamente el mismo grid de 24px + 18 columnas (en total 19 espacios)
                                <div key={label} className="grid" style={{ gridTemplateColumns: "24px repeat(18, 1fr)", gap: "2px" }}>

                                    {/* 1. Espacio para el número de periodo (vacío) */}
                                    <div />

                                    {/* 2. Etiqueta del bloque (ocupa las columnas del Grupo 1 y Grupo 2) */}
                                    <div className="col-span-2 flex items-center pr-1 justify-end">
                                        <span className="text-[9px] text-muted-foreground leading-tight font-medium">{label}</span>
                                    </div>

                                    {/* 3. Render de las 15 tarjetas (se posicionan automáticamente del Grupo 3 al 17) */}
                                    {datos.map((el) => (
                                        <Celda
                                            key={el.numero}
                                            el={el}
                                            propiedad={propiedad}
                                            seleccionado={seleccionado?.numero === el.numero}
                                            onClick={() => handleClick(el)}
                                        />
                                    ))}

                                    {/* 4. Espacio vacío final para el Grupo 18 para completar la simetría */}
                                    <div />
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </div>

            {/* ── Panel flotante de detalle ── */}
            {seleccionado && (() => {
                const cfg = catConfig[seleccionado.categoria];
                const { bg: accentBg, text: accentText } = getCeldaStyle(seleccionado, "categoria");
                return (
                    <div className="fixed inset-x-0 bottom-0 z-50 md:inset-auto md:fixed md:bottom-6 md:right-6 md:w-[340px]">
                        <div
                            className="bg-card border border-border shadow-2xl rounded-t-2xl md:rounded-2xl overflow-hidden"
                        >
                            {/* Franja de color del tipo */}
                            <div className="h-1.5 w-full" style={{ background: accentBg }} />

                            <div className="p-5">
                                {/* Cabecera */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {/* Badge grande con símbolo */}
                                        <div
                                            className="w-16 h-16 rounded-xl flex flex-col items-center justify-center shadow-sm flex-shrink-0"
                                            style={{ background: accentBg, color: accentText }}
                                        >
                                            <span className="text-[11px] opacity-75 font-mono leading-none">{seleccionado.numero}</span>
                                            <span className="text-3xl font-bold leading-tight">{seleccionado.simbolo}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground leading-tight">{seleccionado.nombre}</h3>
                                            <p className="text-xs text-muted-foreground">Masa atómica: {seleccionado.masa} u</p>
                                            <div
                                                className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                                                style={{ background: accentBg + "33", color: accentBg }}
                                            >
                                                {cfg.label}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSeleccionado(null)}
                                        className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Tarjetas de propiedades */}
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    {[
                                        {
                                            label: "Electronegatividad",
                                            value: seleccionado.electronegatividad?.toFixed(2) ?? "—",
                                            sub: "Escala Pauling",
                                            icon: "⚡",
                                        },
                                        {
                                            label: "Valencia",
                                            value: seleccionado.valencia,
                                            sub: "posible(s)",
                                            icon: "🔗",
                                        },
                                        {
                                            label: "Carácter",
                                            value: seleccionado.caracter === "no metal" ? "No metal"
                                                : seleccionado.caracter.charAt(0).toUpperCase() + seleccionado.caracter.slice(1),
                                            sub: "tipo",
                                            icon: "🧪",
                                        },
                                    ].map((item) => (
                                        <div key={item.label} className="bg-muted/40 dark:bg-muted/20 rounded-xl p-2.5 text-center">
                                            <div className="text-base mb-0.5">{item.icon}</div>
                                            <p className="text-[10px] text-muted-foreground leading-tight">{item.label}</p>
                                            <p className="text-sm font-bold text-foreground mt-0.5 leading-tight break-all">{item.value}</p>
                                            <p className="text-[10px] text-muted-foreground">{item.sub}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Config electrónica */}
                                <div className="bg-muted/30 dark:bg-muted/20 rounded-xl px-3 py-2.5 mb-2">
                                    <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide font-medium">
                                        Configuración electrónica
                                    </p>
                                    <p className="text-sm font-mono text-foreground">{seleccionado.config}</p>
                                </div>

                                {/* Grupo y periodo */}
                                {seleccionado.grupo && (
                                    <div className="flex gap-3 text-xs text-muted-foreground">
                                        <span>Grupo <span className="font-medium text-foreground">{seleccionado.grupo}</span></span>
                                        <span>·</span>
                                        <span>Periodo <span className="font-medium text-foreground">{seleccionado.periodo <= 7 ? seleccionado.periodo : seleccionado.periodo - 1}</span></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}