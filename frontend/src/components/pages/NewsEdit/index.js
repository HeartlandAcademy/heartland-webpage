import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button } from "react-bootstrap";

import { listNewsDetails, updateNews } from "../../../actions/newsActions";
import { NEWS_DETAILS_RESET, NEWS_UPDATE_RESET } from "../../../actions/types";
import { BASE_URL } from "../../../api";
import Loader from "../../contents/Loader";
import Message from "../../contents/Message";

const Section = styled.div`
  padding: 30px 40px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 13px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  h2 {
    color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  }
`;

const ButtonContent = styled.div`
  margin: 20px 40px;
`;

const AdminEditNews = ({ history, match }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const newsId = match.params.id;

  const [user] = useState(userInfo._id);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("");
  const [image, setImage] = useState("");
  const [fileError, setFileError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [validated, setValidated] = useState(false);

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const newsDetails = useSelector((state) => state.newsDetails);
  const { loading, singleNews: news, error } = newsDetails;

  const newsUpdate = useSelector((state) => state.newsUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = newsUpdate;

  const dispatch = useDispatch();

  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  function clearForm() {
    setTitle("");
    setDescription("");
    setAuthor("");
    setDescription("");
    setUploading(false);
    setImage("");
    reset();
  }

  useEffect(() => {
    console.log(news);
    console.log(newsId);
    if (!news || news._id !== newsId) {
      dispatch(listNewsDetails(newsId));
    } else {
      setTitle(news.title);
      setAuthor(news.author);
      setDescription(news.description);
      setSection(news.section);
      setImage(news.image);
    }
    if (successUpdate) {
      history.push("/admin/news/all");
      toast.success("News Edited Successfully");
      dispatch({ type: NEWS_DETAILS_RESET });
      dispatch({ type: NEWS_UPDATE_RESET });
      clearForm();
    }
  }, [news, history, successUpdate, newsId, dispatch]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
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
        `${BASE_URL}/api/upload`,
        formData,
        config
      );

      setImage(data);
      setFileError(false);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setFileError(true);
      setUploading(false);
    }
  };

  const updateHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      dispatch(
        updateNews({ newsId, user, title, author, description, section, image })
      );
    }
    setValidated(true);
  };

  return (
    <Section className="container" darkmode={darkMode}>
      <Title darkmode={darkMode}>
        <h2>Edit News</h2>
        <ButtonContent>
          <LinkContainer to={`/admin/news/all`}>
            <Button className={darkMode ? "btn-dark" : "btn-primary"}>
              View All
            </Button>
          </LinkContainer>
        </ButtonContent>
      </Title>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form
        noValidate
        validated={validated}
        className="container p-4 form-group"
        onSubmit={updateHandler}
      >
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide Title
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide Author Name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAuthor">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: "150px" }}
            placeholder="Enter news description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide Description
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSection">
          <Form.Label>Section</Form.Label>
          <Form.Control
            as="select"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          >
            <option>Pre-School</option>
            <option>Primary</option>
            <option>Lower Secondary</option>
            <option>Junior Higher Secondary</option>
            <option>Senior Higher Secondary</option>
          </Form.Control>
          <Form.Control.Feedback type="valid">
            Select to change the section
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Select New Image (If Any)</Form.Label>
          <Form.Control
            type="file"
            onChange={uploadFileHandler}
            ref={ref}
            accept="image/*"
          />
          {fileError && (
            <Form.Text id="passwordHelpBlock" muted>
              <span className="text-danger ">
                <i className="fas fa-exclamation-circle"></i> Only image file
                can be added.
              </span>
            </Form.Text>
          )}
          <Form.Control.Feedback type="invalid">
            Please Select Image File
          </Form.Control.Feedback>
          {uploading && <Loader />}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={fileError || uploading}
          className={
            darkMode ? "btn-dark mt-4 btn-lg" : "btn-danger mt-4 btn-lg"
          }
        >
          Update
        </Button>
      </Form>
    </Section>
  );
};

export default AdminEditNews;
