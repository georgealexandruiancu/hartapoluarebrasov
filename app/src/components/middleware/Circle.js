
import React from 'react';

const Circle = (props: any) => {

const { color, name, id, visible, strokeColor, strokeWeight, fillColor, fillOpacity, strokeOpacity, radius } = props;

	return visible ? (
				<div className="circle"
					style={{ border: strokeWeight + "px solid" + strokeColor,
							cursor: 'grab',
							borderRadius: "50%",
							backgroundColor: fillColor,
							width: radius + "px",
							height: radius + "px",
							opacity: fillOpacity
						}}
					title={name}
				/>
			) : (
				<></>
			);
};

export default Circle;
