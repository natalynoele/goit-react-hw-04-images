import PropTypes from 'prop-types';
import './Style_Button.scss';

const Button = ({ click, children }) => {
  return (
    <button type="button" className="Button" onClick={() => click()}>
      {children}
    </button>
  );
};

Button.propTypes = {
  click: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Button;
