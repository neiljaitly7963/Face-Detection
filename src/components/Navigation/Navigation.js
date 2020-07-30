import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {

			if (isSignedIn) {
				return(
					<nav style={{display:'flex', justifyContent: 'flex-end'}}>
						<p onClick={() => onRouteChange('signout')} className=' link dim black  pointer'> Sign Out </p>
					</nav>
					)
			}

			else{
				return(
					<div>
						<nav style={{display:'flex', justifyContent: 'flex-end'}}>
							<p onClick={() => onRouteChange('signin')} className=' link dim black  pointer'> Sign In </p>
						</nav>

						<nav style={{display:'flex', justifyContent: 'flex-end'}}>
							<p onClick={() => onRouteChange('Register')} className=' link dim black  pointer'> Register </p>
						</nav>
					</div>
					)
			}
		
}

export default Navigation;