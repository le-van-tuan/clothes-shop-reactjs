import styled from "styled-components";
import {Button, Result} from "antd";
import {useHistory} from "react-router-dom";

const Container = styled.div`
  flex: 1;
  display: flex;
  margin-bottom: 2px;
  margin-top: 0.5px;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const SuccessCheckout = () => {

    const history = useHistory();

    const onClickContinue2Shopping = () => {
        history.replace("/");
    }

    return (
        <Container>
            <Result
                status="success"
                title="Thank you for your purchased!"
                subTitle={
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <span>You order number is: <b>#543543532</b>.</span>
                        <span>You can check your order status at your profile page.</span>
                    </div>
                }
                extra={[
                    <Button onClick={onClickContinue2Shopping} type={"primary"} key="buy">Continue to Shopping</Button>,
                ]}
            />,
        </Container>
    );
};

export default SuccessCheckout;
