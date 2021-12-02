import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import deleteIcon from "../../assets/delete-white.svg";
import detailsIcon from "../../assets/details-white.svg";
import editIcon from "../../assets/edit-white.svg";
import closeWhiteIcon from "../../assets/fechar white.svg";
import ColumnCenter from "../../Components/column-center/ColumnCenter";
import ColumnLeft from "../../Components/column-left/ColumnLeft";
import ColumnRight from "../../Components/column-right/ColumnRight";
import ContainerModalEditForm from "../../Components/container-modal-edit-form/ContainerModalEditForm";
import ContainerModalForm from "../../Components/container-modal-form/ContainerModalForm";
import LeadDetails from "../../Components/lead-details/LeadDetails";
import useUsers from "../../hooks/useUsers";
import "../../styles/globals.css";
import "./styles.css";

function Dashboard() {
  const [leadsLocalStorage, setLeadsLocalStorage] = useLocalStorage(
    "leads",
    []
  );
  const [editingLead, setEditingLead] = useState(-1);
  const [openDetails, setOpenDetails] = useState(-1);
  const [openForm, setOpenForm] = useState(false);
  const [allLeads, setAllLeads] = useState([]);
  const { token, removeUserLocalStorage, removeToken } = useUsers();
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

        <button className="btn btn-logout" onClick={() => {
          removeToken()
          removeUserLocalStorage()
          }}>
          Sair
        </button>
      </div>
      <div className="container-table">
        <div className="table-titles">
          <ColumnLeft
            leads={leads}
            setDragId={setDragId}
            setOpenConfirmDelete={setOpenConfirmDelete}
            setOpenDetails={setOpenDetails}
            detailsIcon={detailsIcon}
            editIcon={editIcon}
            deleteIcon={deleteIcon}
            handleDeleteLead={handleDeleteLead}
            setEditingLead={setEditingLead}
            openConfirmDelete={openConfirmDelete}
            closeWhiteIcon={closeWhiteIcon}
          />
          <ColumnCenter
            leads={leads}
            setDragId={setDragId}
            setOpenConfirmDelete={setOpenConfirmDelete}
            setOpenDetails={setOpenDetails}
            detailsIcon={detailsIcon}
            editIcon={editIcon}
            deleteIcon={deleteIcon}
            handleDeleteLead={handleDeleteLead}
            setEditingLead={setEditingLead}
            openConfirmDelete={openConfirmDelete}
            closeWhiteIcon={closeWhiteIcon}
            setStateLead={setStateLead}
            setLeadsLocalStorage={setLeadsLocalStorage}
            dragId={dragId}
            stateLead={stateLead}
            allLeads={allLeads}
          />
          <ColumnRight
            leads={leads}
            setOpenConfirmDelete={setOpenConfirmDelete}
            setOpenDetails={setOpenDetails}
            detailsIcon={detailsIcon}
            editIcon={editIcon}
            deleteIcon={deleteIcon}
            handleDeleteLead={handleDeleteLead}
            setEditingLead={setEditingLead}
            openConfirmDelete={openConfirmDelete}
            closeWhiteIcon={closeWhiteIcon}
            setStateLead={setStateLead}
            setLeadsLocalStorage={setLeadsLocalStorage}
            dragId={dragId}
            stateLead={stateLead}
            allLeads={allLeads}
          />
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
      {openForm ? (
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

export default Dashboard;
