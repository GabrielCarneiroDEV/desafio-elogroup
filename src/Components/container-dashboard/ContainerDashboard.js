import { useState } from "react";
import { Link } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import "./styles.css";
function ContainerDashboard() {
    const {setToken} = useUsers()
    const [leads, setLeads] = useState([{ text: "Primeiro Lead", position: 'center' }, { text: "segundo Lead", position: 'left' }, { text: "terceiro Lead", position: 'center' }, { text: "Quarto Lead", position: 'right' }, { text: "Quinto Lead", position: 'left' }, { text: "sexto Lead", position: 'right' }]);


    return (

        <div className="container-dashboard">
            <h1>Paínel de Leads</h1>
            <button className="btn btn-logout" onClick={() =>setToken('')}>Sair</button>
            <button className="btn btn-add-lead">Adicionar Lead</button>
            <div className="container-table">

                <div className="table-titles">
                    <div className="column-left border-solid">
                        <h2>Clientes em Potencial</h2>
                        <div className="container-leads">
                            {leads.map(lead =>

                                lead.position === "left" ?

                                    <div className="lead  " draggable="true" onDrag={() => console.log("arrastando")} onDragStart={() => console.log("começou")} onDragEnd={() => console.log("soltou")}>
                                        <span>{lead.text}</span>

                                    </div> :
                                    <div className="empty "/>
                            )}
                        </div>
                    </div>
                    <div className="column-center border-solid">
                        <h2>Dados Confirmados</h2>
                        <div className="container-leads">
                            {leads.map(lead =>

                                lead.position === "center" ?

                                    <div className="lead  " draggable="true" onDrag={() => console.log("arrastando")} onDragStart={() => console.log("começou")} onDragEnd={() => console.log("soltou")}>
                                        <span>{lead.text}</span>

                                    </div> :
                                    <div className="empty "/>
                            )}
                        </div>

                    </div>
                    <div className="column-right">
                        <h2>Reunião Agendada</h2>
                        <div className="container-leads">
                            {leads.map(lead =>

                                lead.position === "right" ?

                                    <div className="lead  " draggable="true" onDrag={() => console.log("arrastando")} onDragStart={() => console.log("começou")} onDragEnd={() => console.log("soltou")}>
                                        <span>{lead.text}</span>

                                    </div> :
                                    <div className="empty "/>
                            )}
                        </div>
                    </div>
                </div>



            </div>



        </div >
    );
}

export default ContainerDashboard;