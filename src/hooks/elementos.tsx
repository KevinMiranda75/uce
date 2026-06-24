export interface ElementoQuimico {
    id: number;
    nomenclatura: string;
    elemento: string;
    valencia: number;
    nomenclaturaSistematica: string;
    nomenclaturaStock: string;
    nomenclaturaTradicional: string;
    formulaOxidacion: string;
    color: string;
    valenciasDoble?: any;
}

const coloresPorGrupo: Record<string, string> = {
    "metal alcalino": "#FF6666",
    "metal alcalinotérreo": "#99FF99",
    "metal de transición": "#FFD700",
    "metal pobre": "#CCCCCC",
    "metaloide": "#FFD966",
    "no metal": "#CC99FF",
    "halógeno": "#FFA500",
    "gas noble": "#DDDDDD",
    "lantánido": "#FFBFFF",
    "actínido": "#FF99CC"
};


export const elementosTabla: ElementoQuimico[] = [
    {
        id: 0,
        nomenclatura: "Li",
        elemento: "Litio",
        valencia: 1,
        nomenclaturaSistematica: "Monóxido de dilitio",
        nomenclaturaStock: "Óxido de litio (I)",
        nomenclaturaTradicional: "Óxido lítico",
        formulaOxidacion: "Li₂O",
        color: coloresPorGrupo["metal alcalino"]
    },
    {
        id: 1,
        nomenclatura: "Na",
        elemento: "Sodio",
        valencia: 1,
        nomenclaturaSistematica: "Monóxido de disodio",
        nomenclaturaStock: "Óxido de sodio (I)",
        nomenclaturaTradicional: "Óxido sódico",
        formulaOxidacion: "Na₂O",
        color: coloresPorGrupo["metal alcalino"]
    },
    {
        id: 2,
        nomenclatura: "K",
        elemento: "Potasio",
        valencia: 1,
        nomenclaturaSistematica: "Monóxido de dipotasio",
        nomenclaturaStock: "Óxido de potasio (I)",
        nomenclaturaTradicional: "Óxido potásico",
        formulaOxidacion: "K₂O",
        color: coloresPorGrupo["metal alcalino"]
    },
    {
        id: 3,
        nomenclatura: "Rb",
        elemento: "Rubidio",
        valencia: 1,
        nomenclaturaSistematica: "Monóxido de dirubidio",
        nomenclaturaStock: "Óxido de rubidio (I)",
        nomenclaturaTradicional: "Óxido rubídico",
        formulaOxidacion: "Rb₂O",
        color: coloresPorGrupo["metal alcalino"]
    }
    ,
    {
        id: 4,
        nomenclatura: "Cs",
        elemento: "Cesio",
        valencia: 1,
        nomenclaturaSistematica: "Monóxido de dicesio",
        nomenclaturaStock: "Óxido de cesio (I)",
        nomenclaturaTradicional: "Óxido césico",
        formulaOxidacion: "Cs₂O",
        color: coloresPorGrupo["metal alcalino"]
    },
    {
        id: 5,
        nomenclatura: "Fr",
        elemento: "Francio",
        valencia: 1,
        nomenclaturaSistematica: "Monóxido de difrancio",
        nomenclaturaStock: "Óxido de francio (I)",
        nomenclaturaTradicional: "Óxido fráncico",
        formulaOxidacion: "Fr₂O",
        color: coloresPorGrupo["metal alcalino"]
    },
    {
        id: 6,
        nomenclatura: "Ag",
        elemento: "Plata",
        valencia: 1,
        nomenclaturaSistematica: "Monóxido de diplata",
        nomenclaturaStock: "Óxido de plata (I)",
        nomenclaturaTradicional: "Óxido argéntoso",
        formulaOxidacion: "Ag₂O",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 7,
        nomenclatura: "Cu",
        elemento: "Cobre",
        valencia: 1,
        nomenclaturaSistematica: "Monóxido de dicobre",
        nomenclaturaStock: "Óxido de cobre (I)",
        nomenclaturaTradicional: "Óxido cuproso",
        formulaOxidacion: "Cu₂O",
        color: coloresPorGrupo["metal de transición"],
        valenciasDoble: '1-2'
    },
    {
        id: 8,
        nomenclatura: "Hg",
        elemento: "Mercurio",
        valencia: 1,
        nomenclaturaSistematica: "Monóxido de dimercurio",
        nomenclaturaStock: "Óxido de mercurio (I)",
        nomenclaturaTradicional: "Óxido mercurioso",
        formulaOxidacion: "Hg₂O",
        color: coloresPorGrupo["metal de transición"],
        valenciasDoble: '1-2'
    },
    {
        id: 11,
        nomenclatura: "Au",
        elemento: "Oro",
        valencia: 1,
        nomenclaturaSistematica: "Monóxido de dioro",
        nomenclaturaStock: "Óxido de oro (I)",
        nomenclaturaTradicional: "Óxido aurioso",
        formulaOxidacion: "Au₂O",
        color: coloresPorGrupo["metal de transición"],
        valenciasDoble: '1-3'
    },
    {
        id: 12,
        nomenclatura: "Tl",
        elemento: "Talio",
        valencia: 1,
        nomenclaturaSistematica: "Monóxido de ditalio",
        nomenclaturaStock: "Óxido de talio (I)",
        nomenclaturaTradicional: "Óxido talioso",
        formulaOxidacion: "Tl₂O",
        color: coloresPorGrupo["metal de transición"],
        valenciasDoble: '1-3'
    }



];

