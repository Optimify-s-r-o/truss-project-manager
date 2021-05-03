export const Show = ({ show, children }) => {
	if (show) return children;
	return <div></div>;
};
