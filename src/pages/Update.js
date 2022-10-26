import { Grid, Paper, Box, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setProduct } from '../features/productSlice';

const UpdatePage = () => {
	const [form, setForm] = useState({});
	const [mess, setMess] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch()

	const data = useSelector(state => state.product.product);
	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleCancel = () => {
		if (window.confirm('Are u sure?')) {
			navigate('/');
		}
    };
    
    const editProductApi = async (id) => {
        return await axios.request({
            url: `http://localhost:3001/products/${id}`,
            method: 'PUT',
            headers: { 'Content-Type': 'Application/json' },
            data: JSON.stringify({
                name: form.name,
                price: form.price,
                stock: form.stock,
                description: form.description
            })
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        editProductApi(data.id)
            .then(res => {
                setMess('Sửa thông tin sản phẩm thành công!')
                setForm({})
                dispatch(setProduct({
                    id: '',
                    name: '',
                    price: 0,
                    stock: 0,
                    description: ''
                }))
                setTimeout(()=>navigate('/'),1000)
        }).catch(err=>console.log(err.message))
        
    };

    useEffect(() => {
        setForm({
            name: data.name,
            price: data.price,
            stock: data.stock,
            description: data.description
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

	return (
		<div>
			<Grid conatainer spacing={2}>
				<Grid item xs={3} />
				<Grid item xs={6}>
					<Paper elevation={2} sx={{ padding: 2, mt: 15, boxShadow: '2px 2px 2px 2px', maxWidth: 800, ml: 35 }}>
						{mess ? <Alert color='success'>{mess}</Alert> : ''}
						<h2>Sửa sản phẩm</h2>
						<Box component='form' onSubmit={handleSubmit}>
							<div>
								<TextField
									fullWidth
									label='Tên sản phẩm'
									type='text'
									required
									name='name'
									onChange={handleChange}
									value={form.name}
								/>
							</div>
							<div>
								<TextField
									type='number'
									label='Giá'
									required
									sx={{ mt: 1 }}
									name='price'
									onChange={handleChange}
									value={form.price}
								/>
								<TextField
									type='number'
									label='Tồn kho'
									required
									sx={{ mt: 1, ml: 10 }}
									name='stock'
									onChange={handleChange}
									value={form.stock}
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
									value={form.description}
								/>
							</div>
							<Button type='submit' variant='contained' color='primary' sx={{ mt: 1 }}>
								Sửa
							</Button>
						</Box>
						<Button variant='contained' color='warning' onClick={() => handleCancel} sx={{ mt: 1 }}>
							Hủy
						</Button>
					</Paper>
				</Grid>
				<Grid item xs={3} />
			</Grid>
		</div>
	);
};

export default UpdatePage;
