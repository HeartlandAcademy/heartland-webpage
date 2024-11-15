import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Placeholder } from "react-bootstrap";

import { gallerySingleWAlbum } from "../../../../actions/galleryActions";
import Gallery from "react-grid-gallery";
import styled from "styled-components";
import Message from "../../../contents/Message";
import CardLoader from "../../../contents/CardLoader";

const AlbumSection = styled.div`
  padding: 20px 40px;
  min-height: 100vh;
`;

const Title = styled.h2`
  margin-top: 18px;
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
  text-align: center;
`;

const LoaderHeader = styled.h1`
  text-align: center;
  padding: 2px;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ImagesContainer = styled.div`
  padding: 10px 20px;
`;

const AdminSingleGallery = ({ match }) => {
  const [imageCollection, setImageCollection] = useState([]);

  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings);
  const { darkMode } = settings;

  const singleWGalleryAlbum = useSelector((state) => state.singleWGalleryAlbum);
  const { loading, images: albumImages, error } = singleWGalleryAlbum;

  const albumId = match.params.id;

  useEffect(() => {
    dispatch(gallerySingleWAlbum(albumId));
  }, [dispatch, match, albumId]);

  useEffect(() => {
    if (albumImages && albumImages.images) {
      let data = [];
      albumImages.images.forEach((img, index) => {
        data[index] = {
          src: img,
          thumbnail: img,
          thumbnailWidth: 320,
          thumbnailHeight: 174,
        };
      });
      setImageCollection(data);
    }
  }, [albumImages]);

  return (
    <AlbumSection>
      <LinkContainer to="/admin/albums/all">
        <Button className="btn-dark mt-3">Back</Button>
      </LinkContainer>
      {loading ? (
        <>
          <LoaderHeader>
            <Placeholder as={LoaderHeader} animation="wave">
              <Placeholder xs={4} />
            </Placeholder>
          </LoaderHeader>
          <Cards>
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </Cards>
        </>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Title darkmode={darkMode}>{albumImages && albumImages.name}</Title>
          <ImagesContainer>
            <Gallery
              images={imageCollection}
              margin={10}
              backdropClosesModal={true}
            />
          </ImagesContainer>
        </>
      )}
    </AlbumSection>
  );
};

export default AdminSingleGallery;
