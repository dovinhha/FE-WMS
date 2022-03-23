import React from "react";
import { Modal, Button } from "reactstrap";
import LoadingButtonCustom from "./LoadingButtonCustom";

const ModalWarningCustom = ({
  notificationModal,
  setNotificationModal,
  name,
  func,
  isDelete,
}) => {
  return (
    <Modal
      className="modal-dialog-centered modal-danger"
      contentClassName="bg-gradient-danger"
      isOpen={notificationModal}
      toggle={() => !isDelete && setNotificationModal(false)}
    >
      <div className="modal-body">
        <div className="py-3 text-center">
          <i className="ni ni-bell-55 ni-3x" />
          <h4 className="heading mt-4">Bạn chắc chắn muốn xóa {name} này ?</h4>
        </div>
      </div>
      <div className="modal-footer">
        <Button
          className="text-white ml-auto"
          color="link"
          data-dismiss="modal"
          type="button"
          onClick={() => !isDelete && setNotificationModal(false)}
        >
          Hủy
        </Button>
        <LoadingButtonCustom
          onClick={() => {
            func();
            // setNotificationModal(false);
          }}
          className="btn-white"
          color="default"
          type="button"
          loading={isDelete}
        >
          Đồng ý
        </LoadingButtonCustom>
      </div>
    </Modal>
  );
};

export default ModalWarningCustom;
