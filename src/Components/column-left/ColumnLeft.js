function ColumnLeft({
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
}) {
  return (
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
            <div className="empty " key={lead.id} />
          )
        )}
      </div>
    </div>
  );
}

export default ColumnLeft;