export const elementosTablaVale2: ElementoQuimico[] = [
    {
        id: 0,
        nomenclatura: "Be",
        elemento: "Berilio",
        valencia: 2,
        nomenclaturaSistematica: "Monóxido de berilio",
        nomenclaturaStock: "Óxido de berilio (II)",
        nomenclaturaTradicional: "Óxido berílico",
        formulaOxidacion: "BeO",
        color: coloresPorGrupo["metal alcalinotérreo"]
    },
    {
        id: 1,
        nomenclatura: "Mg",
        elemento: "Magnesio",
        valencia: 2,
        nomenclaturaSistematica: "Monóxido de magnesio",
        nomenclaturaStock: "Óxido de magnesio (II)",
        nomenclaturaTradicional: "Óxido magnésico",
        formulaOxidacion: "MgO",
        color: coloresPorGrupo["metal alcalinotérreo"]
    },
    {
        id: 2,
        nomenclatura: "Ca",
        elemento: "Calcio",
        valencia: 2,
        nomenclaturaSistematica: "Monóxido de calcio",
        nomenclaturaStock: "Óxido de calcio (II)",
        nomenclaturaTradicional: "Óxido cálcico",
        formulaOxidacion: "CaO",
        color: coloresPorGrupo["metal alcalinotérreo"]
    },
    {
        id: 3,
        nomenclatura: "Sr",
        elemento: "Estroncio",
        valencia: 2,
        nomenclaturaSistematica: "Monóxido de estroncio",
        nomenclaturaStock: "Óxido de estroncio (II)",
        nomenclaturaTradicional: "Óxido estróncico",
        formulaOxidacion: "SrO",
        color: coloresPorGrupo["metal alcalinotérreo"]
    },
    {
        id: 4,
        nomenclatura: "Ba",
        elemento: "Bario",
        valencia: 2,
        nomenclaturaSistematica: "Monóxido de bario",
        nomenclaturaStock: "Óxido de bario (II)",
        nomenclaturaTradicional: "Óxido bárico",
        formulaOxidacion: "BaO",
        color: coloresPorGrupo["metal alcalinotérreo"]
    },
    {
        id: 5,
        nomenclatura: "Ra",
        elemento: "Radio",
        valencia: 2,
        nomenclaturaSistematica: "Monóxido de radio",
        nomenclaturaStock: "Óxido de radio (II)",
        nomenclaturaTradicional: "Óxido rádico",
        formulaOxidacion: "RaO",
        color: coloresPorGrupo["metal alcalinotérreo"]
    },
    {
        id: 6,
        nomenclatura: "Cd",
        elemento: "Cadmio",
        valencia: 2,
        nomenclaturaSistematica: "Monóxido de cadmio",
        nomenclaturaStock: "Óxido de cadmio (II)",
        nomenclaturaTradicional: "Óxido cadmioso",
        formulaOxidacion: "CdO",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 7,
        nomenclatura: "Zn",
        elemento: "Zinc",
        valencia: 2,
        nomenclaturaSistematica: "Monóxido de zinc",
        nomenclaturaStock: "Óxido de zinc (II)",
        nomenclaturaTradicional: "Óxido zincoso",
        formulaOxidacion: "ZnO",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 9,
        nomenclatura: "Cu",
        elemento: "Cobre",
        valencia: 2,
        nomenclaturaSistematica: "Dióxido de dicobre",
        nomenclaturaStock: "Óxido de cobre (II)",
        nomenclaturaTradicional: "Óxido cúprico",
        formulaOxidacion: "CuO",
        color: coloresPorGrupo["metal de transición"],
        valenciasDoble: '1-2'
    },
    {
        id: 10,
        nomenclatura: "Hg",
        elemento: "Mercurio",
        valencia: 2,
        nomenclaturaSistematica: "Dióxido de dimercurio",
        nomenclaturaStock: "Óxido de mercurio (II)",
        nomenclaturaTradicional: "Óxido mercúrico",
        formulaOxidacion: "HgO",
        color: coloresPorGrupo["metal de transición"],
        valenciasDoble: '1-2'
    },
    {
    id: 11,
    nomenclatura: "Fe",
    elemento: "Hierro",
    valencia: 2,
    nomenclaturaSistematica: "Monóxido de dihierro",
    nomenclaturaStock: "Óxido de hierro (II)",
    nomenclaturaTradicional: "Óxido ferroso",
    formulaOxidacion: "FeO",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-3'
},
{
    id: 12,
    nomenclatura: "Co",
    elemento: "Cobalto",
    valencia: 2,
    nomenclaturaSistematica: "Monóxido de dicobalto",
    nomenclaturaStock: "Óxido de cobalto (II)",
    nomenclaturaTradicional: "Óxido cobaltoso",
    formulaOxidacion: "CoO",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-3'
},
{
    id: 13,
    nomenclatura: "Ni",
    elemento: "Níquel",
    valencia: 2,
    nomenclaturaSistematica: "Monóxido de diníquel",
    nomenclaturaStock: "Óxido de níquel (II)",
    nomenclaturaTradicional: "Óxido niqueloso",
    formulaOxidacion: "NiO",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-3'
},
{
    id: 14,
    nomenclatura: "Cr",
    elemento: "Cromo",
    valencia: 2,
    nomenclaturaSistematica: "Monóxido de dicromo",
    nomenclaturaStock: "Óxido de cromo (II)",
    nomenclaturaTradicional: "Óxido cromoso",
    formulaOxidacion: "CrO",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-3'
},
{
    id: 15,
    nomenclatura: "Mn",
    elemento: "Manganeso",
    valencia: 2,
    nomenclaturaSistematica: "Monóxido de dimanganeso",
    nomenclaturaStock: "Óxido de manganeso (II)",
    nomenclaturaTradicional: "Óxido manganoso",
    formulaOxidacion: "MnO",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-3'
}
,
{
    id: 16,
    nomenclatura: "Pb",
    elemento: "Plomo",
    valencia: 2,
    nomenclaturaSistematica: "Monóxido de plomo",
    nomenclaturaStock: "Óxido de plomo (II)",
    nomenclaturaTradicional: "Óxido plumboso",
    formulaOxidacion: "PbO",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-4'
},
{
    id: 17,
    nomenclatura: "Sn",
    elemento: "Estaño",
    valencia: 2,
    nomenclaturaSistematica: "Monóxido de estaño",
    nomenclaturaStock: "Óxido de estaño (II)",
    nomenclaturaTradicional: "Óxido estanoso",
    formulaOxidacion: "SnO",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-4'
}



];

