import styled from "styled-components";
import {Button, Divider, Image, Space, Table, Typography} from "antd";
import {useSelector} from "react-redux";
import {BASE_URL} from "../helpers/axiosInstance";
import {useHistory} from "react-router-dom";

const {Text} = Typography;

const Container = styled.div`
  flex: 1;
  margin-bottom: 2px;
  margin-top: 0.5px;
  flex-direction: column;
  background-color: white;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(https://d-themes.com/react/molla/demo-6/images/page-header-bg.jpg);
  padding: 2em;
  background-color: #ebebeb;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  font-family: Quicksand, sans-serif;
  font-weight: 600;
  letter-spacing: 0.15em;
  font-size: 25px;
`

const Content = styled.div`
  margin: 0 12%;
  display: flex;
  flex: 1;
  flex-direction: column;
`

const SummaryContainer = styled.div`
  display: flex;
  flex: 1;
  margin-top: 40px;
  margin-bottom: 20px;
  justify-content: flex-end;
`

const Summary = styled.div`
  padding: 20px 30px;
  border: .1rem dashed #d7d7d7;
  background-color: #f9f9f9;
  min-width: 500px;
  align-items: flex-end;
`

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  & > .Label {
    width: 100px;
  }

  & > .Value {
    flex: 1;
    text-align: end;
  }

  &:not(:first-child) {
    margin-top: 15px;
  }
`

const Checkout = () => {
    const history = useHistory();
    const {items} = useSelector((state) => state.cart);

    const onClickOnProduct = (id) => {
        history.push("/products/" + id);
    }

    const onClickPlaceOrder = () => {
        history.replace("/checkout-success");
    }

    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'product',
            render: (name, record) => {
                const thumbnail = [].concat(record.images).find(img => img.type === "THUMBNAIL");
                return (
                    <Space size="large">
                        <Image
                            height={45}
                            width={45}
                            style={{cursor: "pointer"}}
                            preview={true}
                            src={BASE_URL + "products/images/" + thumbnail.url}
                        />
                        <h4 onClick={() => onClickOnProduct(record.id)} style={{cursor: "pointer"}}>{record.name}</h4>
                    </Space>
                )
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Unit Price',
            dataIndex: ['selectedVariant', 'price'],
            align: "right",
            key: 'price',
            width: 120,
            render: (value) => <Text strong>${value}</Text>
        },
        {
            title: 'Subtotal',
            dataIndex: 'total',
            align: "right",
            width: 180,
            key: 'total',
            render: (value, record) => {
                const total = (record['selectedVariant']['price'] * (record['quantity'] || 1));
                return (
                    <Text style={{color: "#ee4d2d"}} strong>${total}</Text>
                )
            }
        }
    ];

    return (
        <Container>
            <PageHeader>
                <p>Checkout</p>
            </PageHeader>
            <Content>
                <Table title={() => <h2>Product Ordered</h2>} pagination={false} style={{flex: 1}} dataSource={items}
                       columns={columns}/>
                <SummaryContainer>
                    <Summary>
                        <h4 style={{texAlign: "center"}}>YOUR ORDER</h4>
                        <Divider style={{marginTop: 12, marginBottom: 15}}/>
                        <Detail>
                            <Text className={"Label"}>Subtotal:</Text>
                            <Text
                                className={"Value"}>${items.reduce((sum, item) => sum + item.selectedVariant['price'] * item.quantity, 0)}</Text>
                        </Detail>
                        <Detail>
                            <Text className={"Label"}>Shipping fee:</Text>
                            <Text className={"Value"}>$0</Text>
                        </Detail>
                        <Detail>
                            <Text strong className={"Label"}>Total
                                ({items.length} {items.length > 1 ? "items" : "item"}):</Text>
                            <Text style={{color: "#ee4d2d"}} strong
                                  className={"Value"}>${items.reduce((sum, item) => sum + item.selectedVariant['price'] * item.quantity, 0)}</Text>
                        </Detail>
                        <div style={{justifyContent: "flex-end", display: "flex", marginTop: 30}}>
                            <Button
                                onClick={onClickPlaceOrder}
                                disabled={!items.length}
                                type="primary"
                                danger
                                block
                                size={"large"}
                                htmlType="submit">
                                Place Order
                            </Button>
                        </div>
                    </Summary>
                </SummaryContainer>
            </Content>
        </Container>
    );
};

export default Checkout;
