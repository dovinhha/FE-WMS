import React from 'react'
import { Button, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import InputCustom from 'views/pages/components/InputCustom'

const DialogExtractMeasure = ({open,toggle}) => {
  return (
    <Modal isOpen={open} toggle={toggle}>
        <ModalHeader><p className="h2 text-uppercase">Xuất danh sách số đo</p></ModalHeader>
        <ModalBody>
            <div className="d-flex justify-content-between">
                <p className="h3 text-sm mb-0 mr-3">Chọn đơn vị/phòng ban</p>
                <InputCustom style={{width:'50%'}} />
                <Button size="md" style={{minWidth:'max-content' ,marginLeft:'1rem'}}>Xuất file</Button>
            </div>
        </ModalBody>
    </Modal>
  )
}

export default DialogExtractMeasure