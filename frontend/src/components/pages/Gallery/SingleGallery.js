import { useEffect, useState } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Placeholder } from "react-bootstrap";

import { gallerySingleAlbum } from "../../../actions/galleryActions";
import Gallery from "react-grid-gallery";
import CardLoader from "../../contents/CardLoader";
import Message from "../../contents/Message";

const AlbumSection = styled.div`
  padding: 20px 40px;
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

const Title = styled.h2`
  margin: 28px;
  font-size: 60px;
  text-align: center;
  color: ${(props) => (props.darkmode ? "#fff" : "#111")};
`;

const ImagesContainer = styled.div`
  padding: 10px 20px;
  min-height: 100vh;
  overflow: hidden;
`;

const SingleAlbum = ({ match }) => {
  const [imageCollection, setImageCollection] = useState([]);

  const dispatch = useDispatch();

  const singleGalleryAlbum = useSelector((state) => state.singleGalleryAlbum);
  const { loading, images: albumImages, error } = singleGalleryAlbum;

  const albumId = match.params.id;

  useEffect(() => {
    dispatch(gallerySingleAlbum(albumId));
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
      <LinkContainer to="/gallery/albums">
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
          <Title>{albumImages && albumImages.name}</Title>
          <ImagesContainer>
            <Gallery
              images={imageCollection}
              margin={5}
              backdropClosesModal={true}
            />
          </ImagesContainer>
        </>
      )}
    </AlbumSection>
  );
};

export default SingleAlbum;
