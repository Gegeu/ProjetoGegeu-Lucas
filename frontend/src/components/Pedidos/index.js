import React, { useState, useEffect }from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button, Modal } from 'react-bootstrap';
import OutlinedInput from '@material-ui/core/OutlinedInput';

function createData(cliente, produto, quantidade, data_pedido, data_entrega, status) {
  return { cliente, produto, quantidade, data_pedido, data_entrega, status };
}


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
const produtos = [
  { id : 1, label : 'Produto 1'},
  { id : 2, label : 'Produto 2'},
  { id : 3, label : 'Produto 3'},
  { id : 4, label : 'Produto 4'},
  { id : 5, label : 'Produto 5'},
  { id : 6, label : 'Produto 6'},
  { id : 7, label : 'Produto 7'},
];

const headCells = [
  { id: 'cliente', numeric: false, disablePadding: true, label: 'Cliente' },
  { id: 'produto', numeric: true, disablePadding: false, label: 'Produto' },
  { id: 'quantidade', numeric: true, disablePadding: false, label: 'Quantidade' },
  { id: 'data_pedido', numeric: false, disablePadding: false, label: 'Data do pedido' },
  { id: 'data_entrega', numeric: false, disablePadding: false, label: 'Data da entrega' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status do pedido' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  modalBody : {
    display: 'flex',
    flexDirection: 'column',
  },
  modalItem: {
    marginTop: 20,
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, addPed } = props;
  const [produto, setProduto] = useState();
  const [show, setShow] = useState(false);
  
  const data_atual = () => {
    const data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
  }
  let pedido;
  const getPedido = () => {
    pedido = {
      'cliente' : document.querySelector('#cliente').value,
      'produto' : produtos.filter(produto => {
        if (document.querySelector("#produto").value == produto.id)
          return true;
        return false;
      }),
      'quantidade' : document.querySelector('#quantidade').value,
      'data_pedido' : data_atual(),
      'data_entrega' : document.querySelector('#data').value,
    }
    handleClose();
    console.log(pedido);
    return pedido;
  }

  const handleChangeSelect = event => {
    setProduto(event.target.value);
  }

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} Selecionado(s)
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Pedidos
        </Typography>
      )}

      {
        <Tooltip title="Novo pedido">
          <IconButton aria-label="add" onClick={ handleShow }>
            <AddBox />
          </IconButton>
        </Tooltip>

      }
      {
        <Tooltip title="Excluir">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      }
      <Modal show={show} centered={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body dialogas='div' className={classes.modalBody}> 
          <InputLabel htmlFor=""></InputLabel>
          <OutlinedInput id="cliente" name="cliente" placeholder="Nome do Cliente" type="text" variant="outlined" required className={classes.modalItem}/>
          <OutlinedInput id="data" name="data" placeholder="xx/xx/xxxx" type="date" required className={classes.modalItem}/>
          <FormControl variant="outlined" className={[classes.formControl, classes.modalItem].join(" ")}>
            <InputLabel htmlFor="produto">Produto</InputLabel>
            <Select native value={ produto } inputProps={{ name:"produto", id:"produto"}} onChange={handleChangeSelect}>
            { produtos.map(produto => (
              <option key={produto.id} value={produto.id}>{produto.label}</option>
            ))}
            </Select>
          </FormControl>
          <OutlinedInput id="quantidade" name="quantidade" type="text" placeholder="Quantidade" required className={classes.modalItem}/>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={ () => addPed(getPedido())}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  addPed : PropTypes.func.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}));

export default function Pedidos() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.cliente);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const addPedido = (pedido) => {

    setRows([...rows, pedido]);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} addPed={addPedido}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.cliente);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  return (
                    <TableRow
                    hover
                    onClick={event => handleClick(event, row.cliente)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.cliente}
                    selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.cliente}
                      </TableCell>
                      <TableCell align="center">{row.produto[0].label}</TableCell>
                      <TableCell align="center">{row.quantidade}</TableCell>
                      <TableCell align="center">{row.data_pedido}</TableCell>
                      <TableCell align="center">{row.data_entrega}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5,10,25] }
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage='Linhas por página'
          
          />
      </Paper>
    </div>
  );
}