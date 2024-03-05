import React from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { resetToastMessage } from '../features/toastMsg/toastMsgSlice';
import Button from 'react-bootstrap/Button';

const ToastAlert = () => {  
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  return (
      <ToastContainer
          style={{ zIndex: 1, marginTop: '5rem', marginRight:'10rem', position: 'fixed' }}
          position="top-end"
      >
          <Toast
              onClose={() => dispatch(resetToastMessage())}
              show={toast.toastMessageVisibility}
            //   delay={3000}
              bg={'success'}
            //   autohide
              className="d-inline-block m-1"
          >
              <Toast.Body className={'d-flex text-white'}>
                  <strong className="me-auto fs-6">
                      {toast.toastMessageContent}
                  </strong>
                  <Button
                      className="btn-close me-2 m-auto btn-close-white"
                      data-bs-dismiss="toast"
                      aria-label="Close"
                      onClick={() => dispatch(resetToastMessage())}
                  ></Button>
              </Toast.Body>
          </Toast>
      </ToastContainer>
  );
}

export default ToastAlert;
