import React, { useState, useEffect } from "react";
import {
  Modal,
  Card,
  CardHeader,
  CardBody,
  Form,
  Col,
  Table,
  Button,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import SwitchCustom from "views/pages/components/SwitchCustom";
import { toObjectName } from "./utils";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { roleActions } from "Redux/Actions";

const fakeData = [
  {
    code: "genus",
    name: "Quản lý danh mục/Quản lý chi",
    id: "60cb0b5d3485e639b11a3529",
  },
  {
    code: "species",
    name: "Quản lý danh mục/Quản lý loài",
    id: "60cb0b723485e639b11a352a",
  },
  {
    code: "origin",
    name: "Quản lý danh mục/Quản lý xuất xứ",
    id: "60cb0b813485e639b11a352b",
  },
  {
    code: "storage_location",
    name: "Quản lý danh mục/Quản lý kho lưu trữ",
    id: "60cb0b973485e639b11a352c",
  },
  {
    code: "seedling_location",
    name: "Quản lý danh mục/Quản lý địa điểm ươm tạo",
    id: "60cb0bdc3485e639b11a352d",
  },
  {
    code: "role",
    name: "Quản trị cơ sở/Quản lý phân quyền",
    id: "60cb0c183485e639b11a352e",
  },
  {
    code: "user",
    name: "Quản trị cơ sở/Quản lý tài khoản",
    id: "60cb0c2a3485e639b11a352f",
  },
  {
    code: "seedling",
    name: "Quản lý danh sách cây/Quản lý giống cây",
    id: "60cb0c563485e639b11a3530",
  },
  {
    code: "treetest",
    name: "Tiện ích/Quản lý chọn tạo giống",
    id: "61284f1ca539bf3b45b5bf62",
  },
];
const FormRole = ({ formModal, setFormModal, isModalAdd }) => {
  const dispatch = useDispatch();
  const { rolePermission } = useSelector((state) => state.roleReducer);

  const [permissions, setPermissions] = useState({});
  let arrCodeFilter = [];

  const [values, setValues] = useState({
    name: "admin",
    permissions: [
      "get_genus",
      "get_species",
      "get_origin",
      "get_storage_location",
      "get_seedling_location",
      "manage_genus",
      "manage_species",
      "manage_origin",
      "manage_storage_location",
      "manage_seedling_location",
      "delete_genus",
      "delete_species",
      "delete_origin",
      "delete_storage_location",
      "delete_seedling_location",
      "get_role",
      "get_user",
      "manage_role",
      "manage_user",
      "delete_role",
      "delete_user",
      "get_seedling",
      "delete_seedling",
      "manage_seedling",
      "get_report",
      "get_treetest",
      "manage_treetest",
      "delete_treetest",
    ],
  });

  useEffect(() => {
    setPermissions(toObjectName(fakeData));
  }, [fakeData]);

  useEffect(() => {
    dispatch(roleActions.getRolePermission());
  }, [formModal]);

  const renderCode = (arr) => {
    let arrCode = [];
    if (Array.isArray(arr)) {
      arr.map((index) => {
        if (typeof index !== "object") {
          const arrMiddle = arrCode;
          arrMiddle.push(index.split("/")[1]);
          arrCode = arrMiddle;
        } else {
          Object.keys(index).map((index1) => {
            const arrMiddle = arrCode.concat(renderCode(index[index1]));
            arrCode = arrMiddle;
          });
        }
      });
    } else {
      arrCode.push(arr.code);
    }
    return arrCode;
  };

  const onChangeRoleName = (e) => {};
  const renderTableName = (name, arr, key, key1, colorRow, space) => {
    const keyTable = !!key1 ? key + "." + key1 : key;
    let arrCode = [];
    let checkCodeView = [];
    let checkCodeEdit = [];
    let checkCodeDelete = [];
    let Space = !!space ? space + "__" : "";
    arrCode = renderCode(arr);
    arrCode.map((index) => {
      if (
        !!values.permissions &&
        values.permissions.indexOf("get_" + index) !== -1
      ) {
        checkCodeView.push("get_" + index);
      }
      if (
        !!values.permissions &&
        values.permissions.indexOf("manage_" + index) !== -1
      ) {
        checkCodeEdit.push("manage_" + index);
      }
      if (
        !!values.permissions &&
        values.permissions.indexOf("delete_" + index) !== -1
      ) {
        checkCodeDelete.push("delete_" + index);
      }
      if (arrCodeFilter.indexOf("get_" + index) === -1) {
        arrCodeFilter.push("get_" + index);
      }
      if (arrCodeFilter.indexOf("manage_" + index) === -1) {
        arrCodeFilter.push("manage_" + index);
      }
      if (arrCodeFilter.indexOf("delete_" + index) === -1) {
        arrCodeFilter.push("delete_" + index);
      }
    });
    return !_.isEmpty(arr) && Array.isArray(arr) ? (
      <>
        <tr style={{ backgroundColor: colorRow }} key={key}>
          <td>
            <a style={{ color: "transparent" }}>{Space}</a>
            {keyTable}
          </td>
          <td className="table-user">
            <b>{name}</b>
          </td>
          <td>
            <SwitchCustom
              className="custom-toggle custom-toggle-success mr-1"
              value="get"
              defaultChecked={false}
              labelOff="Tắt"
              labelOn="Bật"
              checked={arrCode.length === checkCodeView.length}
              onChange={() => {
                const permissionMiddle = values.permissions;
                if (arrCode.length === checkCodeView.length) {
                  checkCodeView.map((index) => {
                    permissionMiddle.splice(permissionMiddle.indexOf(index), 1);
                    if (
                      permissionMiddle.indexOf(
                        "manage_" + index.split("get_")[1]
                      ) !== -1
                    ) {
                      permissionMiddle.splice(
                        permissionMiddle.indexOf(
                          "manage_" + index.split("get_")[1]
                        ),
                        1
                      );
                    }
                    if (
                      permissionMiddle.indexOf(
                        "delete_" + index.split("get_")[1]
                      ) !== -1
                    ) {
                      permissionMiddle.splice(
                        permissionMiddle.indexOf(
                          "delete_" + index.split("get_")[1]
                        ),
                        1
                      );
                    }
                  });
                } else {
                  arrCode.map((index) => {
                    if (permissionMiddle.indexOf("get_" + index) === -1) {
                      permissionMiddle.push("get_" + index);
                    }
                  });
                }
                // setFieldValue('permissions', permissionMiddle);
                setValues({
                  ...values,
                  permissions: permissionMiddle,
                });
              }}
            />
          </td>
          <td>
            <SwitchCustom
              className="custom-toggle custom-toggle-success mr-1"
              value="update"
              defaultChecked={false}
              labelOff="Tắt"
              labelOn="Bật"
              checked={arrCode.length === checkCodeEdit.length}
              onChange={() => {
                const permissionMiddle = values.permissions;
                if (arrCode.length === checkCodeEdit.length) {
                  checkCodeEdit.map((index) => {
                    permissionMiddle.splice(permissionMiddle.indexOf(index), 1);
                  });
                } else {
                  arrCode.map((index) => {
                    if (permissionMiddle.indexOf("manage_" + index) === -1) {
                      permissionMiddle.push("manage_" + index);
                    }
                    if (permissionMiddle.indexOf("get_" + index) === -1) {
                      permissionMiddle.push("get_" + index);
                    }
                  });
                }
                // setFieldValue('permissions', permissionMiddle);
                setValues({
                  ...values,
                  permissions: permissionMiddle,
                });
              }}
            />
          </td>
          <td>
            <SwitchCustom
              className="custom-toggle custom-toggle-success mr-1"
              value="delete"
              defaultChecked={false}
              labelOff="Tắt"
              labelOn="Bật"
              checked={arrCode.length === checkCodeDelete.length}
              onChange={() => {
                const permissionMiddle = values.permissions;
                if (arrCode.length === checkCodeDelete.length) {
                  checkCodeDelete.map((index) => {
                    permissionMiddle.splice(permissionMiddle.indexOf(index), 1);
                  });
                } else {
                  arrCode.map((index) => {
                    if (permissionMiddle.indexOf("delete_" + index) === -1) {
                      permissionMiddle.push("delete_" + index);
                    }
                    if (permissionMiddle.indexOf("get_" + index) === -1) {
                      permissionMiddle.push("get_" + index);
                    }
                  });
                }
                // setFieldValue('permissions', permissionMiddle);
                setValues({
                  ...values,
                  permissions: permissionMiddle,
                });
              }}
            />
          </td>
        </tr>
        {arr.map((index, key1) => {
          if (typeof index !== "object") {
            return (
              <tr style={{ backgroundColor: colorRow }} key={key1}>
                <td>
                  <a style={{ color: "transparent" }}>{Space + "__"}</a>
                  {keyTable + "." + (key1 + 1)}
                </td>
                <td className="table-user">
                  <b>{index.split("/")[0]}</b>
                </td>
                <td>
                  <SwitchCustom
                    className="custom-toggle custom-toggle-success mr-1"
                    value={"get_" + index.split("/")[1]}
                    checked={
                      !!values.permissions &&
                      values.permissions.indexOf(
                        "get_" + index.split("/")[1]
                      ) !== -1
                    }
                    defaultChecked={false}
                    labelOff="Tắt"
                    labelOn="Bật"
                    onChange={(e) => {
                      const selectedIndex = values.permissions.indexOf(
                        e.target.value
                      );
                      let newselectedRole = values.permissions;

                      if (selectedIndex === -1) {
                        newselectedRole.push(e.target.value);
                      } else {
                        newselectedRole.splice(selectedIndex, 1);
                        if (
                          newselectedRole.indexOf(
                            "manage_" + e.target.value.split("get_")[1]
                          ) !== -1
                        ) {
                          newselectedRole.splice(
                            newselectedRole.indexOf(
                              "manage_" + e.target.value.split("get_")[1]
                            ),
                            1
                          );
                        }
                        if (
                          newselectedRole.indexOf(
                            "delete_" + e.target.value.split("get_")[1]
                          ) !== -1
                        ) {
                          newselectedRole.splice(
                            newselectedRole.indexOf(
                              "delete_" + e.target.value.split("get_")[1]
                            ),
                            1
                          );
                        }
                      }
                      // setFieldValue('permissions', newselectedRole);
                      setValues({
                        ...values,
                        permissions: newselectedRole,
                      });
                    }}
                  />
                </td>
                <td>
                  <SwitchCustom
                    className="custom-toggle custom-toggle-success mr-1"
                    value={"manage_" + index.split("/")[1]}
                    checked={
                      !!values.permissions &&
                      values.permissions.indexOf(
                        "manage_" + index.split("/")[1]
                      ) !== -1
                    }
                    defaultChecked={false}
                    labelOff="Tắt"
                    labelOn="Bật"
                    onChange={(e) => {
                      const selectedIndex = values.permissions.indexOf(
                        e.target.value
                      );
                      let newselectedRole = values.permissions;

                      if (selectedIndex === -1) {
                        newselectedRole.push(e.target.value);
                        if (
                          newselectedRole.indexOf(
                            "get_" + e.target.value.split("manage_")[1]
                          ) === -1
                        ) {
                          newselectedRole.push(
                            "get_" + e.target.value.split("manage_")[1]
                          );
                        }
                      } else {
                        newselectedRole.splice(selectedIndex, 1);
                      }

                      // setFieldValue('permissions', newselectedRole);
                      setValues({
                        ...values,
                        permissions: newselectedRole,
                      });
                    }}
                  />
                </td>
                <td>
                  <SwitchCustom
                    className="custom-toggle custom-toggle-success mr-1"
                    defaultChecked={false}
                    value={"delete_" + index.split("/")[1]}
                    checked={
                      !!values.permissions &&
                      values.permissions.indexOf(
                        "delete_" + index.split("/")[1]
                      ) !== -1
                    }
                    onChange={(e) => {
                      const selectedIndex = values.permissions.indexOf(
                        e.target.value
                      );
                      let newselectedRole = values.permissions;

                      if (selectedIndex === -1) {
                        newselectedRole.push(e.target.value);
                        if (
                          newselectedRole.indexOf(
                            "get_" + e.target.value.split("delete_")[1]
                          ) === -1
                        ) {
                          newselectedRole.push(
                            "get_" + e.target.value.split("delete_")[1]
                          );
                        }
                      } else {
                        newselectedRole.splice(selectedIndex, 1);
                      }
                      // setFieldValue('permissions', newselectedRole);
                      setValues({
                        ...values,
                        permissions: newselectedRole,
                      });
                    }}
                    labelOff="Tắt"
                    labelOn="Bật"
                  />
                </td>
              </tr>
            );
          } else {
            return Object.keys(index).map((index1, key) => {
              return renderTableName(
                index1,
                index[index1],
                keyTable,
                key1 + 1,
                colorRow,
                Space + "__"
              );
            });
          }
        })}
      </>
    ) : (
      <>
        <tr style={{ backgroundColor: colorRow }} key={key}>
          <td>
            <a style={{ color: "transparent" }}>{Space}</a>
            {keyTable}
          </td>
          <td className="table-user">
            <b>{name}</b>
          </td>
          <td>
            <SwitchCustom
              className="custom-toggle custom-toggle-success mr-1"
              defaultChecked={false}
              labelOff="Tắt"
              labelOn="Bật"
              value={"get_" + arr.code}
              checked={
                !!values.permissions &&
                values.permissions.indexOf("get_" + arr.code) !== -1
              }
              onChange={(e) => {
                const selectedIndex = values.permissions.indexOf(
                  e.target.value
                );
                let newselectedRole = values.permissions;
                if (selectedIndex === -1) {
                  newselectedRole.push(e.target.value);
                } else {
                  newselectedRole.splice(selectedIndex, 1);
                  if (
                    newselectedRole.indexOf(
                      "manage_" + e.target.value.split("get_")[1]
                    ) !== -1
                  ) {
                    newselectedRole.splice(
                      newselectedRole.indexOf(
                        "manage_" + e.target.value.split("get_")[1]
                      ),
                      1
                    );
                  }
                  if (
                    newselectedRole.indexOf(
                      "delete_" + e.target.value.split("get_")[1]
                    ) !== -1
                  ) {
                    newselectedRole.splice(
                      newselectedRole.indexOf(
                        "delete_" + e.target.value.split("get_")[1]
                      ),
                      1
                    );
                  }
                }
                // setFieldValue('permissions', newselectedRole);
                setValues({
                  ...values,
                  permissions: newselectedRole,
                });
              }}
            />
          </td>
          <td>
            <SwitchCustom
              className="custom-toggle custom-toggle-success mr-1"
              defaultChecked={false}
              labelOff="Tắt"
              labelOn="Bật"
              value={"manage_" + arr.code}
              checked={
                !!values.permissions &&
                values.permissions.indexOf("manage_" + arr.code) !== -1
              }
              onChange={(e) => {
                const selectedIndex = values.permissions.indexOf(
                  e.target.value
                );
                let newselectedRole = values.permissions;

                if (selectedIndex === -1) {
                  newselectedRole.push(e.target.value);
                  if (
                    newselectedRole.indexOf(
                      "get_" + e.target.value.split("manage_")[1]
                    ) === -1
                  ) {
                    newselectedRole.push(
                      "get_" + e.target.value.split("manage_")[1]
                    );
                  }
                } else {
                  newselectedRole.splice(selectedIndex, 1);
                }

                // setFieldValue('permissions', newselectedRole);
                setValues({
                  ...values,
                  permissions: newselectedRole,
                });
              }}
            />
          </td>
          <td>
            <SwitchCustom
              className="custom-toggle custom-toggle-success mr-1"
              defaultChecked={false}
              labelOff="Tắt"
              labelOn="Bật"
              value={"delete_" + arr.code}
              checked={
                !!values.permissions &&
                values.permissions.indexOf("delete_" + arr.code) !== -1
              }
              onChange={(e) => {
                const selectedIndex = values.permissions.indexOf(
                  e.target.value
                );
                let newselectedRole = values.permissions;

                if (selectedIndex === -1) {
                  newselectedRole.push(e.target.value);
                  if (
                    newselectedRole.indexOf(
                      "get_" + e.target.value.split("delete_")[1]
                    ) === -1
                  ) {
                    newselectedRole.push(
                      "get_" + e.target.value.split("delete_")[1]
                    );
                  }
                } else {
                  newselectedRole.splice(selectedIndex, 1);
                }
                // setFieldValue('permissions', newselectedRole);
                setValues({
                  ...values,
                  permissions: newselectedRole,
                });
              }}
            />
          </td>
        </tr>
      </>
    );
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        style={{ maxWidth: "1248px", width: "100%" }}
        isOpen={formModal}
        toggle={() => setFormModal(false)}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary border-0 mb-0">
            <CardHeader className="bg-transparent pb-2">
              <h2 className="mb-0">
                {isModalAdd ? "Thêm phân quyền" : "Cập nhật phân quyền"}
              </h2>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-3">
              <Form className="needs-validation" noValidate>
                <div className="form-row">
                  <Col className="mb-3" md="4">
                    <InputCustom
                      label="Tên quyền *"
                      defaultValue=""
                      placeholder="Vui lòng nhập tên phân quyền"
                      type="text"
                      id="role-name"
                      valid={true}
                      invalid={false}
                      onChange={() => onChangeRoleName()}
                      messageValid={""}
                      messageInvalid={""}
                    />
                  </Col>
                </div>
                <div>
                  <h4 className="mb-0">Thiết lập phân quyền *</h4>
                  <h6>
                    <i>(Vui lòng bật chức năng cho phép)</i>
                  </h6>
                </div>
                <div>
                  <Table
                    className="align-items-center table-flush"
                    hover
                    responsive
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>STT</th>
                        <th>Chức năng quản lý</th>
                        <th>Xem</th>
                        <th>Quản lý</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(permissions).map((item, index) => {
                        const colorRow =
                          index % 2 !== 0
                            ? "rgba(255, 255, 255, 1)"
                            : "rgba(220, 225, 227, .6)";
                        return renderTableName(
                          item,
                          permissions[item],
                          index + 1,
                          "",
                          colorRow,
                          ""
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Form>
            </CardBody>
            <div className="px-lg-5 py-lg-3 d-flex justify-content-end">
              <Button
                onClick={() => {
                  setFormModal(false);
                }}
                color=""
                size="md"
                type="button"
              >
                Hủy
              </Button>
              <Button
                onClick={() => {
                  setFormModal(false);
                }}
                color="primary"
                size="md"
                type="button"
              >
                {isModalAdd ? "Thêm mới" : "Lưu lại"}
              </Button>
            </div>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default FormRole;
