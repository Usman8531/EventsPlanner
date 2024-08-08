/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Table } from "antd";
import { firestore } from "config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuthContext } from "contexts/AuthContext";

const MyTable = ({ data }) => {
  const { dispatch } = useAuthContext();

  ////////////////////////////////////////////////////
  const columns = [
    {
      title: "Date",
      dataIndex: ["eventDate", "date"],
    },
    {
      title: "First Instructor Name",
      dataIndex: ["firstInstructor", "name"],
      ellipsis: true,
      render: (text, record) => (
        <a onClick={() => console.log(record.firstInstructor)}>{text}</a>
      ),
    },
    {
      title: "First Instructor Teaches",
      dataIndex: ["firstInstructor", "instructor"],
    },
    {
      title: "Second Instructor Name",
      dataIndex: ["secondInstructor", "name"],
      ellipsis: true,
      render: (text, record) => (
        <a onClick={() => console.log(record.secondInstructor)}>{text}</a>
      ),
    },
    {
      title: "Second Instructor Teaches",
      dataIndex: ["secondInstructor", "instructor"],
    },
    {
      title: "Third Instructor Name",
      dataIndex: ["thirdInstructor", "name"],
      ellipsis: true,
      render: (text, record) => (
        <a onClick={() => console.log(record.thirdInstructor)}>{text}</a>
      ),
    },
    {
      title: "Third Instructor Teaches",
      dataIndex: ["thirdInstructor", "instructor"],
    },
    {
      title: "Lunch Time",
      dataIndex: ["lunchTime", "time"],
    },
    {
      title: "Fourth Instructor Name",
      dataIndex: ["fourthInstructor", "name"],
      ellipsis: true,
      render: (text, record) => (
        <a onClick={() => console.log(record.fourthInstructor)}>{text}</a>
      ),
    },
    {
      title: "Fourth Instructor Instructor",
      dataIndex: ["fourthInstructor", "instructor"],
    },
    {
      title: "Actions",
      render: (text, record) => (
        // console.log(record),
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleDelete(record)}
        >
          Delete
        </button>
      ),
    },
  ];
  ///////////////////////////////////////////////////////////////////////
  const handleDelete = async (record) => {
    try {
      await deleteDoc(doc(firestore, "eventDetails", record.id));
      const filterData = data.filter((item) => item.id !== record.id);
      dispatch({ type: "SET_EVENT_DETAILS", payload: filterData });
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
    // console.log(record.id);
  };
  //////////////////////////////////////////////////////////////////////
  const expandable = {
    expandedRowRender: (record) => (
      <div>
        {record.firstInstructor && (
          <React.Fragment key={record.id}>
            <p>
              <strong>First Instructor Description:</strong>{" "}
              {record.firstInstructor.desc}
            </p>
            <p>
              <strong>First Instructor time:</strong>{" "}
              {record.firstInstructor.time}
            </p>
            <p>
              <strong>First Instructor Room:</strong>{" "}
              {record.firstInstructor.room}
            </p>
          </React.Fragment>
        )}
        {record.secondInstructor && (
          <>
            <p>
              <strong>Second Instructor Description:</strong>{" "}
              {record.secondInstructor.desc}
            </p>
            <p>
              <strong>First Instructor time:</strong>{" "}
              {record.secondInstructor.time}
            </p>
            <p>
              <strong>First Instructor Room:</strong>{" "}
              {record.secondInstructor.room}
            </p>
          </>
        )}
        {record.thirdInstructor && (
          <>
            <p>
              <strong>Third Instructor Description:</strong>{" "}
              {record.thirdInstructor.desc}
            </p>
            <p>
              <strong>First Instructor time:</strong>{" "}
              {record.thirdInstructor.time}
            </p>
            <p>
              <strong>First Instructor Room:</strong>{" "}
              {record.thirdInstructor.room}
            </p>
          </>
        )}
        {record.fourthInstructor && (
          <>
            <p>
              <strong>Fourth Instructor Description:</strong>{" "}
              {record.fourthInstructor.desc}
            </p>
            <p>
              <strong>First Instructor time:</strong>{" "}
              {record.fourthInstructor.time}
            </p>
            <p>
              <strong>First Instructor Room:</strong>{" "}
              {record.fourthInstructor.room}
            </p>
          </>
        )}
      </div>
    ),
  };

  return (
    <Table
      scroll={{ x: true, }}
      columns={columns}
      dataSource={data}
      expandable={expandable}
      responsive={true}
    />
  );
};

export default MyTable;
