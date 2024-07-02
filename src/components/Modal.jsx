import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import OutsideAlerter from './outside_alerter';

const Modal = ({ closeModal, children, size, closable = true, closeOnOutsideClick = true, customStyles = {wrapper: '', modal: '', modalExit: ''} }) => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'scroll';
        };
    }, [null])

    const onClose = () => {
        closeModal();
    }

    return <div className={`modal-wrapper ${customStyles.wrapper}`} style={{ zIndex: 99999 }}>
        <div className={`modal ${size} ${customStyles.modal}`}>
              <OutsideAlerter onClickOut={closeOnOutsideClick ? onClose : () => {}}>
              <>
                <div className={`modal-exit ${customStyles.modalExit}`}>
                    { closable && <a onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </a>}
                </div>
                <div className={`modal-content ${customStyles.modalContent}`}>
                    {children}
                </div>
                </>
            </OutsideAlerter>
        </div>
    </div>
}

export default Modal;
