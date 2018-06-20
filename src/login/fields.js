import React from 'react'
export const customInput=props=>{
	return(
	<div>
		<label>{props.label}</label>
		<input {...props.input} type={props.type} autoFocus={props.autoFocus} />
	</div>
	)
}