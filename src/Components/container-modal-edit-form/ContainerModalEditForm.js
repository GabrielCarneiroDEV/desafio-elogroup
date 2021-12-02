import { useEffect, useState } from "react";
import close from "../../assets/fechar.svg";
import toast from "../../helpers/toast";

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
    name: "",
    phone: "",
    email: "",
    rpa: false,
    pd: false,
    bpm: false,
    analytics: false,
    position: "left",
    userId: token,
  });

  function handleAllCheck(e) {
    setNewLead({
      ...newLead,
      rpa: e.target.checked,
      pd: e.target.checked,
      bpm: e.target.checked,
      analytics: e.target.checked,
    });
  }

  useEffect(() => {
    const {
      name,
      phone,
      email,
      rpa,
      pd,
      bpm,
      analytics,
      position,
      id,
      userId,
    } = leadInEditing;
    setNewLead({
      name,
      phone,
      email,
      rpa,
      pd,
      bpm,
      analytics,
      position,
      id,
      userId,
    });
    //eslint-disable-next-line
  }, []);

  async function handleSubmitLead(e) {
    e.preventDefault();
    console.log(e.target.id);

    try {
      const response = await fetch(
        `https://api-leads-control.herokuapp.com/leads/${Number(editingLead)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newLead),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem);
      }
    } catch (error) {
      return toast.messageError(error.message);
    }

    const indexLead = allLeads.indexOf(leadInEditing);
    // setLeads([...leads, newLead])
    allLeads.splice(indexLead, 1, newLead);

    setLeadsLocalStorage(allLeads);
    toast.messageSuccess("Edição concluída com sucesso!");
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
              className="input-text"
              type="text"
              value={newLead.name}
              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
              placeholder="inserir nome..."
              required
            />
          </div>
          <div>
            <label htmlFor="">Telefone:</label>
            <input
              className="input-text"
              type="phone"
              maxLength="15char"
              value={newLead.phone}
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
                setNewLead({ ...newLead, phone: e.target.value });
              }}
              placeholder="inserir telefone..."
            />
          </div>
          <div>
            <label htmlFor="">Email:</label>
            <input
              className="input-text"
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
                  setNewLead({ ...newLead, rpa: e.target.checked })
                }
                checked={newLead.rpa}
              />
            </div>
            <div className="checkbox">
              <label htmlFor="produtodigital">Produto Digital</label>
              <input
                type="checkbox"
                id="produtodigital"
                onChange={(e) =>
                  setNewLead({ ...newLead, pd: e.target.checked })
                }
                checked={newLead.pd}
              />
            </div>
            <div className="checkbox">
              <label htmlFor="analytics">Analytics</label>
              <input
                type="checkbox"
                id="analytics"
                onChange={(e) =>
                  setNewLead({ ...newLead, analytics: e.target.checked })
                }
                checked={newLead.analytics}
              />
            </div>
            <div className="checkbox">
              <label htmlFor="bpm">BPM</label>
              <input
                type="checkbox"
                id="bpm"
                onChange={(e) =>
                  setNewLead({ ...newLead, bpm: e.target.checked })
                }
                checked={newLead.bpm}
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
