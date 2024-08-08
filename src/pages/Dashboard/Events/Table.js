import { useAuthContext } from "contexts/AuthContext";
import React, { useState } from "react";
import { Space, Table, Modal, Form, Input } from "antd";
import { firestore } from "config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function AllEvents() {
  const { events, dispatch } = useAuthContext();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [form] = Form.useForm();

  const onUpdateClick = (event) => {
    setSelectedEvent(event);
    setUpdateModalVisible(true);
    form.setFieldsValue(event);
  };

  const onDeleteClick = (event) => {
    console.log(event);
    setSelectedEvent(event);
    setDeleteModalVisible(true);
  };

  const updateData = async (eventId, dataToUpdate) => {
    const eventRef = doc(firestore, "events", eventId);
    await updateDoc(eventRef, dataToUpdate);
    const updatedEvent = { ...selectedEvent, ...dataToUpdate };
    const updatedEvents = events.map((event) =>
      event.id === eventId ? updatedEvent : event
    );
    dispatch({
      type: "SET_ALL_EVENTS",
      payload: updatedEvents,
    });
  };

  const deleteData = async (eventId) => {
    const eventRef = doc(firestore, "events", eventId);
    await deleteDoc(eventRef);
    const filteredEvents = events.filter((item) => item.id !== eventId);
    dispatch({
      type: "SET_ALL_EVENTS",
      payload: filteredEvents,
    });
  };

  const columns = [
    {
      title: "event",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (imgUrl, i) => (
        <img
          src={imgUrl}
          alt="event"
          style={{height:64,width:"auto"}}
          className="object-fit-contain img-all--events"
          key={i}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" key={record.id}>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => onUpdateClick(record)}
          >
            Update
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => onDeleteClick(record)}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onUpdateOk = async () => {
    const values = await form.validateFields();
    updateData(selectedEvent.id, values);
    setUpdateModalVisible(false);
  };

  const onUpdateCancel = () => {
    setUpdateModalVisible(false);
  };

  const onDeleteOk = () => {
    deleteData(selectedEvent.id);
    setDeleteModalVisible(false);
  };

  const onDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="fw-semibold text-secondary">Events</h2>
          </div>
          <div className="col-12 card border-0 shadow-sm">
            <Table
              columns={columns}
              rowKey={(record) => record.id}
              dataSource={events}
              scroll={{ x: 300 }}
              pagination={{ pageSize: 5 }}
              rowSelection={rowSelection}
            />
          </div>
        </div>
      </div>
      {/* Update Modal */}
      <Modal
        title="Update Event"
        visible={updateModalVisible}
        onOk={onUpdateOk}
        onCancel={onUpdateCancel}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Event"
            name="event"
            rules={[{ required: true, message: "Please input the event!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please input the date!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* Delete Modal */}
      <Modal
        title="Delete Event"
        visible={deleteModalVisible}
        onOk={onDeleteOk}
        onCancel={onDeleteCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this event?</p>
        {selectedEvent && (
          <p>
            <strong>{selectedEvent.event}</strong> - {selectedEvent.location}
          </p>
        )}
      </Modal>
    </main>
  );
}
