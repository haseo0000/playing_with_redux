import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Select, Form, Input, InputRef, Row, Col } from "antd";
import type { UserDetailsStateT } from "../../types";

import { useSelector } from "react-redux";
import { updateUserDetails } from "../../redux/userDetailsSlice";
import { RootState, useAppDispatch } from "../../redux/store";

type FieldType = {
  prefix: string;
  firstname: string;
  lastname: string;
  ID_firstPrefix: string;
  ID_twoToFivePrefix: string;
  ID_sixToTenPrefix: string;
  ID_elevenToTwelvePrefix: string;
  ID_lastPrefix: string;
};

type Props = {
  handleInsertData?: (data: UserDetailsStateT) => void;
  userDetailsById?: UserDetailsStateT;
};

const FormComponent = ({ handleInsertData, userDetailsById }: Props) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.userDetails);

  const id_secondRef = useRef<InputRef>(null);
  const id_thirdRef = useRef<InputRef>(null);
  const id_forthRef = useRef<InputRef>(null);
  const id_fifthRef = useRef<InputRef>(null);

  const onFinish = (values: FieldType) => {
    const {
      ID_firstPrefix,
      ID_twoToFivePrefix,
      ID_sixToTenPrefix,
      ID_elevenToTwelvePrefix,
      ID_lastPrefix,
      ...rest
    } = values;

    const id_citizen =
      ID_firstPrefix +
      ID_twoToFivePrefix +
      ID_sixToTenPrefix +
      ID_elevenToTwelvePrefix +
      ID_lastPrefix;

    const userDetail = {
      ...rest,
      id_citizen,
      key: (data.length + 1).toString(),
    };
    form.resetFields();

    if (userDetailsById) {
      dispatch(updateUserDetails({ details: userDetail, key: userDetailsById.key }));
      return navigate("/");
    }

    if (handleInsertData) {
      handleInsertData(userDetail);
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeFocusId = (value: string, index: number) => {
    switch (index) {
      case 1:
        if (value.length === 1) {
          id_secondRef.current?.focus();
        }
        break;
      case 2:
        if (value.length === 4) {
          id_thirdRef.current?.focus();
        }
        break;
      case 3:
        if (value.length === 5) {
          id_forthRef.current?.focus();
        }
        break;
      case 4:
        if (value.length === 2) {
          id_fifthRef.current?.focus();
        }
        break;
    }
  };

  const initValue_Id_Citizen = (section: string) => {
    switch (section) {
      case "1":
        return userDetailsById?.id_citizen.slice(0, 1) || null;
      case "2":
        return userDetailsById?.id_citizen.slice(1, 5) || null;

      case "3":
        return userDetailsById?.id_citizen.slice(5, 10) || null;

      case "4":
        return userDetailsById?.id_citizen.slice(10, 12) || null;

      case "5":
        return userDetailsById?.id_citizen.slice(12, 13) || null;
    }
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ border: "1px solid white", padding: "1rem" }}
        className="custom_form">
        <Row gutter={{ md: 10 }}>
          <Col xs={{ span: 24 }} md={{ span: 7 }} lg={{ span: 6 }}>
            <Form.Item
              label="Prefix"
              name="prefix"
              initialValue={userDetailsById?.prefix || null}
              rules={[{ required: true, message: "Please input your Prefix!" }]}>
              <Select
                options={[
                  { value: "mr", label: "MR." },
                  { value: "mrs", label: "MRS." },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={0} md={15} lg={0}></Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 9 }}>
            <Form.Item
              label="FirstName"
              name="firstname"
              initialValue={userDetailsById?.firstname || null}
              rules={[{ required: true, message: "Please input your firstname!" }]}>
              <Input placeholder="Enter Firstname" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 9 }}>
            <Form.Item
              label="LastName"
              name="lastname"
              initialValue={userDetailsById?.lastname || null}
              rules={[{ required: true, message: "Please input your lastname!" }]}>
              <Input placeholder="Enter Lastname" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col xs={12} md={6}>
            <Form.Item<FieldType>
              label="ID Citizen"
              name="ID_firstPrefix"
              initialValue={initValue_Id_Citizen("1")}>
              <Input
                maxLength={1}
                onChange={(e) => handleChangeFocusId(e.target.value, 1)}
              />
            </Form.Item>
          </Col>
          <Col xs={12} md={5}>
            <Form.Item<FieldType>
              label="-"
              colon={false}
              name="ID_twoToFivePrefix"
              initialValue={initValue_Id_Citizen("2")}>
              <Input
                maxLength={4}
                ref={id_secondRef}
                onChange={(e) => handleChangeFocusId(e.target.value, 2)}
              />
            </Form.Item>
          </Col>
          <Col xs={12} md={5}>
            <Form.Item<FieldType>
              label="-"
              colon={false}
              name="ID_sixToTenPrefix"
              initialValue={initValue_Id_Citizen("3")}>
              <Input
                maxLength={5}
                ref={id_thirdRef}
                onChange={(e) => handleChangeFocusId(e.target.value, 3)}
              />
            </Form.Item>
          </Col>
          <Col xs={12} md={5}>
            <Form.Item<FieldType>
              label="-"
              colon={false}
              name="ID_elevenToTwelvePrefix"
              initialValue={initValue_Id_Citizen("4")}>
              <Input
                maxLength={2}
                ref={id_forthRef}
                onChange={(e) => handleChangeFocusId(e.target.value, 4)}
              />
            </Form.Item>
          </Col>
          <Col xs={12} md={3}>
            <Form.Item<FieldType>
              label="-"
              colon={false}
              name="ID_lastPrefix"
              initialValue={initValue_Id_Citizen("5")}>
              <Input maxLength={1} ref={id_fifthRef} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item style={{ margin: 0 }}>
              <Button type="primary" htmlType="submit">
                {userDetailsById ? `Update` : `Submit`}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FormComponent;
