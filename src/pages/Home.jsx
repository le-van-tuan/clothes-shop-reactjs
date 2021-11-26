import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Home = () => {
    return (
        <Container>
            <span>This is home page...</span>
        </Container>
    );
};

export default Home;
