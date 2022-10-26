import { Grid, Paper, Box, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const CreatePage = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({});
	const [mess, setMess] = useState('');

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleCancel = () => {
		if (window.confirm('Are u sure?')) {
			navigate('/');
		}
	};

	const createProductApi = async () => {
		console.log(form);
		return await axios.post('http://localhost:3001/products', form)
	};

	const handleSubmit = e => {
		e.preventDefault();
		createProductApi()
			.then(res => {
				setMess('Thêm sản phẩm thành công!');
				setTimeout(()=>navigate('/'),1000)
			})
			.catch(err => console.log(err));
	};

	return (
		<div>
			<Grid conatainer spacing={2}>
				<Grid item xs={3} />
				<Grid item xs={6}>
					<Paper elevation={2} sx={{ padding: 2, mt: 15, boxShadow: '2px 2px 2px 2px', maxWidth: 800, ml: 35 }}>
                        {mess ? <Alert color='success'>{ mess}</Alert> : ''}
						<h2>Thêm sản phẩm</h2>
						<Box component='form' onSubmit={handleSubmit}>
							<div>
								<TextField fullWidth label='Tên sản phẩm' type='text' required name='name' onChange={handleChange} />
							</div>
							<div>
								<TextField type='number' label='Giá' required sx={{ mt: 1 }} name='price' onChange={handleChange} />
								<TextField
									type='nuimber'
									label='Tồn kho'
									required
									sx={{ mt: 1, ml: 10 }}
									name='stock'
									onChange={handleChange}
								/>
							</div>
							<div>
								<TextField
									type='text'
									label='Mô tả'
									sx={{ mt: 1 }}
									fullWidth
									name='description'
									onChange={handleChange}
								/>
							</div>
							<Button type='submit' variant='contained' color='primary' sx={{ mt: 1 }}>
								Thêm mới
							</Button>
						</Box>
						<Button variant='contained' color='warning' onClick={handleCancel} sx={{ mt: 1 }}>
							Hủy
						</Button>
					</Paper>
				</Grid>
				<Grid item xs={3} />
			</Grid>
		</div>
	);
};

export default CreatePage;
