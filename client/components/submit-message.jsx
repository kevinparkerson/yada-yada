import PropTypes from 'prop-types';
import React from 'react';

import '../styles/submit-message.scss';

const SubmitMessage = ({ onMessageSubmit }) => (
	<div className="yada_submit-message">
			<textarea
				onKeyDown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						onMessageSubmit(e.target.value);
						e.target.value = '';
					}
				}}
			/>
	</div>
);

SubmitMessage.defaultProps = {
	onMessageSubmit: () => {}
};

SubmitMessage.propTypes = {
	onMessageSubmit: PropTypes.func
};

export default SubmitMessage;
