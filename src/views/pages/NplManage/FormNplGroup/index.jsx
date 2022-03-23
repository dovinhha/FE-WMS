import React, { useEffect, useState } from "react";
import {
  CardBody,
  Modal,
  Card,
  CardHeader,
  Col,
  Row,
  Button,
} from "reactstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import InputCustom from "views/pages/components/InputCustom";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { nplActions } from "Redux/Actions";
import { notify } from "common";
import _ from "lodash";

const FormNplGroup = ({
  formModal,
  setFormModal,
  nplGroup,
  notificationAlertRef,
  handleGetNplGroups,
}) => {
  const { isUpdateNplGroup } = useSelector((state) => state.nplReducer);
  const dispatch = useDispatch();

  const nplGroupSchema = yup.object().shape({
    code: yup.string().required("Mã thể loại không được để trống!"),
    name: yup.string().required("Tên thể loại không được để trống!"),
    // notes: yup.string().required("Ghi chú không được để trống!"),
  });

  const [nplGroupInfo, setNplGroupInfo] = useState({
    code: "",
    name: "",
    notes: "",
  });

  useEffect(() => {
    if (!_.isEmpty(nplGroup)) {
      setNplGroupInfo(nplGroup);
    }
  }, [nplGroup]);

  const onSubmit = (values, actions) => {
    const id = values.id;
    delete values.id;
    dispatch(
      nplActions.updateNplGroup(values, id, {
        success: () => {
          setNplGroupInfo({
            code: "",
            name: "",
            notes: "",
          });
          actions.resetForm();
          handleGetNplGroups();
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Cập nhật thể loại NPL ${values.name} thành công!`
          );
          setFormModal(false);
        },
        failed: (mess) => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Cập nhật thể loại NPL ${values.name} thất bại. Lỗi: ${mess}!`
          );
        },
      })
    );
  };
  return (
    <Modal
      className="modal-dialog-centered"
      // size="lg"
      // style={{ minWidth: 1248 }}
      isOpen={formModal}
      toggle={() => {
        setFormModal(false);
      }}
    >
      <div className="modal-body p-0">
        <Card className="bg-secondary border-0 mb-0">
          <CardHeader className="bg-transparent pb-2">
            <h2 className="mb-0">Cập nhật thông tin thể loại NPL</h2>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={nplGroupInfo}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={nplGroupSchema}
            >
              {({
                values,
                setFieldValue,
                handleSubmit,
                errors,
                touched,
                resetForm,
                handleBlur,
              }) => {
                return (
                  <>
                    <Row>
                      <Col className="mb-3" md={12}>
                        <InputCustom
                          label="Mã thể loại"
                          placeholder="Nhập mã thể loại"
                          type="text"
                          id="code"
                          name="code"
                          onBlur={handleBlur}
                          invalid={errors.code && touched.code}
                          onChange={(e) => {
                            setFieldValue("code", e.target.value);
                          }}
                          messageInvalid={errors.code}
                          value={values.code}
                        />
                      </Col>
                      <Col className="mb-3" md={12}>
                        <InputCustom
                          label="Tên thể loại"
                          placeholder="Nhập tên thể loại"
                          type="text"
                          id="name"
                          name="name"
                          onBlur={handleBlur}
                          invalid={errors.name && touched.name}
                          onChange={(e) => {
                            setFieldValue("name", e.target.value);
                          }}
                          messageInvalid={errors.name}
                          value={values.name}
                        />
                      </Col>
                      <Col className="mb-3" md={12}>
                        <InputCustom
                          label="Mô tả"
                          placeholder="Nhập mô tả"
                          type="textarea"
                          rows="5"
                          id="notes"
                          name="notes"
                          onBlur={handleBlur}
                          invalid={errors.notes && touched.notes}
                          onChange={(e) => {
                            setFieldValue("notes", e.target.value);
                          }}
                          messageInvalid={errors.notes}
                          value={values.notes}
                        />
                      </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <Button
                        onClick={() => {
                          setNplGroupInfo({
                            code: "",
                            name: "",
                            notes: "",
                          });
                          resetForm();
                          setFormModal(false);
                        }}
                        size="md"
                        type="button"
                      >
                        Hủy
                      </Button>
                      <LoadingButtonCustom
                        loading={isUpdateNplGroup}
                        onClick={() => {
                          handleSubmit();
                        }}
                        color="primary"
                        size="md"
                        type="button"
                      >
                        Lưu lại
                      </LoadingButtonCustom>
                    </Row>
                  </>
                );
              }}
            </Formik>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default FormNplGroup;