export const elementosTablaVale3: ElementoQuimico[] = [
    {
        id: 0,
        nomenclatura: "Al",
        elemento: "Aluminio",
        valencia: 3,
        nomenclaturaSistematica: "Trióxido de aluminio",
        nomenclaturaStock: "Óxido de aluminio (III)",
        nomenclaturaTradicional: "Óxido alumínico",
        formulaOxidacion: "Al₂O₃",
        color: coloresPorGrupo["metal pobre"]
    },
    {
        id: 1,
        nomenclatura: "Bi",
        elemento: "Bismuto",
        valencia: 3,
        nomenclaturaSistematica: "Trióxido de bismuto",
        nomenclaturaStock: "Óxido de bismuto (III)",
        nomenclaturaTradicional: "Óxido bismútico",
        formulaOxidacion: "Bi₂O₃",
        color: coloresPorGrupo["metal pobre"]
    },
    {
        id: 2,
        nomenclatura: "Ga",
        elemento: "Galio",
        valencia: 3,
        nomenclaturaSistematica: "Trióxido de galio",
        nomenclaturaStock: "Óxido de galio (III)",
        nomenclaturaTradicional: "Óxido galico",
        formulaOxidacion: "Ga₂O₃",
        color: coloresPorGrupo["metal pobre"]
    },
    {
        id: 3,
        nomenclatura: "In",
        elemento: "Indio",
        valencia: 3,
        nomenclaturaSistematica: "Trióxido de indio",
        nomenclaturaStock: "Óxido de indio (III)",
        nomenclaturaTradicional: "Óxido índico",
        formulaOxidacion: "In₂O₃",
        color: coloresPorGrupo["metal pobre"]
    },
    {
        id: 4,
        nomenclatura: "Eu",
        elemento: "Europio",
        valencia: 3,
        nomenclaturaSistematica: "Trióxido de europio",
        nomenclaturaStock: "Óxido de europio (III)",
        nomenclaturaTradicional: "Óxido europioso",
        formulaOxidacion: "Eu₂O₃",
        color: coloresPorGrupo["lantánido"]
    },
    {
        id: 5,
        nomenclatura: "Gd",
        elemento: "Gadolinio",
        valencia: 3,
        nomenclaturaSistematica: "Trióxido de gadolinio",
        nomenclaturaStock: "Óxido de gadolinio (III)",
        nomenclaturaTradicional: "Óxido gadolinico",
        formulaOxidacion: "Gd₂O₃",
        color: coloresPorGrupo["lantánido"]
    },
    {
        id: 6,
        nomenclatura: "Sc",
        elemento: "Escandio",
        valencia: 3,
        nomenclaturaSistematica: "Trióxido de escandio",
        nomenclaturaStock: "Óxido de escandio (III)",
        nomenclaturaTradicional: "Óxido escándico",
        formulaOxidacion: "Sc₂O₃",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 7,
        nomenclatura: "Au",
        elemento: "Oro",
        valencia: 3,
        nomenclaturaSistematica: "Trióxido de dioro",
        nomenclaturaStock: "Óxido de oro (III)",
        nomenclaturaTradicional: "Óxido áurico",
        formulaOxidacion: "Au₂O₃",
        color: coloresPorGrupo["metal de transición"],
        valenciasDoble: '1-3'
    },
    {
        id: 8,
        nomenclatura: "Tl",
        elemento: "Talio",
        valencia: 3,
        nomenclaturaSistematica: "Trióxido de ditalio",
        nomenclaturaStock: "Óxido de talio (III)",
        nomenclaturaTradicional: "Óxido talico",
        formulaOxidacion: "Tl₂O₃",
        color: coloresPorGrupo["metal de transición"],
        valenciasDoble: '1-3'
    },
    {
    id: 9,
    nomenclatura: "Fe",
    elemento: "Hierro",
    valencia: 3,
    nomenclaturaSistematica: "Trióxido de dihierro",
    nomenclaturaStock: "Óxido de hierro (III)",
    nomenclaturaTradicional: "Óxido férrico",
    formulaOxidacion: "Fe₂O₃",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-3'
},
{
    id: 10,
    nomenclatura: "Co",
    elemento: "Cobalto",
    valencia: 3,
    nomenclaturaSistematica: "Trióxido de dicobalto",
    nomenclaturaStock: "Óxido de cobalto (III)",
    nomenclaturaTradicional: "Óxido cobaltico",
    formulaOxidacion: "Co₂O₃",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-3'
},
{
    id: 11,
    nomenclatura: "Ni",
    elemento: "Níquel",
    valencia: 3,
    nomenclaturaSistematica: "Trióxido de diníquel",
    nomenclaturaStock: "Óxido de níquel (III)",
    nomenclaturaTradicional: "Óxido niquélico",
    formulaOxidacion: "Ni₂O₃",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-3'
},
{
    id: 12,
    nomenclatura: "Cr",
    elemento: "Cromo",
    valencia: 3,
    nomenclaturaSistematica: "Trióxido de dicromo",
    nomenclaturaStock: "Óxido de cromo (III)",
    nomenclaturaTradicional: "Óxido crómico",
    formulaOxidacion: "Cr₂O₃",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-3'
},
{
    id: 13,
    nomenclatura: "Mn",
    elemento: "Manganeso",
    valencia: 3,
    nomenclaturaSistematica: "Trióxido de dimanganeso",
    nomenclaturaStock: "Óxido de manganeso (III)",
    nomenclaturaTradicional: "Óxido mangánico",
    formulaOxidacion: "Mn₂O₃",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-3'
},
{
    id: 14,
    nomenclatura: "Ce",
    elemento: "Cerio",
    valencia: 3,
    nomenclaturaSistematica: "Trióxido de dicerio",
    nomenclaturaStock: "Óxido de cerio (III)",
    nomenclaturaTradicional: "Óxido cerico",
    formulaOxidacion: "Ce₂O₃",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '3-4'
},
{
    id: 15,
    nomenclatura: "Pr",
    elemento: "Praseodimio",
    valencia: 3,
    nomenclaturaSistematica: "Trióxido de dipraseodimio",
    nomenclaturaStock: "Óxido de praseodimio (III)",
    nomenclaturaTradicional: "Óxido praseodímico",
    formulaOxidacion: "Pr₂O₃",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '3-4'
},
{
    id: 16,
    nomenclatura: "Nb",
    elemento: "Niobio",
    valencia: 3,
    nomenclaturaSistematica: "Trióxido de diniobio",
    nomenclaturaStock: "Óxido de niobio (III)",
    nomenclaturaTradicional: "Óxido niobioso",
    formulaOxidacion: "Nb₂O₃",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '3-5'
},
{
    id: 17,
    nomenclatura: "Ta",
    elemento: "Tantalio",
    valencia: 3,
    nomenclaturaSistematica: "Trióxido de ditantalio",
    nomenclaturaStock: "Óxido de tantalio (III)",
    nomenclaturaTradicional: "Óxido tantálico",
    formulaOxidacion: "Ta₂O₃",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '3-5'
},
{
    id: 18,
    nomenclatura: "V",
    elemento: "Vanadio",
    valencia: 3,
    nomenclaturaSistematica: "Trióxido de divanadio",
    nomenclaturaStock: "Óxido de vanadio (III)",
    nomenclaturaTradicional: "Óxido vanadioso",
    formulaOxidacion: "V₂O₃",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '3-5'
}






];

