import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import animated from "../animated/animated.json";
import Lottie from "lottie-react";
import { Col, Row } from 'antd';

function ModalDataOxidacion({ data, loading }: { data: any, loading: any }) {

    const [showH2, setShowH2] = useState("");
    const [showH3, setShowH3] = useState("");
    const [showP, setShowP] = useState("");
    const [show4, setShow4] = useState("");
    const [show5, setShow5] = useState("");
    const [show6, setShow6] = useState("");

    useEffect(() => {
        if (!data) return;

        setShowH2("");
        setShowH3("");
        setShowP("");
        setShow4("");
        setShow5("");
        setShow6("");

        const delayTimer = setTimeout(() => {
            let i = 0;
            const h2Text = data?.elemento ? `   Oxidación Básica: ${data.elemento}` : "   Oxidación Básica:";
            const h2Interval = setInterval(() => {
                setShowH2((prev) => prev + (h2Text[i] || ""));
                i++;
                if (i >= h2Text.length) {
                    clearInterval(h2Interval);

                    setTimeout(() => setShowH3("Fórmula de oxidación:"), 400);
                    setTimeout(() => setShowP(data.formulaOxidacion || ""), 800);
                    setTimeout(() => setShow4(data.nomenclaturaSistematica || ""), 1200);
                    setTimeout(() => setShow5(data.nomenclaturaStock || ""), 1600);
                    setTimeout(() => setShow6(data.nomenclaturaTradicional || ""), 2000);
                }
            }, 50);

            return () => clearInterval(h2Interval);
        }, 1650);

        return () => clearTimeout(delayTimer);
    }, [data]);



    function cleanText(text?: string) {
        return text ? text : ""; // si es undefined o null, devuelve cadena vacía
    }

    return (
       <div
    className={`flex flex-col p-4 min-w-[250px] min-h-[250px] bg-white dark:bg-gray-900 rounded-lg shadow-md 
    ${loading ? "items-center justify-center text-center" : "items-start justify-start text-left"}`}
>
    {loading ? (
        <div className="w-64 h-64">
            <Lottie animationData={animated} loop={true} />
        </div>
    ) : (
        <div className="w-full">
            <Row justify="center">
                <Col>
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                        {showH2}
                    </h2>
                </Col>
            </Row>

            {showH3 && (
                <div className="my-6 flex flex-col gap-3">
                    <h3 className="text-lg mb-2 font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> {showH3}
                    </h3>
                    {showP && (
                        <p
                            className="text-gray-600 dark:text-gray-300 text-lg font-bold pl-3"
                            style={{ borderLeft: "3px solid #3B82F6", marginLeft: "1rem", marginBottom: "1rem" }}
                        >
                            {showP.split("").map((char, idx) =>
                                /\d/.test(char) ? <sub key={idx}>{char}</sub> : char
                            )}
                        </p>
                    )}
                </div>
            )}

            {show4 && (
                <div className="my-6 flex flex-col gap-3">
                    <h3 className="text-lg mb-2 font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Nomenclatura Sistemática
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-bold pl-3" style={{ borderLeft: "3px solid #EF4444", marginLeft: "1rem", marginBottom: "1rem" }}>
                        {show4}
                    </p>
                </div>
            )}

            {show5 && (
                <div className="my-6 flex flex-col gap-3">
                    <h3 className="text-lg mb-2 font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Nomenclatura Stock
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-bold pl-3" style={{ borderLeft: "3px solid #10B981", marginLeft: "1rem", marginBottom: "1rem" }}>
                        {show5}
                    </p>
                </div>
            )}

            {show6 && (
                <div className="my-6 flex flex-col gap-3">
                    <h3 className="text-lg mb-2 font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" /> Nomenclatura Tradicional
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-bold pl-3" style={{ borderLeft: "3px solid #FACC15", marginLeft: "1rem" }}>
                        {show6}
                    </p>
                </div>
            )}
        </div>
    )}
</div>




    )
}

export default ModalDataOxidacion