import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ProductManagement = () => {
    return (
        <Container>
            <span>This is admin product page...</span>
        </Container>
    );
};

export default ProductManagement;
