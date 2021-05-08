import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { hidePopup } from '../../services';

const Popup = ({ 
  title,
  visible,
  message,
  onPressLeft,
  onPressRight,
  leftButtonTitle,
  rightButtonTitle 
}) => {

  const handlePressLeftButton = () => {
    if(onPressLeft && typeof onPressLeft === 'function') {
      onPressLeft();
    }
    hidePopup();
  }

  const handlePressRightButton = () => {
    if(onPressRight && typeof onPressRight === 'function') {
      onPressRight();
    }
    hidePopup();
  }

  return (
    <Modal isOpen={visible} backdrop="static">
      <ModalHeader className="font-weight-bold">{title}</ModalHeader>
      <ModalBody>
        {message}
      </ModalBody>
      <ModalFooter>
        {onPressLeft && <Button onClick={handlePressLeftButton} color="primary" className="font-weight-bold">{leftButtonTitle}</Button>}
        {onPressRight && <Button onClick={handlePressRightButton} color="secondary" className="font-weight-bold ml-2">{rightButtonTitle}</Button>}
      </ModalFooter>
    </Modal>
  );
}

Popup.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  message: PropTypes.oneOfType([
    PropTypes.string, PropTypes.node
  ]),
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  leftButtonTitle: PropTypes.string,
  rightButtonTitle: PropTypes.string,
}

Popup.defaultProps = {
  title: '',
  message: '',
  visible: false,
  onPressLeft: () => {},
  onPressRight: null,
  leftButtonTitle: 'Okay',
  rightButtonTitle: 'Cancel'
}

export default React.memo(Popup);