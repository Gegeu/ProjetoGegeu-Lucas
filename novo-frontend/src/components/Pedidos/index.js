import React, { useEffect } from 'react';

import './style.css';


function Pedidos() {
    const thead = [
        {id : 'cliente', label:"Cliente"},
        {id : 'produto', label:"Produto"},
        {id : 'quantidade', label:"Quantidade"},
        {id : 'data_entrega', label:"Data de entrega"},
        {id : 'status', label:"Status"},
    ];

    const trs = [
        {id: '1' , cliente: 'Gegeu', produto: 'Bombom de chocolate', quantidade: '200 unidades', data_entrega : '14/02/2020', status : 'Pagamento pendente'},
        {id: '2' , cliente: 'Gegeu', produto: 'Bombom de chocolate', quantidade: '200 unidades', data_entrega : '14/02/2020', status : 'Pagamento pendente'},
        {id: '3' , cliente: 'Gegeu', produto: 'Bombom de chocolate', quantidade: '200 unidades', data_entrega : '14/02/2020', status : 'Pagamento pendente'},
        {id: '4' , cliente: 'Gegeu', produto: 'Bombom de chocolate', quantidade: '200 unidades', data_entrega : '14/02/2020', status : 'Pagamento pendente'},
        {id: '5' , cliente: 'Gegeu', produto: 'Bombom de chocolate', quantidade: '200 unidades', data_entrega : '14/02/2020', status : 'Pagamento pendente'},
    ]

    const addProduct = () => {
        alert('fui clicado');
    }

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

    return (
        <div className="pedidos">
            <div className="header-table">
                <div className="header-name">
                    <h2>Pedidos</h2>
                </div>
                <div className="header-icons">
                    <i onClick={ addProduct } className="material-icons">add_box</i>
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
                    {trs.map (td => (
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
    );
}

export default Pedidos;