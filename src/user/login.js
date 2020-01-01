import React from 'react';
import './login.css';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ButtonGroup, Form, Label} from 'react-bootstrap';

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email : '',
			password :  '',
		};
		this.result = '';
	}


	changeHandler = (e) =>{
		this.setState({[e.target.name]:e.target.value})
	}

	submitHandler = (e) =>{
		e.preventDefault()
		const head = { headers : {'Content-Type': 'application/json'}}
		axios.post('https://api.microphe.info/user/login', this.state, head)
		.then(response => {this.result = response.data.token})
		.catch(error => alert("Sikertelen bejelentkezés!"))
		if(this.result != ''){
			this.props.history.push('/user', {token : this.result});

		}
	}

	render(){
		const {email, password} = this.state
		return(
			<div className="">
				<div className="keret">
					<p>Bejelentkezés</p>
					<Form onSubmit={this.submitHandler}>
						  	<Form.Group controlId="email">
						    	<Form.Label>E-mail cím:</Form.Label>
						    	<Form.Control name='email' type="email" value= {email} onChange={this.changeHandler}/>					    
							</Form.Group>

							<Form.Group controlId="password">
							    <Form.Label>Jelszó:</Form.Label>
							    <Form.Control name='password' type="password" value = {password} onChange={this.changeHandler} />					    
						  	</Form.Group>
						<ButtonGroup style={{marginLeft: '40%'}} vertical>
							<Button type='submit' variant="primary" >Bejelentkezés</Button>													
						</ButtonGroup> 
					</Form>
					<Link to='/regi'>Regisztráció</Link>
				</div>
			</div>
			);
	}
}
export default Login;
