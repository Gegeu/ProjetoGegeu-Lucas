import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Modal } from 'react-bootstrap';

import './style.css';


function Pedidos() {
    const thead = [
        {id : 'cliente', label:"Cliente"},
        {id : 'produto', label:"Produto"},
        {id : 'quantidade', label:"Quantidade"},
        {id : 'data_entrega', label:"Data de entrega"},
        {id : 'status', label:"Status"},
    ];

    const [show, setShow] = useState(false);
    const [pedidosItens, setPedidosItens] = useState([]);

    const removeProduct = () => {
        alert('remover produto');
    }

    const selectAllCheckbox = () => {
        const checkbox = document.querySelector('#checkbox-title');
        const allCheckBox = document.querySelectorAll('.checkbox-body');
        if (checkbox.checked === false){
            allCheckBox.forEach((value, index, list) => {
                allCheckBox[index].checked = false;
            });
            checkbox.checked = false;
            
        }else{
            checkbox.checked = true;
            allCheckBox.forEach((value, index, list) => {
                allCheckBox[index].checked = true;
            });

        }
    }

    
    const data_atual = () => {
      const data = new Date(),
          dia  = data.getDate().toString(),
          diaF = (dia.length == 1) ? '0'+dia : dia,
          mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
          mesF = (mes.length == 1) ? '0'+mes : mes,
          anoF = data.getFullYear();
      return diaF+"/"+mesF+"/"+anoF;
    }
  
    const setPedido = () => {
        const pedido = {
            cliente : document.querySelector('#cliente'),
            produto : document.querySelector('#produto'),
            quantidade : document.querySelector('#quantidade'),
            data_entrega : document.querySelector('#data_entrega'),
            data_pedido : data_atual(),
            status : 'Pagamento pendente'
        }
        setPedidosItens([...pedidosItens, pedido]);
        // console.log(pedidosItens);
        handleClose();
    }

    const handleClose = () => {
      setShow(false);
    }

    const handleShow = () => setShow(true);
    return (
        <div>
            <Modal show={show} centered={true} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Cadastro</Modal.Title>
                </Modal.Header>
                <Modal.Body dialogas='div' className='modal-form'>
                    <label for="cliente">Cliente</label>
                    <input type="text" id="cliente" placeholder="Cliente"/> 
                    <label for="produto">Produto</label>
                    <input type="text" id="produto" placeholder="Produto"/> 
                    <label for="quantidade">Quantidade</label>
                    <input type="text" id="quantidade" placeholder="Quantidade"/> 
                    <label for="data_entrega">Data entrega</label>
                    <input type="date" id="data_entrega" placeholder="Data de entrega"/> 
                </Modal.Body>
                <Modal.Footer>
                
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={ () => setPedido()}>
                    Salvar
                </Button>
                </Modal.Footer>
            </Modal>
            <div className="pedidos">
                <div className="header-table">
                    <div className="header-name">
                        <h2>Pedidos</h2>
                    </div>
                    <div className="header-icons">
                        <i onClick={ handleShow } className="material-icons">add_box</i>
                        <i onClick={ removeProduct } className="material-icons">delete</i>
                    </div>
                </div>
                <table className="content-table">
                    <thead className="content-title">
                        <tr className="content-cell">
                            <td><input id="checkbox-title" onChange={ selectAllCheckbox} type="checkbox"/></td>
                            {thead.map (th => (
                                <td key={ th.id }>{ th.label }</td>
                                ))}
                        </tr>
                    </thead>
                    <tbody className="content-body">
                        {pedidosItens.map (td => (
                            <tr key={ td.id } className="content-cell">
                                <td ><input className="checkbox-body" type="checkbox"/></td>
                            <td>{ td.cliente }</td>
                            <td>{ td.produto }</td>
                            <td>{ td.quantidade }</td>
                            <td>{ td.data_entrega }</td>
                            <td>{ td.status }</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-table">

                </div>
            </div>
        </div>
    );
}

export default Pedidos;