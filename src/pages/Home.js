import { Grid, TableContainer, Table, TableHead, TableBody, TableRow, Paper, Button, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../features/productSlice';
import { changeStatus } from '../features/flagSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const HomePage = () => {
	const [list, setList] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [mess, setMess] = useState();

	const flag = useSelector(state => state.flag.flag);

	const getAllProductApi = async () => {
		return await axios.get('http://localhost:3001/products');
	};

	const getProductDetailApi = async id => {
		return await axios.get(`http://localhost:3001/products/${id}`);
	};

	const handleDetail = id => {
		getProductDetailApi(id)
			.then(res => {
				dispatch(setProduct(res.data));
			})
			.catch(err => console.log(err));
	};

	const handleEdit = id => {
		getProductDetailApi(id)
			.then(res => {
				dispatch(setProduct(res.data));
				navigate('/edit');
			})
			.catch(err => console.log(err.message));
	};

	const handleDelete = async id => {
		if (window.confirm('Bạn chắc chắn muốn xóa?')) {
			await axios
				.delete(`http://localhost:3001/products/${id}`)
				.then(() => {
					dispatch(changeStatus(flag + 1));
					setMess('Xóa sản phẩm thành công!');
				})
				.catch(err => console.log(err.message));
		}
	};

	useEffect(() => {
		getAllProductApi()
			.then(res => {
				console.log(res.data);
				setList(res.data);
			})
            .catch(err => console.log(err));
        setTimeout(()=>setMess(''),1000)
	}, [flag]);

	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs></Grid>
				<Grid item xs>
					<Paper elevation={3} sx={{ padding: 1, boxShadow: '2px 2px 2px 2px', mt: 10 }}>
						{mess ? <Alert color='success'>{mess}</Alert> : ''}
						<h3>Danh sách sản phẩm</h3>
						<Button variant='contained' color='primary' onClick={() => navigate('/create')}>
							Thêm sản phẩm
						</Button>
						<TableContainer component={Paper} sx={{ mt: 1 }}>
							<Table sx={{ minWidth: 700 }} aria-label='customized table'>
								<TableHead>
									<TableRow>
										<StyledTableCell>#</StyledTableCell>
										<StyledTableCell align='left'>Tên Sản Phẩm</StyledTableCell>
										<StyledTableCell align='left'>Giá(đ)</StyledTableCell>
										<StyledTableCell align='left'>Tồn Kho</StyledTableCell>
										<StyledTableCell align='left'></StyledTableCell>
										<StyledTableCell align='left'></StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{list.slice(0, 5).map((row, index) => (
										<StyledTableRow key={index}>
											<StyledTableCell component='th' scope='row'>
												{index + 1}
											</StyledTableCell>
											<StyledTableCell align='left'>
												<Link to='/detail' onClick={() => handleDetail(row.id)}>
													{row.name}
												</Link>
											</StyledTableCell>
											<StyledTableCell align='left'>{row.price}</StyledTableCell>
											<StyledTableCell align='left'>{row.stock}</StyledTableCell>
											<StyledTableCell align='left'>
												<Button variant='contained' color='primary' onClick={() => handleEdit(row.id)}>
													Cập Nhật
												</Button>
											</StyledTableCell>
											<StyledTableCell align='left'>
												<Button variant='contained' color='error' onClick={() => handleDelete(row.id)}>
													Xóa
												</Button>
											</StyledTableCell>
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
		</div>
	);
};

export default HomePage;
