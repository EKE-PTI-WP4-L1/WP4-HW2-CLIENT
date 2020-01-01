import React from 'react';
import './product.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ButtonGroup, Form, Table, Label} from 'react-bootstrap';

class Product extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name : '',
			price : '',
			quantity : ''
		};
		try{
			this.token = this.props.location.state.token;
		}
		catch(error){
			this.props.history.push('/login');
		}
	}

	changeHandler = (e) =>{
		this.setState({[e.target.name]:e.target.value})
	}

	AddFunction = (e) =>{
		e.preventDefault()
		const head = { headers : {'Authorization': 'Bearer '+this.token}}
		axios.post('https://api.microphe.info/products', this.state, head)
		.then(alert("Sikeres rögzítés!"))
		.catch(error => alert("Sikertelen rögzítés!"))
	}
	backToUser = () =>{
		this.props.history.push('/user', {token : this.token});
	}

	render(){
		const {name, price, quantity} = this.state
		return(
				<div >
				<Button style={{marginLeft: '0.2%', marginTop: '0.2%'}} variant='primary' onClick={this.backToUser} >Vissza</Button>
					<div className="keret">
						<Form onSubmit={this.AddFunction}>

							    	<Form.Label>Termék megnevezése:</Form.Label>
							    	<Form.Control name='name' type="text" value= {name} onChange={this.changeHandler}/>					    


		
								    <Form.Label>Termék ára:</Form.Label>
								    <Form.Control name='price' type="text" value = {price} onChange={this.changeHandler} />					    


								    <Form.Label>Mennyiség:</Form.Label>
								    <Form.Control name='quantity' type="text" value = {quantity} onChange={this.changeHandler} />					    
							<ButtonGroup style={{marginLeft: '40%', marginTop: '1%'}} vertical>
								<Button type='submit' variant="primary" >Hozzáad</Button>													
							</ButtonGroup> 
						</Form>
					</div>			
				</div>
			);
	}
}

export default Product;