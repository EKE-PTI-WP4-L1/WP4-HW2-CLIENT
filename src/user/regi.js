import React from 'react';
import './registration.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ButtonGroup, Form, Label} from 'react-bootstrap';

class Registration extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email : '',
			password: '',
			password_s : ''
		}
	}
	changeHandler = (e) =>{
		this.setState({[e.target.name]:e.target.value})
	}

	submitHandler = (e) =>{
		if(this.state.password == this.state.password_s)
		{
			e.preventDefault()
			axios.post('https://api.microphe.info/user/signup', {email: this.state.email, password : this.state.password})
			.then(response => alert("Sikeres regisztráció!"))
			.catch(error => alert("Sikertelen regisztráció!"))
		}else{
			alert("Jelszavak nem egyeznek!");
		}
	}
	render(){
		const {email, password, password_s} = this.state
		return(
			<div className="">
				<div className="keret">
				<p>Regisztráció</p>
					<Form onSubmit={this.submitHandler}>
						  	<Form.Group controlId="email">
						    	<Form.Label>E-mail cím:</Form.Label>
						    	<Form.Control name='email' type="email" value= {email} onChange={this.changeHandler}/>					    
							</Form.Group>

							<Form.Group controlId="password">
							    <Form.Label>Jelszó:</Form.Label>
							    <Form.Control name='password' type="password" value = {password} onChange={this.changeHandler} />					    
						  	</Form.Group>

						  	<Form.Group controlId="password_s">
							    <Form.Label>Jelszó újra:</Form.Label>
							    <Form.Control name='password_s' type="password" value = {password_s} onChange={this.changeHandler} />					    
						  	</Form.Group>
						<ButtonGroup style={{marginLeft: '40%'}} vertical>						
							<Button type='submit' variant="primary">Regisztráció</Button>						
						</ButtonGroup> 
					</Form>
					<Link to='/login'>Bejelentkezés</Link>
				</div>
			</div>
			);
	}
}


export default Registration;