export const elementosTablaVale4: ElementoQuimico[] = [
    {
        id: 0,
        nomenclatura: "Hf",
        elemento: "Hafnio",
        valencia: 4,
        nomenclaturaSistematica: "Tetraóxido de hafnio",
        nomenclaturaStock: "Óxido de hafnio (IV)",
        nomenclaturaTradicional: "Óxido hafníco",
        formulaOxidacion: "HfO₂",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 1,
        nomenclatura: "Ir",
        elemento: "Iridio",
        valencia: 4,
        nomenclaturaSistematica: "Tetraóxido de iridio",
        nomenclaturaStock: "Óxido de iridio (IV)",
        nomenclaturaTradicional: "Óxido irídico",
        formulaOxidacion: "IrO₂",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 2,
        nomenclatura: "Os",
        elemento: "Osmio",
        valencia: 4,
        nomenclaturaSistematica: "Tetraóxido de osmio",
        nomenclaturaStock: "Óxido de osmio (IV)",
        nomenclaturaTradicional: "Óxido osmico",
        formulaOxidacion: "OsO₂",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 3,
        nomenclatura: "Th",
        elemento: "Torio",
        valencia: 4,
        nomenclaturaSistematica: "Tetraóxido de torio",
        nomenclaturaStock: "Óxido de torio (IV)",
        nomenclaturaTradicional: "Óxido tórico",
        formulaOxidacion: "ThO₂",
        color: coloresPorGrupo["actínido"]
    },
    {
        id: 4,
        nomenclatura: "Zr",
        elemento: "Zirconio",
        valencia: 4,
        nomenclaturaSistematica: "Tetraóxido de zirconio",
        nomenclaturaStock: "Óxido de zirconio (IV)",
        nomenclaturaTradicional: "Óxido zirconico",
        formulaOxidacion: "ZrO₂",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 5,
        nomenclatura: "Pd",
        elemento: "Paladio",
        valencia: 4,
        nomenclaturaSistematica: "Tetraóxido de paladio",
        nomenclaturaStock: "Óxido de paladio (IV)",
        nomenclaturaTradicional: "Óxido paládico",
        formulaOxidacion: "PdO₂",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 6,
        nomenclatura: "Ti",
        elemento: "Titanio",
        valencia: 4,
        nomenclaturaSistematica: "Tetraóxido de titanio",
        nomenclaturaStock: "Óxido de titanio (IV)",
        nomenclaturaTradicional: "Óxido titánico",
        formulaOxidacion: "TiO₂",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 7,
        nomenclatura: "Pt",
        elemento: "Platino",
        valencia: 4,
        nomenclaturaSistematica: "Tetraóxido de platino",
        nomenclaturaStock: "Óxido de platino (IV)",
        nomenclaturaTradicional: "Óxido platínico",
        formulaOxidacion: "PtO₂",
        color: coloresPorGrupo["metal de transición"]
    },
    {
    id: 8,
    nomenclatura: "Pb",
    elemento: "Plomo",
    valencia: 4,
    nomenclaturaSistematica: "Dióxido de plomo",
    nomenclaturaStock: "Óxido de plomo (IV)",
    nomenclaturaTradicional: "Óxido plúmbico",
    formulaOxidacion: "PbO₂",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-4'
},
{
    id: 9,
    nomenclatura: "Sn",
    elemento: "Estaño",
    valencia: 4,
    nomenclaturaSistematica: "Dióxido de estaño",
    nomenclaturaStock: "Óxido de estaño (IV)",
    nomenclaturaTradicional: "Óxido estánico",
    formulaOxidacion: "SnO₂",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-4'
}
,
{
    id: 10,
    nomenclatura: "Ce",
    elemento: "Cerio",
    valencia: 4,
    nomenclaturaSistematica: "Dióxido de cerio",
    nomenclaturaStock: "Óxido de cerio (IV)",
    nomenclaturaTradicional: "Óxido cerico",
    formulaOxidacion: "CeO₂",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '3-4'
},
{
    id: 11,
    nomenclatura: "Pr",
    elemento: "Praseodimio",
    valencia: 4,
    nomenclaturaSistematica: "Dióxido de praseodimio",
    nomenclaturaStock: "Óxido de praseodimio (IV)",
    nomenclaturaTradicional: "Óxido praseodímico",
    formulaOxidacion: "PrO₂",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '3-4'
}



];

