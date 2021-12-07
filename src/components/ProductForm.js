import {Form, Input, Modal, Select, Upload} from "antd";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getCategories} from "../redux/apiCalls";
import TextArea from "antd/lib/input/TextArea";
import {PlusOutlined} from '@ant-design/icons';
import {addError} from "../redux/alertRedux";

const productModel = {
    id: null,
    parentId: null,
    name: "",
    imageUrl: "",
    enabled: false,
};

const {Option} = Select;

const ProductForm = ({visible, onCreate, onCancel, initialValue = productModel}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        dispatch(getCategories()).then((r) => {
            setCategories(r.data);
        });
    }, []);

    useEffect(() => {
        form.resetFields();
    }, [initialValue]);

    const onSelfCancel = () => {
        form.resetFields();
        if (onCancel) {
            onCancel();
        }
    }

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const onBeforeUpload = (file) => {
        const lt1M = file.size / 1024 / 1024 < 1;
        if (!lt1M) {
            dispatch(addError({message: "Image must less than 1MB", timestamp: new Date().getTime()}));
        }
        return lt1M ? false : Upload.LIST_IGNORE;
    }

    return (
        <Modal
            destroyOnClose={true}
            visible={visible}
            title={initialValue.id ? "Update Product" : "Add Product"}
            okText={initialValue.id ? "Update" : "Add"}
            cancelText="Cancel"
            onCancel={onSelfCancel}
            width={600}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    });
            }}
        >
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 18}}
                form={form}
                layout="horizontal"
                name="form_in_modal"
            >
                <Form.Item name={"id"} noStyle initialValue={initialValue.id}>
                    <Input type="hidden"/>
                </Form.Item>
                <Form.Item
                    name="name"
                    shouldUpdate={true}
                    initialValue={initialValue.name}
                    label="Name"
                    rules={[{required: true, message: 'Please input name'}]}
                >
                    <Input placeholder={"Name"}/>
                </Form.Item>
                <Form.Item hasFeedback
                           label="Category"
                           name={"category"}
                           required
                           rules={[{required: true, message: 'Please select category!'}]}>
                    <Select placeholder={"Category"}>
                        {categories.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="description"
                    shouldUpdate={true}
                    label="Description"
                >
                    <TextArea placeholder={"description"}/>
                </Form.Item>
                <Form.Item rules={[{required: true, message: 'Please select a thumbnail!'}]}
                           shouldUpdate={true}
                           label="Thumbnail"
                           name={"thumbnail"}>
                    <Upload
                        beforeUpload={onBeforeUpload}
                        accept={".png,.jpeg,.jpg"}
                        onPreview={onPreview}
                        maxCount={1}
                        listType="picture-card"
                    >
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item shouldUpdate={true} label="Galleries" name={"galleries"}>
                    <Upload
                        beforeUpload={onBeforeUpload}
                        accept={".png,.jpeg,.jpg"}
                        onPreview={onPreview}
                        maxCount={6}
                        listType="picture-card"
                    >
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ProductForm;