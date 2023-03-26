import PropTypes from 'prop-types';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import './Style_Modal.scss';

const Modal = ({ image, close }) => {
  const { url, alt } = image;
  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={url} alt={alt} />
        <i
          onClick={e => {
            close(e);
          }}
          className="CloseIcon"
        >
          <AiOutlineCloseSquare />
        </i>
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  close: PropTypes.func.isRequired,
};
export default Modal;
