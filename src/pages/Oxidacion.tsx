import { Input, Row, Col, Tabs, Card, Modal, Badge } from "antd";
import { elementosTabla, elementosTablaVale2, elementosTablaVale3, elementosTablaVale4, elementosTablaVale5, elementosTablaVale6, elementosTablaVale7 } from "@/hooks/elementos";
import { useEffect, useState } from "react";
import ModalDataOxidacion from "@/components/ModalDataOxidacion";
const { Search } = Input;
const { TabPane } = Tabs;

function Oxidacion() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataOxidacion, setdataOxidacion] = useState<any>();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isModalOpen) {
            setLoading(true); // resetear loading al abrir
            timer = setTimeout(() => setLoading(false), 1550);
        }

        return () => {
            if (timer) clearTimeout(timer); // limpiar siempre
        };
    }, [isModalOpen]);


    return (
        <div style={{ padding: "16px" }}>
            <Row justify="start" align="middle" gutter={16} style={{ marginBottom: "16px" }} className=" p1-y">
                <Col>
                    <h1 style={{ fontSize: "1.8rem", fontWeight: "600", margin: 0 }}>
                        Oxidación Básica
                    </h1>
                </Col>
              
            </Row>

            <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
                <TabPane tab={<h3>Valencia 1</h3>} key="1">
                    <div className="flex flex-wrap gap-12 justify-start">
                        {elementosTabla
                            .filter((el) => el.valencia === 1)
                            .map((el) => (
                                <Card
                                    key={el.id}
                                    className="w-28 h-28 mb-1 rounded-lg shadow p-2 text-center relative flex flex-col justify-between cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg"
                                    style={{
                                        backgroundColor: `${el.color}50`,
                                        transition: "all 0.2s ease-in-out",
                                        border: "0px solid transparent",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = `1px solid ${el.color}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = "0px solid transparent";
                                    }}
                                    onClick={() => {
                                        setdataOxidacion(el);
                                        showModal();
                                    }}
                                >
                                    <span
                                        className="absolute top-1 right-1 text-white text-xs font-bold px-2 py-0.5 rounded"
                                        style={{ backgroundColor: el.color, color: "black" }}
                                    >
                                        {el.valencia}
                                    </span>

                                    <div className="text-4xl font-bold">{el.nomenclatura}</div>
                                    <div className="text-[14px] font-medium text-gray-700">{el.elemento}</div>

                                    {el.valenciasDoble && (
                                        <div
                                            className="mt-1 mx-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ backgroundColor: "#c0aa30d0", color: "#000" }}
                                        >
                                            {el.valenciasDoble}
                                        </div>
                                    )}
                                </Card>
                            ))}
                    </div>
                </TabPane>
            </Tabs>

            <Tabs defaultActiveKey="1" type="card" className="custom-tabs mt-1">
                <TabPane tab={<h3>Valencia 2</h3>} key="1">
                    <div className="flex flex-wrap gap-12 justify-start">
                        {elementosTablaVale2
                            .filter((el) => el.valencia === 2)
                            .map((el) => (
                                <Card
                                    key={el.id}
                                    className="w-28 h-28 mb-1 rounded-lg shadow p-2 text-center relative flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                    style={{
                                        backgroundColor: `${el.color}20`,
                                        border: "0px solid transparent"
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = `1px solid ${el.color}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = "0px solid transparent";
                                    }}
                                    onClick={() => { setdataOxidacion(el); showModal(); }}
                                >
                                    <span
                                        className="absolute top-1 right-1 text-xs font-bold px-2 py-0.5 rounded"
                                        style={{ backgroundColor: el.color, color: "black" }}
                                    >
                                        {el.valencia}
                                    </span>
                                    <div className="text-4xl font-bold">{el.nomenclatura}</div>
                                    <div className="text-[14px] font-medium text-gray-700">{el.elemento}</div>
                                    {el.valenciasDoble && (
                                        <div
                                            className="mt-1 mx-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ backgroundColor: "#c0aa30d0", color: "#000" }}
                                        >
                                            {el.valenciasDoble}
                                        </div>
                                    )}
                                </Card>

                            ))}
                    </div>



                </TabPane>
            </Tabs>

            <Tabs defaultActiveKey="1" type="card" className="custom-tabs mt-1">
                <TabPane tab={<h3>Valencia 3</h3>} key="1">
                    <div className="flex flex-wrap gap-12 justify-start">
                        {elementosTablaVale3
                            .filter((el) => el.valencia === 3)
                            .map((el) => (
                                <Card
                                    key={el.id}
                                    className="w-28 h-28 mb-1 rounded-lg shadow p-2 text-center relative flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                    style={{
                                        backgroundColor: `${el.color}20`,
                                        border: "0px solid transparent"
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = `1px solid ${el.color}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = "0px solid transparent";
                                    }}
                                    onClick={() => { setdataOxidacion(el); showModal(); }}
                                >
                                    <span
                                        className="absolute top-1 right-1 text-xs font-bold px-2 py-0.5 rounded"
                                        style={{ backgroundColor: el.color, color: "black" }}
                                    >
                                        {el.valencia}
                                    </span>
                                    <div className="text-4xl font-bold">{el.nomenclatura}</div>
                                    <div className="text-[14px] font-medium text-gray-700">{el.elemento}</div>
                                    {el.valenciasDoble && (
                                        <div
                                            className="mt-1 mx-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ backgroundColor: "#c0aa30d0", color: "#000" }}
                                        >
                                            {el.valenciasDoble}
                                        </div>
                                    )}
                                </Card>

                            ))}
                    </div>



                </TabPane>
            </Tabs>

            <Tabs defaultActiveKey="1" type="card" className="custom-tabs mt-1">
                <TabPane tab={<h3>Valencia 4</h3>} key="1">
                    <div className="flex flex-wrap gap-12 justify-start">
                        {elementosTablaVale4
                            .filter((el) => el.valencia === 4)
                            .map((el) => (
                                <Card
                                    key={el.id}
                                    className="w-28 h-28 mb-1 rounded-lg shadow p-2 text-center relative flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                    style={{
                                        backgroundColor: `${el.color}20`,
                                        border: "0px solid transparent"
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = `1px solid ${el.color}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = "0px solid transparent";
                                    }}
                                    onClick={() => { setdataOxidacion(el); showModal(); }}
                                >
                                    <span
                                        className="absolute top-1 right-1 text-xs font-bold px-2 py-0.5 rounded"
                                        style={{ backgroundColor: el.color, color: "black" }}
                                    >
                                        {el.valencia}
                                    </span>
                                    <div className="text-4xl font-bold">{el.nomenclatura}</div>
                                    <div className="text-[14px] font-medium text-gray-700">{el.elemento}</div>
                                    {el.valenciasDoble && (
                                        <div
                                            className="mt-1 mx-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ backgroundColor: "#c0aa30d0", color: "#000" }}
                                        >
                                            {el.valenciasDoble}
                                        </div>
                                    )}
                                </Card>

                            ))}
                    </div>



                </TabPane>
            </Tabs>

            <Tabs defaultActiveKey="1" type="card" className="custom-tabs mt-1">
                <TabPane tab={<h3>Valencia 5</h3>} key="1">
                    <div className="flex flex-wrap gap-12 justify-start">
                        {elementosTablaVale5
                            .filter((el) => el.valencia === 5)
                            .map((el) => (
                                <Card
                                    key={el.id}
                                    className="w-28 h-28 mb-1 rounded-lg shadow p-2 text-center relative flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                    style={{
                                        backgroundColor: `${el.color}20`,
                                        border: "0px solid transparent"
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = `1px solid ${el.color}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = "0px solid transparent";
                                    }}
                                    onClick={() => { setdataOxidacion(el); showModal(); }}
                                >
                                    <span
                                        className="absolute top-1 right-1 text-xs font-bold px-2 py-0.5 rounded"
                                        style={{ backgroundColor: el.color, color: "black" }}
                                    >
                                        {el.valencia}
                                    </span>
                                    <div className="text-4xl font-bold">{el.nomenclatura}</div>
                                    <div className="text-[14px] font-medium text-gray-700">{el.elemento}</div>
                                    {el.valenciasDoble && (
                                        <div
                                            className="mt-1 mx-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ backgroundColor: "#c0aa30d0", color: "#000" }}
                                        >
                                            {el.valenciasDoble}
                                        </div>
                                    )}
                                </Card>

                            ))}
                    </div>



                </TabPane>
            </Tabs>


            <Tabs defaultActiveKey="1" type="card" className="custom-tabs mt-1">
                <TabPane tab={<h3>Valencia 6</h3>} key="1">
                    <div className="flex flex-wrap gap-12 justify-start">
                        {elementosTablaVale6
                            .filter((el) => el.valencia === 6)
                            .map((el) => (
                                <Card
                                    key={el.id}
                                    className="w-28 h-28 mb-1 rounded-lg shadow p-2 text-center relative flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                    style={{
                                        backgroundColor: `${el.color}20`,
                                        border: "0px solid transparent"
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = `1px solid ${el.color}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = "0px solid transparent";
                                    }}
                                    onClick={() => { setdataOxidacion(el); showModal(); }}
                                >
                                    <span
                                        className="absolute top-1 right-1 text-xs font-bold px-2 py-0.5 rounded"
                                        style={{ backgroundColor: el.color, color: "black" }}
                                    >
                                        {el.valencia}
                                    </span>
                                    <div className="text-4xl font-bold">{el.nomenclatura}</div>
                                    <div className="text-[14px] font-medium text-gray-700">{el.elemento}</div>
                                    {el.valenciasDoble && (
                                        <div
                                            className="mt-1 mx-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ backgroundColor: "#c0aa30d0", color: "#000" }}
                                        >
                                            {el.valenciasDoble}
                                        </div>
                                    )}
                                </Card>

                            ))}
                    </div>



                </TabPane>
            </Tabs>


            <Tabs defaultActiveKey="1" type="card" className="custom-tabs mt-1">
                <TabPane tab={<h3>Valencia 7</h3>} key="1">
                    <div className="flex flex-wrap gap-12 justify-start">
                        {elementosTablaVale7
                            .filter((el) => el.valencia === 7)
                            .map((el) => (
                                <Card
                                    key={el.id}
                                    className="w-28 h-28 mb-1 rounded-lg shadow p-2 text-center relative flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                    style={{
                                        backgroundColor: `${el.color}20`,
                                        border: "0px solid transparent"
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = `1px solid ${el.color}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.border = "0px solid transparent";
                                    }}
                                    onClick={() => { setdataOxidacion(el); showModal(); }}
                                >
                                    <span
                                        className="absolute top-1 right-1 text-xs font-bold px-2 py-0.5 rounded"
                                        style={{ backgroundColor: el.color, color: "black" }}
                                    >
                                        {el.valencia}
                                    </span>
                                    <div className="text-4xl font-bold">{el.nomenclatura}</div>
                                    <div className="text-[14px] font-medium text-gray-700">{el.elemento}</div>
                                    {el.valenciasDoble && (
                                        <div
                                            className="mt-1 mx-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ backgroundColor: "#c0aa30d0", color: "#000" }}
                                        >
                                            {el.valenciasDoble}
                                        </div>
                                    )}
                                </Card>

                            ))}
                    </div>



                </TabPane>
            </Tabs>

<Modal
  open={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
  closable={{ 'aria-label': 'Custom Close Button' }}
  getContainer={false}  // 🔑 asegura que se renderice dentro del div con "dark"
>

  <ModalDataOxidacion data={dataOxidacion} loading={loading} />
</Modal>



        </div>
    );
}

export default Oxidacion;
