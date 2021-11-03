import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import deleteIcon from "../../assets/delete-white.svg";
import detailsIcon from "../../assets/details-white.svg";
import editIcon from "../../assets/edit-white.svg";
import closeIcon from "../../assets/fechar.svg";
import useUsers from "../../hooks/useUsers";
import "../globals.css";
import ContainerModalEditForm from "./ContainerModalEditForm";
import ContainerModalForm from "./ContainerModalForm";
import LeadDetails from "./LeadDetails";
import "./styles.css";

function ContainerDashboard() {
  const [leadsLocalStorage, setLeadsLocalStorage] = useLocalStorage(
    "leads",
    []
  );
  const [editingLead, setEditingLead] = useState(-1);
  const [openDetails, setOpenDetails] = useState(-1);
  const [openForm, setOpenForm] = useState(false);
  const [allLeads, setAllLeads] = useState([]);
  const { setToken, openModal, token } = useUsers();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(null);
  const [dragId, setDragId] = useState({ id: 0, lastPosition: "" });
  const [stateLead, setStateLead] = useState("left");
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    setAllLeads(leadsLocalStorage);
    setLeads(leadsLocalStorage.filter((x) => x.userId === token));
    // eslint-disable-next-line
  }, [leadsLocalStorage]);

  function handleDeleteLead(e) {
    setLeadsLocalStorage(
      leadsLocalStorage.filter((lead) => lead.id !== Number(e.target.id))
    );
  }

  return (
    <div className="container-dashboard">
      <h1>Paínel de Leads</h1>
      <div className="buttons">
        <button className="btn btn-add-lead" onClick={() => setOpenForm(true)}>
          Novo Lead (+)
        </button>

        <button className="btn btn-logout" onClick={() => setToken("")}>
          Sair
        </button>
      </div>
      <div className="container-table">
        <div className="table-titles">
          <div className="column-left border-solid">
            <h2>Clientes em Potencial</h2>
            <div className="container-leads">
              {leads.map((lead, index) =>
                lead.position === "left" ? (
                  <div
                    id={lead.id}
                    key={index}
                    className="lead left "
                    draggable="true"
                    onDrag={(e) =>
                      setDragId({
                        id: Number(e.target.id),
                        lastPosition: "left",
                      })
                    }
                  >
                    <div className="container-icons">
                      <img
                        id={lead.id}
                        onClick={() => setOpenConfirmDelete(lead.id)}
                        src={deleteIcon}
                        alt=""
                      />
                      <img
                        id={lead.id}
                        onClick={(e) => setOpenDetails(Number(e.target.id))}
                        src={detailsIcon}
                        alt=""
                      />
                      <img
                        id={lead.id}
                        onClick={(e) => setEditingLead(Number(e.target.id))}
                        src={editIcon}
                        alt=""
                      />
                    </div>
                    <span>{lead.nome}</span>
                    {openConfirmDelete === lead.id && (
                      <div className="delete-confirm">
                        <img
                          onClick={() => setOpenConfirmDelete(null)}
                          src={closeIcon}
                          alt="fechar"
                          className="close-confirm"
                        />
                        <span>Deletar {lead.nome}? </span>
                        <div className="container-buttons-confirm-delete">
                          <button
                            id={lead.id}
                            onClick={handleDeleteLead}
                            className="btn"
                          >
                            Sim
                          </button>
                          <button
                            onClick={() => setOpenConfirmDelete(null)}
                            className="btn"
                          >
                            Não
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="empty " key={lead.id} />
                )
              )}
            </div>
          </div>
          <div className="column-center border-solid">
            <h2>Dados Confirmados</h2>
            <div className="container-leads">
              {leads.map((lead, index) =>
                lead.position === "center" ? (
                  <div
                    id={lead.id}
                    key={index}
                    className="lead center "
                    draggable="true"
                    onDrag={(e) =>
                      setDragId({
                        id: Number(e.target.id),
                        lastPosition: "center",
                      })
                    }
                  >
                    <div className="container-icons">
                      <img
                        id={lead.id}
                        onClick={() => setOpenConfirmDelete(lead.id)}
                        src={deleteIcon}
                        alt=""
                      />
                      <img
                        id={lead.id}
                        onClick={(e) => setOpenDetails(Number(e.target.id))}
                        src={detailsIcon}
                        alt=""
                      />
                      <img
                        id={lead.id}
                        onClick={(e) => setEditingLead(Number(e.target.id))}
                        src={editIcon}
                        alt=""
                      />
                    </div>
                    <span>{lead.nome}</span>
                    {openConfirmDelete === lead.id && (
                      <div className="delete-confirm">
                        <img
                          onClick={() => setOpenConfirmDelete(null)}
                          src={closeIcon}
                          alt="fechar"
                          className="close-confirm"
                        />
                        <span>Deletar {lead.nome}? </span>
                        <div className="container-buttons-confirm-delete">
                          <button
                            id={lead.id}
                            onClick={handleDeleteLead}
                            className="btn"
                          >
                            Sim
                          </button>
                          <button
                            onClick={() => setOpenConfirmDelete(null)}
                            className="btn"
                          >
                            Não
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="empty"
                    key={lead.id}
                    onDragOver={(e) => {
                      setStateLead("center");
                      e.preventDefault();
                    }}
                    onDragLeave={() => setStateLead("left")}
                    onDrop={(e) => {
                      setStateLead("center");
                      lead.position =
                        lead.id === dragId.id ? stateLead : "left";
                      const indexLead = allLeads.indexOf(lead);

                      allLeads.splice(indexLead, 1, lead);

                      setLeadsLocalStorage(allLeads);
                    }}
                  />
                )
              )}
            </div>
          </div>
          <div className="column-right">
            <h2>Reunião Agendada</h2>
            <div className="container-leads">
              {leads.map((lead) =>
                lead.position === "right" ? (
                  <div className="lead right " key={lead.id}>
                    <div className="container-icons">
                      <img
                        id={lead.id}
                        onClick={() => setOpenConfirmDelete(lead.id)}
                        src={deleteIcon}
                        alt=""
                      />
                      <img
                        id={lead.id}
                        onClick={(e) => setOpenDetails(Number(e.target.id))}
                        src={detailsIcon}
                        alt=""
                      />
                      <img
                        id={lead.id}
                        onClick={(e) => setEditingLead(Number(e.target.id))}
                        src={editIcon}
                        alt=""
                      />
                    </div>
                    <span>{lead.nome}</span>
                    {openConfirmDelete === lead.id && (
                      <div className="delete-confirm">
                        <img
                          onClick={() => setOpenConfirmDelete(null)}
                          src={closeIcon}
                          alt="fechar"
                          className="close-confirm"
                        />
                        <span>Deletar {lead.nome}? </span>
                        <div className="container-buttons-confirm-delete">
                          <button
                            id={lead.id}
                            onClick={handleDeleteLead}
                            className="btn"
                          >
                            Sim
                          </button>
                          <button
                            onClick={() => setOpenConfirmDelete(null)}
                            className="btn"
                          >
                            Não
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="empty "
                    key={lead.id}
                    onDragOver={(e) => {
                      setStateLead("right");

                      e.preventDefault();
                    }}
                    onDragLeave={() => setStateLead("center")}
                    onDrop={(e) => {
                      setStateLead("right");

                      lead.position =
                        lead.id === dragId.id &&
                        dragId.lastPosition === "center"
                          ? stateLead
                          : "left";
                      const indexLead = allLeads.indexOf(lead);

                      allLeads.splice(indexLead, 1, lead);

                      setLeadsLocalStorage(allLeads);
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {openDetails !== -1 && (
        <LeadDetails
          leads={leads}
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
        />
      )}
      {editingLead > -1 && (
        <ContainerModalEditForm
          token={token}
          leads={leads}
          editingLead={editingLead}
          setEditingLead={setEditingLead}
          allLeads={allLeads}
          setLeadsLocalStorage={setLeadsLocalStorage}
        />
      )}
      {openForm || openModal ? (
        <ContainerModalForm
          setLeadsLocalStorage={setLeadsLocalStorage}
          leadsLocalStorage={leadsLocalStorage}
          openForm={openForm}
          setOpenForm={setOpenForm}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ContainerDashboard;
