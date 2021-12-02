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
  setLeadsLocalStorage,
  leadsLocalStorage,
}) {
  const [lastIdLocalStorage, setLastIdLocalStorage] = useLocalStorage(
    "lastId",
    0
  );

  const { setOpenModal, openModal, token } = useUsers();

  const [newLead, setNewLead] = useState({
    nome: "",
    telefone: "",
    email: "",
    checkRPA: false,
    checkPD: false,
    checkBPM: false,
    checkAna: false,
    position: "left",
    id: lastIdLocalStorage,
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

  function handleSubmitLead(e) {
    e.preventDefault();

    setNewLead({ ...newLead, id: lastIdLocalStorage });

    setLeadsLocalStorage([...leadsLocalStorage, newLead]);

    setNewLead({
      nome: "",
      telefone: "",
      email: "",
      checkRPA: false,
      checkPD: false,
      checkBPM: false,
      checkAna: false,
      position: "left",
      id: lastIdLocalStorage,
    });
    setOpenForm(false);
    toast.messageSuccess("Lead criado com sucesso!")
    setOpenModal(true);
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
                value={newLead.nome}
                onChange={(e) =>
                  setNewLead({ ...newLead, nome: e.target.value })
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
            <button
              onClick={() => setLastIdLocalStorage(lastIdLocalStorage + 1)}
              className="btn btn-send-lead"
            >
              Salvar
            </button>
          </form>
        </div>
      )}
      {openModal && (
        
        <div
   
          className="modal-success-background"
          onClick={() => {
            setOpenModal(false);
            setOpenForm(false);
          }}
        >
          <div className={`modal-success-container `}>
            <img
              className="close-modal close"
              src={closeIcon}
              alt="Fechar"
              onClick={() => {
                setOpenModal(false);
                setOpenForm(false);
              }}
            />
            <span>Lead criado com sucesso!</span>
            {
              <button
                className={`btn-login-modal btn`}
                onClick={() => setOpenModal(false)}
              >
                OK
              </button>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default ContainerModalForm;
