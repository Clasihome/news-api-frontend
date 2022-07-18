import React, { useState } from 'react';
import './App.css';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Spin
} from 'antd';

const apiUrl = process.env.REACT_APP_API_BASE_URL;
const { TextArea } = Input;

const INITIAL_VALUES = {
  title: "",
  description: "",
}


function App() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async(values) => {
    try{
      setLoading(true);
      const url = apiUrl + "/news/create"
      const options = {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        method: "POST",
      }
      const data = await fetch(url, options);
      const result = await data.json();
      message.success("Novedad agregada exitosamente!");
      form.resetFields();
    }
    catch(e){
      console.log(e)
      message.error(e.message);
    }    
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="main-wrapper">
      <div className="form-wrapper">
        <Form
          layout="vertical"
          initialValues={INITIAL_VALUES}
          form={form}
          onFinish={onFinish}
        >
          <header>
            {loading ? <Spin style={{ marginLeft: 16 }} size="small" /> : null}
          </header>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                label="Titulo"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Este campo no puede quedar vacio"
                  }
                ]}
              >
                <Input disabled={loading} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label="Descripción"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Este campo no puede quedar vacio"
                  }
                ]}              
              >
                <TextArea rows={6} disabled={loading} />
              </Form.Item>
            </Col>            
          </Row>
          <footer>
            <Button
              //type='primary'
              htmlType='button'
              onClick={()=> form.resetFields()}
            >
              Reset
            </Button>                    
            <Button
              type='primary'
              htmlType='submit'
              disabled={loading}
            >
              Enviar
            </Button>              
          </footer>          
        </Form>
      </div>
    </div>
  );
}

export default App;
