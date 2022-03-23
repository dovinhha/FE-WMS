import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
  Container,
} from "reactstrap";
import Dropzone from "dropzone";

Dropzone.autoDiscover = false;

const UploadFileCustom = ({ handleGetImage }) => {
  useEffect(() => {
    let currentSingleFile = undefined;
    new Dropzone(document.getElementById("dropzone-single"), {
      url: "/",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer:
        document.getElementsByClassName("dz-preview-single")[0],
      previewTemplate:
        document.getElementsByClassName("dz-preview-single")[0].innerHTML,
      maxFiles: 1,
      acceptedFiles: "image/*",
      init: function () {
        this.on("addedfile", function (file) {
          if (currentSingleFile) {
            this.removeFile(currentSingleFile);
          }
          currentSingleFile = file;
          handleGetImage(file);
        });
      },
    });
    document.getElementsByClassName("dz-preview-single")[0].innerHTML = "";
  }, []);

  return (
    <>
      <div className="dropzone dropzone-single mb-3" id="dropzone-single">
        <div className="fallback">
          <div className="custom-file">
            <input
              className="custom-file-input"
              id="projectCoverUploads"
              type="file"
            />
            <label className="custom-file-label" htmlFor="projectCoverUploads">
              Choose file
            </label>
          </div>
        </div>
        <div className="dz-preview dz-preview-single">
          <div className="dz-preview-cover">
            <img alt="..." className="dz-preview-img" data-dz-thumbnail="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadFileCustom;
