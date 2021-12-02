import toast from "../../helpers/toast"
import useUsers from "../../hooks/useUsers"

function ColumnCenter({
  leads,
  setDragId,
  setOpenConfirmDelete,
  setOpenDetails,
  detailsIcon,
  editIcon,
  deleteIcon,
  handleDeleteLead,
  setEditingLead,
  openConfirmDelete,
  closeWhiteIcon,
  setStateLead,
  setLeadsLocalStorage,
  dragId,
  stateLead,
  allLeads,
}) {
  const { token } = useUsers()
  async function updateLeadPosition(id, position){
    try {
      const response = await fetch(`https://api-leads-control.herokuapp.com/updatePosition/${Number(id)}`, 
      {
        method: "PUT",
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify({position})
        
      })
      const data = await response.json()
      
      if(!response.ok){        
        throw new Error(data.mensagem)
      }  

      const lead = leads.find(x => x.id === id);
      lead.position = position;

    } catch (error) {
     return toast.messageError(error.message);
      
    }

  }


  return (
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
              <span>{lead.name}</span>
              {openConfirmDelete === lead.id && (
                <div className="delete-confirm">
                  <img
                    onClick={() => setOpenConfirmDelete(null)}
                    src={closeWhiteIcon}
                    alt="fechar"
                    className="close-confirm"
                  />
                  <span>Deletar {lead.name}? </span>
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
                lead.position = lead.id === dragId.id ? stateLead : "left";
                updateLeadPosition(lead.id, lead.id === dragId.id ? stateLead : "left")
                 const indexLead = allLeads.indexOf(lead);

                allLeads.splice(indexLead, 1, lead);

                 setLeadsLocalStorage(allLeads);
              }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default ColumnCenter;
