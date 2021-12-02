import closeIcon from "../../assets/fechar.svg";
import "./styles.css";

function LeadDetails({ leads, openDetails, setOpenDetails }) {
  const detailedLead = leads.find((lead) => lead.id === openDetails);

  return (
    <div className="backdrop-details" onClick={() => setOpenDetails(-1)}>
      <div className="container-details" onClick={(e) => e.stopPropagation()}>
        <img src={closeIcon} alt="" onClick={() => setOpenDetails(-1)} />
        <h2>{detailedLead.name}</h2>
        <div className="container-infos-detailed">
          <span>{detailedLead.phone}</span>
          <span>{detailedLead.email}</span>
        </div>
        <div className="container-checkeds-detailed">
          <span>{detailedLead.rpa ? "RPA" : ""}</span>
          <span>{detailedLead.pd ? "Produto Digital" : ""}</span>
          <span>{detailedLead.bpm ? "BPM" : ""}</span>
          <span>{detailedLead.analytics ? "Analytics" : ""}</span>
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
