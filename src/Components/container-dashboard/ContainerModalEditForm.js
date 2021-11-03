import { useEffect, useState } from "react";
import close from "../../assets/fechar.svg";

function ContainerModalEditForm({
  leads,
  setEditingLead,
  editingLead,
  token,
  setLeadsLocalStorage,
  allLeads,
}) {
  const leadInEditing = leads.find((lead) => lead.id === editingLead);

  const [newLead, setNewLead] = useState({
    nome: "",
    telefone: "",
    email: "",
    checkRPA: false,
    checkPD: false,
    checkBPM: false,
    checkAna: false,
    position: "left",
    id: 0,
    userId: token,
  });

  function handleAllCheck(e) {
    setNewLead({
      ...newLead,
      checkRPA: e.target.checked,
      checkPD: e.target.checked,
      checkBPM: e.target.checked,
      checkAna: e.target.checked,
    });
  }

  useEffect(() => {
    const {
      nome,
      telefone,
      email,
      checkRPA,
      checkPD,
      checkBPM,
      checkAna,
      position,
      id,
      userId,
    } = leadInEditing;
    setNewLead({
      nome,
      telefone,
      email,
      checkRPA,
      checkPD,
      checkBPM,
      checkAna,
      position,
      id,
      userId,
    });
    //eslint-disable-next-line
  }, []);

  function handleSubmitLead(e) {
    e.preventDefault();

    const indexLead = allLeads.indexOf(leadInEditing);
    // setLeads([...leads, newLead])
    allLeads.splice(indexLead, 1, newLead);

    setLeadsLocalStorage(allLeads);

    setEditingLead(-1);
  }

  return (
    <div onClick={() => setEditingLead(-1)} className="backdrop-modal-leads">
      <div onClick={(e) => e.stopPropagation()} className="modal-add-leads">
        <div className="close-modal-leads">
          <img src={close} alt="fechar" onClick={() => setEditingLead(-1)} />
        </div>
        <form className="form form-lead" onSubmit={handleSubmitLead}>
          <div>
            <label htmlFor="">Nome:</label>
            <input
              type="text"
              value={newLead.nome}
              onChange={(e) => setNewLead({ ...newLead, nome: e.target.value })}
              placeholder="inserir nome..."
              required
            />
          </div>
          <div>
            <label htmlFor="">Telefone:</label>
            <input
              type="phone"
              maxLength="15char"
              value={newLead.telefone}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                e.target.value = e.target.value.replace(
                  /^(\d{2})(\d)/g,
                  "($1) $2"
                );
                e.target.value = e.target.value.replace(
                  /(\d)(\d{4})$/,
                  "$1-$2"
                );
                setNewLead({ ...newLead, telefone: e.target.value });
              }}
              placeholder="inserir telefone..."
            />
          </div>
          <div>
            <label htmlFor="">Email:</label>
            <input
              type="email"
              value={newLead.email}
              onChange={(e) =>
                setNewLead({ ...newLead, email: e.target.value })
              }
              placeholder="inserir email..."
            />
          </div>
          <div className="checkbox header-check">
            <label htmlFor="oportunidades">Oportunidades</label>
            <input
              type="checkbox"
              id="oportunidades"
              value="categoria 1"
              onChange={handleAllCheck}
            />
          </div>
          <div className="container-checkbox">
            <div className="checkbox">
              <label htmlFor="rpa">RPA</label>
              <input
                type="checkbox"
                id="rpa"
                onChange={(e) =>
                  setNewLead({ ...newLead, checkRPA: e.target.checked })
                }
                checked={newLead.checkRPA}
              />
            </div>
            <div className="checkbox">
              <label htmlFor="produtodigital">Produto Digital</label>
              <input
                type="checkbox"
                id="produtodigital"
                onChange={(e) =>
                  setNewLead({ ...newLead, checkPD: e.target.checked })
                }
                checked={newLead.checkPD}
              />
            </div>
            <div className="checkbox">
              <label htmlFor="analytics">Analytics</label>
              <input
                type="checkbox"
                id="analytics"
                onChange={(e) =>
                  setNewLead({ ...newLead, checkAna: e.target.checked })
                }
                checked={newLead.checkAna}
              />
            </div>
            <div className="checkbox">
              <label htmlFor="bpm">BPM</label>
              <input
                type="checkbox"
                id="bpm"
                onChange={(e) =>
                  setNewLead({ ...newLead, checkBPM: e.target.checked })
                }
                checked={newLead.checkBPM}
              />
            </div>
          </div>
          <button className="btn btn-send-lead">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default ContainerModalEditForm;
