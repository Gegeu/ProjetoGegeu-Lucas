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
    
    const data_atual = () => {
      const data = new Date(),
          dia  = data.getDate().toString(),
          diaF = (dia.length === 1) ? '0'+dia : dia,
          mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
          mesF = (mes.length === 1) ? '0'+mes : mes,
          anoF = data.getFullYear();
      return diaF+"/"+mesF+"/"+anoF;
    }

    const [show, setShow] = useState(false);
    const [pedidosItens, setPedidosItens] = useState([
        {id : '1', cliente: 'gegeu', produto: 'maconha da boa1', quantidade: '12kg', data_entrega: '14/08/1998', data_pedido: data_atual(), status: 'Pagamento Pendente'},
        {id : '2', cliente: 'gegeu', produto: 'maconha da boa2', quantidade: '12kg', data_entrega: '14/08/1998', data_pedido: data_atual(), status: 'Pagamento Pendente'},
        {id : '3', cliente: 'gegeu', produto: 'maconha da boa3', quantidade: '12kg', data_entrega: '14/08/1998', data_pedido: data_atual(), status: 'Pagamento Pendente'},
        {id : '4', cliente: 'gegeu', produto: 'maconha da boa4', quantidade: '12kg', data_entrega: '14/08/1998', data_pedido: data_atual(), status: 'Pagamento Pendente'},
        {id : '5', cliente: 'gegeu', produto: 'maconha da boa5', quantidade: '12kg', data_entrega: '14/08/1998', data_pedido: data_atual(), status: 'Pagamento Pendente'},
        {id : '6', cliente: 'gegeu', produto: 'maconha da boa6', quantidade: '12kg', data_entrega: '14/08/1998', data_pedido: data_atual(), status: 'Pagamento Pendente'},
        {id : '7', cliente: 'gegeu', produto: 'maconha da boa7', quantidade: '12kg', data_entrega: '14/08/1998', data_pedido: data_atual(), status: 'Pagamento Pendente'},
        {id : '8', cliente: 'gegeu', produto: 'maconha da boa8', quantidade: '12kg', data_entrega: '14/08/1998', data_pedido: data_atual(), status: 'Pagamento Pendente'},
        {id : '9', cliente: 'gegeu', produto: 'maconha da boa9', quantidade: '12kg', data_entrega: '14/08/1998', data_pedido: data_atual(), status: 'Pagamento Pendente'},
    ]);
    const removeProduct = () => {
        const itens = document.querySelectorAll('.checkbox-body');
        const itensFiltrados = [...itens].filter(elemento => elemento.checked);
        const body = document.querySelector('.content-body');
        itensFiltrados.forEach((elemento, index) =>{
            body.removeChild(itensFiltrados[index].parentElement.parentElement);
        });
    }

    const transformPayment =(elemento) => {
        const tmp = pedidosItens.map(object => {
            const status = object.status === 'Pagamento recebido' ? 'Pagamento Pendente' : 'Pagamento recebido';
            if (object.id === elemento){
                return {
                    ...object,
                    status
                }
            }else {
                return object;
            }
        });
        setPedidosItens(tmp);
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
    

    const addPedido = (pedido) => {
        setPedidosItens([...pedidosItens,pedido]);
        handleClose();
    } 
    const getPedido = () => {
        const pedido =  {
            id : 'dsadas',
            cliente : document.querySelector('#cliente').value,
            produto : document.querySelector('#produto').value,
            quantidade : document.querySelector('#quantidade').value,
            data_entrega : document.querySelector('#data_entrega').value,
            data_pedido : data_atual(),
            status : 'Pagamento pendente'
        }
        return pedido;
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
               
                <Button variant="primary" onClick={() => addPedido(getPedido())}>
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
                        <i onClick={ handleShow } title="Adicionar" className="material-icons">add_box</i>
                        <i onClick={ removeProduct } title="Excluir" className="material-icons">delete</i>
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
                        {
                        pedidosItens.map (td => (
                            <tr id={ td.id }key={ td.id } className="content-cell">
                                <td ><input className="checkbox-body" type="checkbox"/></td>
                                <td>{ td.cliente }</td>
                                <td>{ td.produto }</td>
                                <td>{ td.quantidade }</td>
                                <td>{ td.data_entrega }</td>
                                <td>{ td.status } 
                                <i onClick={ () => transformPayment(td.id)} title="Transformar em Pagamento recebido" className="material-icons" id="done">done</i>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                <div className="pagination-table">

                </div>
            </div>
        </div>
    );
}

export default Pedidos;