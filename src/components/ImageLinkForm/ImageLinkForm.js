import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSumbit}) => {
	return(
		<div>
			<p className='f3'>
			{'This Magic Brain will detect faces in your picture'}
			</p>
			<div className='center'>
				<div className='form center pa2 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
					<button 
					className='w-30 grow  link    black'
					onClick={onButtonSumbit}
					>Detect</button>
				</div>
			</div>
		</div> 
		)
}

export default ImageLinkForm;