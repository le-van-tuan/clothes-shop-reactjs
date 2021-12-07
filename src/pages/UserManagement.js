import styled from "styled-components";
import {Avatar, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {UserOutlined} from "@ant-design/icons";
import {getUsers} from "../redux/apiCalls";

const Container = styled.div`
  display: flex;
  flex: 1;
`;
const UserManagement = () => {

    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        dispatch(getUsers()).then((r) => {
            setUsers(r.data);
        });
    }, []);

    const userColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 150,
            render: (avatar) => {
                return (
                    <Avatar style={{backgroundColor: '#87d068'}} size={32} icon={<UserOutlined/>}/>
                )
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 300,
            key: 'email',
        },
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
            render: (role) => (
                <Tag color={role === "ROLE_ADMIN" ? 'cyan' : "success"}>
                    {role}
                </Tag>
            )
        },
        {
            title: 'Created Time',
            width: 180,
            dataIndex: 'createdAt',
            key: 'createdAt',
        }
    ];

    return (
        <Container>
            <Table style={{flex: 1}}
                   rowKey={"id"}
                   dataSource={users}
                   columns={userColumns}/>
        </Container>
    );
};

export default UserManagement;
