import React from 'react';
import './user.css';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ButtonGroup, Form, Table, Label} from 'react-bootstrap';

class User extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			tomb: [],
			delete : ''
		};
		try{
			this.token = this.props.location.state.token;
		}
		catch(error){
			this.props.history.push('/login');
		}
		
	}
	componentDidUpdate(){
		axios
		.get('https://api.microphe.info/products').then(response=>
			{
				this.setState({tomb: response.data.products});
			}
			).catch(error=>console.log(error));
	}

	componentDidMount(){

		axios
		.get('https://api.microphe.info/products').then(response=>
			{
				this.setState({tomb: response.data.products});
			}
			).catch(error=>console.log(error));
	}

	logout = () =>{
		this.props.history.push('/login');
	}
	newProduct = () =>{
		this.props.history.push('/product', {token : this.token});
	}

	DeleteFunction = (e) =>{
		this.setState({delete : e.target.id})
		axios.delete('https://api.microphe.info/products/'+this.state.delete,{headers: { 'Authorization' : 'Bearer '+ this.token}})
		.then(alert("Törlés sikerült!"))
		.catch(error => console.log(error))
		this.forceUpdate()
	}

	render(){
		return(
				<div>
				<Button style={{marginLeft: '0.2%', marginTop: '0.2%'}} variant='primary' onClick={this.logout} >Kijeletkezés</Button>
						
						<Table style={{width: '50%', marginLeft: '25%', marginTop:'8%'}} striped bordered hover>
							<thead>
							    <tr>
							      <th>Név</th>
							      <th>Ár</th>
							      <th>Mennyiség</th>
							      <th dataAlign="center" ></th>
							    </tr>
						  	</thead>
						  	<tbody>
								{this.state.tomb.map(product=><tr><td>{product.name}</td><td>{product.price}</td><td>{product.quantity}</td><td style={{textAlign: "center"}} ><Button  id={product._id} variant="secondary" onClick={this.DeleteFunction}>Törlés</Button></td></tr>)}
						  	</tbody>
						</Table>
						<Button style={{marginLeft: '72.6%', marginTop: '-20px'}} variant='primary' onClick={this.newProduct} >+</Button>						
				</div>
			);
	}
}

export default User;