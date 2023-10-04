import { Link } from "react-router-dom";

import type { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllUserDetails,
  deleteSingleItem,
} from "../../redux/userDetailsSlice";

import { Table, Space, Button, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { UserDetailsStateT } from "../../types";

import { Key, useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const TableComponent = () => {
  const { data } = useSelector((state: RootState) => state.userDetails);
  console.log(data);
  const dispatch = useDispatch();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const isSelectedAll = data.length > 0 && selectedRowKeys.length === data.length;

  const onChangeSelectAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const allKey = [...data].map((item) => item.key);
      setSelectedRowKeys(allKey);
      return;
    }
    setSelectedRowKeys([]);
  };

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<UserDetailsStateT> = [
    {
      title: "Prefix",
      dataIndex: "prefix",
      key: "prefix",
      render: (_, record) => <>{record.prefix.toUpperCase()}</>,
    },
    {
      title: "FirstName",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "LastName",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "ID Citizen",
      dataIndex: "id_citizen",
      key: "id_citizen",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/edit/${record.key}`}>Edit</Link>
          <a onClick={() => dispatch(deleteSingleItem({ key: record.key }))}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}>
        <Checkbox
          style={{ color: "#fff" }}
          onChange={onChangeSelectAll}
          checked={isSelectedAll}>
          Select All
        </Checkbox>
        <Button
          type="primary"
          onClick={() => dispatch(deleteAllUserDetails())}
          disabled={!isSelectedAll}>
          <span style={{ color: "#fff" }}>Delete All</span>
        </Button>
        <span>
          {selectedRowKeys.length > 0 && `Selected ${selectedRowKeys.length} items`}
        </span>
      </div>
      <Table
        style={{ marginTop: "1rem" }}
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        pagination={{ defaultPageSize: 5, pageSizeOptions: ["5", "10", "15"] }}
      />
    </>
  );
};

export default TableComponent;
