import React from 'react';
import brain from './brain.svg'
import './Logo.css';

const Logo = () => {
	return(
		<div style={{display:'flex', flexDirection:'column'}}>
			
 			 <img  alt='logo' src={brain} height= '150 px' /> 
		
		</div>
		)
}

export default Logo;