export const elementosTablaVale5: ElementoQuimico[] = [
{
    id: 19,
    nomenclatura: "Nb",
    elemento: "Niobio",
    valencia: 5,
    nomenclaturaSistematica: "Pentóxido de niobio",
    nomenclaturaStock: "Óxido de niobio (V)",
    nomenclaturaTradicional: "Óxido niobico",
    formulaOxidacion: "Nb₂O₅",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '3-5'
},
{
    id: 20,
    nomenclatura: "Ta",
    elemento: "Tantalio",
    valencia: 5,
    nomenclaturaSistematica: "Pentóxido de tantalio",
    nomenclaturaStock: "Óxido de tantalio (V)",
    nomenclaturaTradicional: "Óxido tantálico",
    formulaOxidacion: "Ta₂O₅",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '3-5'
},
{
    id: 21,
    nomenclatura: "V",
    elemento: "Vanadio",
    valencia: 5,
    nomenclaturaSistematica: "Pentóxido de vanadio",
    nomenclaturaStock: "Óxido de vanadio (V)",
    nomenclaturaTradicional: "Óxido vanádico",
    formulaOxidacion: "V₂O₅",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '3-5'
}

];


export const elementosTablaVale6: ElementoQuimico[] = [
    {
        id: 0,
        nomenclatura: "U",
        elemento: "Uranio",
        valencia: 6,
        nomenclaturaSistematica: "Hexóxido de uranio",
        nomenclaturaStock: "Óxido de uranio (VI)",
        nomenclaturaTradicional: "Óxido uránico",
        formulaOxidacion: "UO₃",
        color: coloresPorGrupo["actínido"]
    },
    {
        id: 1,
        nomenclatura: "W",
        elemento: "Tungsteno",
        valencia: 6,
        nomenclaturaSistematica: "Hexóxido de tungsteno",
        nomenclaturaStock: "Óxido de tungsteno (VI)",
        nomenclaturaTradicional: "Óxido volfrámico",
        formulaOxidacion: "WO₃",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 2,
        nomenclatura: "W",
        elemento: "Wolframio",
        valencia: 6,
        nomenclaturaSistematica: "Hexóxido de wolframio",
        nomenclaturaStock: "Óxido de wolframio (VI)",
        nomenclaturaTradicional: "Óxido wolfrámico",
        formulaOxidacion: "WO₃",
        color: coloresPorGrupo["metal de transición"]
    },
    {
        id: 3,
        nomenclatura: "Mo",
        elemento: "Molibdeno",
        valencia: 6,
        nomenclaturaSistematica: "Hexóxido de molibdeno",
        nomenclaturaStock: "Óxido de molibdeno (VI)",
        nomenclaturaTradicional: "Óxido molíbdico",
        formulaOxidacion: "MoO₃",
        color: coloresPorGrupo["metal de transición"]
    },
    {
    id: 4,
    nomenclatura: "Cr",
    elemento: "Cromo",
    valencia: 6,
    nomenclaturaSistematica: "Trióxido de cromo",
    nomenclaturaStock: "Óxido de cromo (VI)",
    nomenclaturaTradicional: "Óxido crómico",
    formulaOxidacion: "CrO₃",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '2-3-6'
}


];

export const elementosTablaVale7: ElementoQuimico[] = [
    {
    id: 0,
    nomenclatura: "Mn",
    elemento: "Manganeso",
    valencia: 7,
    nomenclaturaSistematica: "Heptóxido de dimanganeso",
    nomenclaturaStock: "Óxido de manganeso (VII)",
    nomenclaturaTradicional: "Óxido mangánico",
    formulaOxidacion: "Mn₂O₇",
    color: coloresPorGrupo["metal de transición"],
    valenciasDoble: '4-6-7'
}

];