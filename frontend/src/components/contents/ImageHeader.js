import styled from "styled-components";

import { NavLink } from "react-router-dom";

const StyledLink = styled(NavLink)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  color: #fff;
  &:hover {
    color: rgb(0, 148, 68);
  }
`;

const Section1 = styled.div`
  background-image: url(${(props) => props.img});
  background-color: rgba(255, 255, 255, 0.1);
  background-blend-mode: lighten;
  background-attachment: fixed;
  display: grid;
  justify-content: center;
  padding: 70px;
  margin-bottom: 18px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0px -200px;
`;

const Title = styled.div`
  text-align: center;
  /* background-color: #1b1b36; */
  padding: 18px 28px;
  h3 {
    color: #fff;
    text-transform: uppercase;
  }
  h5 {
    color: #fff;
  }
`;

const ImageHeader = ({ mtitle, title, image }) => {
  return (
    <Section1 img={image}>
      <Title className="bg-custom">
        <h3>{mtitle}</h3>
        <h5>
          <StyledLink exact to="/">
            {/* eslint-disable-next-line */}
            <a>Home</a>
            {" / "}
          </StyledLink>
          {title}
        </h5>
      </Title>
    </Section1>
  );
};

export default ImageHeader;
