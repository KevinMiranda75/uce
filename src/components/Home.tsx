import React from 'react';
import { Brain, Layers, Dices, FlaskConical, ChevronRight } from 'lucide-react';

const games = [
    {
        name: "Memorama Químico",
        href: "/memoria",
        description: "Pon a prueba tu memoria con conceptos de química.",
        icon: Brain,
        color: "bg-blue-500"
    },
    {
        name: "Barajas Valencias",
        href: "/barajas",
        description: "Aprende y repasa las valencias de los elementos.",
        icon: Layers,
        color: "bg-purple-500"
    },
    {
        name: "Serpientes y Escaleras",
        href: "/serpientes-escaleras",
        description: "El clásico juego adaptado a desafíos científicos.",
        icon: Dices,
        color: "bg-emerald-500"
    },
    {
        name: "Oxidación",
        href: "/dashboard/oxidacion",
        description: "Simulador de estados de oxidación y reacciones.",
        icon: FlaskConical,
        color: "bg-amber-500"
    }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Bienvenido, Kevin</h1>
                    <p className="text-lg text-gray-600">Selecciona una actividad para comenzar tu aprendizaje</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {games.map((game) => (
                        <a
                            key={game.name}
                            href={game.href}
                            className="group relative flex items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-gray-200"
                        >
                            <div className={`p-4 rounded-xl ${game.color} text-white mr-6`}>
                                <game.icon size={28} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-900">{game.name}</h2>
                                <p className="text-gray-500">{game.description}</p>
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}