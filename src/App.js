import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RegisterForm from './login'
import {postData,random,encode} from './utils'
import SHA256 from 'crypto-js/sha256'
import AES from 'crypto-js/aes'
/*import WordArray from 'crypto-js/lib-typedarrays'
import encHEX from 'crypto-js/enc-hex'
import encUTF8 from 'crypto-js/enc-utf8'
import enc64 from 'crypto-js/enc-base64'
*/
import crypto from 'crypto-js'
export class Name extends Component{
	constructor(props=null){
		super(props)
		this.state={name:'Anonymous User'}
	}
	componentWillMount(){
		postData('http://0.0.0.0:5000/users/anonym',{id:undefined}).then(async data=>{this.setState(data);console.log(data)})
	}
	render(){
		return(<header className="App-header">
		<h1 className="App-title" id='h'>Hello, there! {this.state.name}</h1>
	</header>)
	}
}
export class HeaderApp extends Component {
  render() {
    return (
      <div className="App">
		<Router>
	  		<header>
				<Link to="/login">
		  			<button className='login' id='usr_btn'>Login or Signup</button>
				</Link>
				<Route exact path="/login" component={props=><RegisterForm onSubmit={values=>{
					let {username,password}=values,send={}
					password=crypto.SHA256(values.password).toString(crypto.enc.HEX)
					console.log(password)
					let key=random(32),encoded_key=encode(key);
					password=crypto.AES.encrypt(values.password,key)
					//.toString(crypto.enc.HEX)
					console.log(password)
					console.log('key is: '+key)
					send['password']=password.toString(crypto.enc.HEX)
					send['username']=username
					send['key']=encoded_key
					send['iv']=password.iv.toString(crypto.enc.HEX)
					console.log('iv is: '+password.iv.toString(crypto.enc.HEX))
					console.log(AES.decrypt(password,key).toString(crypto.enc.Utf8))
					postData('http://0.0.0.0:5000/users/admin_',send).then(data=>console.log(data))
					window.alert(JSON.stringify(values,null,4))}}/>} />
	  		</header>
		</Router>
      </div>
    );
  }
}
