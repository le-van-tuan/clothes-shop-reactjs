import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const UserManagement = () => {
    return (
        <Container>
            <span>This is admin user page...</span>
        </Container>
    );
};

export default UserManagement;
