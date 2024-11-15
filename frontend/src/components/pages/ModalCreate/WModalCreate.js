import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../contents/Loader";
import Message from "../../contents/Message";
import ModalImageViewer from "../../contents/ModalImageViewer";
import { deleteWModal } from "../../../actions/modalActions";
import { createWModal, listWModal } from "../../../actions/modalActions";
import { BASE_URL } from "../../../api";

const ModalContainer = styled.div`
  padding: 10px 20px;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 30px 0;
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
`;

const ModalSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  span {
    margin-top: 20px;
    cursor: pointer;
  }
`;

const EmptyModal = styled.div`
  font-size: 28px;
  margin-top: 100px;
`;

const AdminWModal = () => {
  const [modalImage, setModalImage] = useState("");
  const [modalThumbnail, setModalThumbnail] = useState("");

  const [uploading, setUploading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [toastAddShow, setToastAddShow] = useState(false);
  const [toastDeleteShow, setToastDeleteShow] = useState(false);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const addedWModal = useSelector((state) => state.addedWModal);
  const { loading, wModal: modal, error: addedError } = addedWModal;

  const wModalCreate = useSelector((state) => state.wModalCreate);
  const { success, error } = wModalCreate;

  const wModalDelete = useSelector((state) => state.wModalDelete);
  const { success: deleteSuccess, error: deleteError } = wModalDelete;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("formFile", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/upload-blur`,
        formData,
        config
      );

      setModalImage(data?.originalImageURL);
      setModalThumbnail(data?.blurredImageURL);

      console.log("data", data);
      setUploading(false);
      setFileUploadError(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      setFileUploadError(true);
    }
  };

  const dispatch = useDispatch();

  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  useEffect(() => {
    dispatch(listWModal());
    if (success && toastAddShow) {
      dispatch(listWModal());
      toast.success("Modal Added Successfully");
      setToastAddShow(false);
    }
    if (deleteSuccess && toastDeleteShow) {
      dispatch(listWModal());
      toast.success("Modal Deleted Successfully");
      setToastDeleteShow(false);
    }
  }, [success, deleteSuccess, toastAddShow, toastDeleteShow]);

  const submitHandler = (event) => {
    event.preventDefault();
    const file = event.target;
    console.log(file);
    dispatch(createWModal(modalImage, modalThumbnail));
    setToastAddShow(true);
    reset();
  };

  const modalDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteWModal(id));
      setToastDeleteShow(true);
    }
  };

  return (
    <ModalContainer className="container">
      <Form className="container p-4 form-group" onSubmit={submitHandler}>
        <Title darkmode={darkMode}>Add New Modal</Title>

        {error && <Message variant="danger">{error}</Message>}
        {addedError && <Message variant="danger">{addedError}</Message>}
        {deleteError && <Message variant="danger">{deleteError}</Message>}
        {fileUploadError && (
          <Message variant="danger">Only image can be uploaded</Message>
        )}
        {loading ? (
          <Loader />
        ) : (
          <>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Select Image</Form.Label>
              <Form.Control
                type="file"
                ref={ref}
                required
                accept="image/*"
                onChange={uploadFileHandler}
              />
              <Form.Control.Feedback type="invalid">
                Please add valid image
              </Form.Control.Feedback>
              {uploading && <Loader />}
            </Form.Group>
            <Button
              disabled={fileUploadError || uploading}
              variant="primary"
              type="submit"
              className={
                darkMode ? "btn-dark mt-4 btn-lg" : "btn-primary mt-4 btn-lg"
              }
            >
              Add
            </Button>

            <ModalSection>
              {modal && modal.length === 0 ? (
                <EmptyModal>Add modal to view here.</EmptyModal>
              ) : (
                <>
                  <ModalImageViewer url={modal && modal[0]?.image} />
                  <span
                    className="fa-stack fa-2x"
                    onClick={() => modalDeleteHandler(modal[0]._id)}
                  >
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i
                      style={{ color: darkMode ? "#111" : "#fff" }}
                      className="fas fa-trash fa-stack-1x fa-inverse"
                    ></i>
                  </span>
                </>
              )}
            </ModalSection>
          </>
        )}
      </Form>
    </ModalContainer>
  );
};

export default AdminWModal;
