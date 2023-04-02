import PropTypes from 'prop-types';
import './Style_Button.scss';

const Button = ({ click, children, pages=1 }) => {
  const counterPage = () => {
    let i = pages + 1;
    click(i)
  }
  
  return (
    <button type="button" className="Button" onClick={() =>counterPage() }>
      {children}
    </button>
  );
};

Button.propTypes = {
  click: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Button;
