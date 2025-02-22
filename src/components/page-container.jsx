import PropTypes from 'prop-types';

const PageContainer = ({ children }) => {
  return (
    <div
      style={{
        marginLeft: "220px", // Ensures space for the fixed sidebar
        minHeight: "100vh",
        background: "#f9f9f9",
        fontFamily: "Inter, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContainer;