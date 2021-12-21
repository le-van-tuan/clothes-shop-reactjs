import styled from "styled-components";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {cancelOrder, getMyOrders} from "../redux/apiCalls";
import {Button, Popconfirm, Table, Tooltip, Typography} from "antd";
import CancelIcon from '@mui/icons-material/Cancel';

const {Text} = Typography;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Ordered = () => {
    const dispatch = useDispatch();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        refreshOrder();
    }, []);

    const refreshOrder = () => {
        dispatch(getMyOrders()).then((res) => {
            if (res.data) {
                setOrders(res.data);
            }
        });
    }

    const onCancelOrder = (id) => {
        dispatch(cancelOrder(id)).then(() => {
            refreshOrder();
        });
    }

    const columns = [
        {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            width: 130
        },
        {
            title: 'Order Time',
            width: 180,
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Product',
            dataIndex: 'createdAt',
            key: 'products',
            render: (value, record) => {
                let productNames = record['orderItems'].map(item => item.variant['variantName']).join(", ");
                return (
                    <Text>{productNames}</Text>
                )
            }
        },
        {
            title: 'Total',
            dataIndex: 'total',
            align: "right",
            width: 100,
            key: 'total',
            render: (value, record) => {
                return (
                    <Text style={{color: "#ee4d2d"}} strong>${value}</Text>
                )
            }
        },
        {
            title: 'Order Status',
            width: 120,
            align: "right",
            dataIndex: 'orderStatus',
            key: 'orderStatus',
        },
        {
            title: 'Action',
            width: 150,
            dataIndex: "orderStatus",
            key: 'action',
            render: (value, record) => (
                <Popconfirm
                    title="Are you sure to cancel this order?"
                    okText="Yes"
                    onConfirm={() => onCancelOrder(record.id)}
                    disabled={value === "Shipped" || value === "Cancelled" || value === "Declined"}
                    cancelText="No"
                    key={record.id}
                >
                    <Tooltip key={record.id} title={"Cancel Order"}>
                        <Button disabled={value === "Shipped" || value === "Cancelled" || value === "Declined"} danger
                                type="text" shape={"default"}
                                icon={<CancelIcon fontSize={"small"}/>}/>
                    </Tooltip>
                </Popconfirm>
            ),
        }
    ]

    return (
        <Container>
            <Table pagination={false} style={{flex: 1}} dataSource={orders} columns={columns}/>
        </Container>
    );
};

export default Ordered;
