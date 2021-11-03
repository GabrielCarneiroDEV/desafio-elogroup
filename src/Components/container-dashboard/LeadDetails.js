import closeIcon from "../../assets/fechar.svg";

function LeadDetails({ leads, openDetails, setOpenDetails }) {
  const detailedLead = leads.find((lead) => lead.id === openDetails);

  return (
    <div className="backdrop-details" onClick={() => setOpenDetails(-1)}>
      <div className="container-details" onClick={(e) => e.stopPropagation()}>
        <img src={closeIcon} alt="" onClick={() => setOpenDetails(-1)} />
        <h2>{detailedLead.nome}</h2>
        <div className="container-infos-detailed">
          <span>{detailedLead.telefone}</span>
          <span>{detailedLead.email}</span>
        </div>
        <div className="container-checkeds-detailed">
          <span>{detailedLead.checkRPA ? "RPA" : ""}</span>
          <span>{detailedLead.checkPD ? "Produto Digital" : ""}</span>
          <span>{detailedLead.checkBPM ? "BPM" : ""}</span>
          <span>{detailedLead.checkAna ? "Analytics" : ""}</span>
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
