
import React from 'react';

const Marker = (props: any) => {

const { color, name, id, visible } = props;

	return visible ? (
				<div className="marker"
					style={{ backgroundColor: color, cursor: 'pointer' }}
					title={name}
				/>
			) : (
				<></>
			);
};

export default Marker;
