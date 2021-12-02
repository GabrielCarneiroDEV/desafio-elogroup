import { useState } from "react";
import { useLocalStorage } from "react-use";
import closeIcon from "../../assets/fechar.svg";
import useUsers from "../../hooks/useUsers";
import toast from "../../helpers/toast"
import "../../styles/globals.css"
import "./styles.css";

function ContainerModalForm({
  setOpenForm,
  openForm,
  setLeads,
  leads
}) {
  const [lastIdLocalStorage, setLastIdLocalStorage] = useLocalStorage(
    "lastId",
    0
  );

  const { token } = useUsers();

  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    rpa: false,
    pd: false,
    bpm: false,
    analytics: false,
    position: "left",
    id: lastIdLocalStorage,
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

  async function handleSubmitLead(e) {
    e.preventDefault();

    try {
      const response = await fetch(`https://api-leads-control.herokuapp.com/leads`, 
      {
        method: "POST",
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(newLead)
        
      })
      const data = await response.json();
      
      if(!response.ok){        
        throw new Error(data.mensagem);
      }  
      setLeads([...leads, newLead])
      setOpenForm(false);
      toast.messageSuccess("Lead criado com sucesso!");

    } catch (error) {
     return toast.messageError(error.message);
      
    }   
   
  }
  
  return (
    <div onClick={() => setOpenForm(false)} className="backdrop-modal-leads">
      {openForm && (
        <div onClick={(e) => e.stopPropagation()} className="modal-add-leads">
          <div className="close-modal-leads">
            <img
              src={closeIcon}
              alt="fechar"
              onClick={() => setOpenForm(false)}
            />
          </div>
          <form className="form form-lead" onSubmit={handleSubmitLead}>
            <div>
              <label htmlFor="">Nome:</label>
              <input
                className="input-text"
                type="text"
                value={newLead.name}
                onChange={(e) =>
                  setNewLead({ ...newLead, name: e.target.value })
                }
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
                required
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
                required
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
                  checked={newLead.checkPD}
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
            <button
              onClick={() => setLastIdLocalStorage(lastIdLocalStorage + 1)}
              className="btn btn-send-lead"
            >
              Salvar
            </button>
          </form>
        </div>
      )}

    </div>
  );
}

export default ContainerModalForm;
