import React,{Component} from 'react'
import {Field,reduxForm} from 'redux-form'
import {customInput} from './fields'
class RegisterComponent extends Component{
	render(){
		const {handleSubmit}=this.props
		const {hashPassword}=this.props
		return(
			<form onSubmit={handleSubmit} className='login-form'>
				<Field name="name" component={customInput} type="text" label="First Name" autoFocus="true" />
				<Field name="username" component={customInput} type="text" label="Username" />
				<Field name="password" component={customInput} label="Enter Your Password" type='password' />
				<button type="submit">Submit</button>
			</form>
		)
	}
}
let RegisterForm=reduxForm({
	form:'register'
})(RegisterComponent)
//RegisterForm=RegisterForm(RegisterForm)
export default RegisterForm