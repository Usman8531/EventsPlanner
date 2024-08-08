import DashboardCard from "components/Dashboard/DashboardCard";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { BsBookmarkCheck } from "react-icons/bs";
import { MdDiamond } from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { firestore } from "../../config/firebase";
import Modal from "antd/lib/modal/Modal";

export default function Home() {

  const [users, setUsers] = useState([]);
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    // Fetch user data from Firestore
    async function fetchUserData() {
      const usersCollectionRef = collection(firestore, "user");
      const usersSnapshot = await getDocs(usersCollectionRef);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    }
    fetchUserData();
  }, []);

  const sortUsers = () => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => (a.name > b.name ? 1 : -1));
    setUsers(sortedUsers);
  };

  const updateUser = async (userId, newName) => {
    setUserIdToUpdate(userId);
    setNewName(newName);
  };

  const handleUpdateClick = async () => {
    const userDocRef = doc(firestore, "user", userIdToUpdate);
    await updateDoc(userDocRef, { userName: newName });
    const updatedUsers = users.map((user) => {
      if (user.id === userIdToUpdate) {
        return { ...user, userName: newName };
      }
      return user;
    });
    setUsers(updatedUsers);
    setUserIdToUpdate(null);
    setNewName("");
  };

  const handleCancel = () => {
    setUserIdToUpdate(null);
    setNewName("");
  };

  const deleteUser = async (userId) => {
    const userDocRef = doc(firestore, "user", userId);
    await deleteDoc(userDocRef);
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <main>
      <div className="container">
        <h2 className="text-secondary fw-bold fs-1 text-center">Dashboard</h2>
        <div className="row">
          <DashboardCard
            text1={"Weekly sales"}
            text2={"$15000"}
            text3={"Increased by 60%"}
            Icon={TbDeviceAnalytics}
          />
          <DashboardCard
            text1={"Weekly sales"}
            text2={"$15000"}
            text3={"Increased by 60%"}
            Icon={BsBookmarkCheck}
          />
          <DashboardCard
            text1={"Weekly orders"}
            text2={"4500"}
            text3={"Decreased by 10%"}
            Icon={MdDiamond}
          />
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-hover table-striped ">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => updateUser(user.id, "New Name")}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => sortUsers()}
                >
                  Sort Users
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for updating user name */}
      <Modal
        title="Update User"
        visible={userIdToUpdate !== null}
        onOk={handleUpdateClick}
        onCancel={handleCancel}
      >
        <div className="form-group">
          <label htmlFor="newNameInput">New Name:</label>
          <input
            type="text"
            className="form-control"
            id="newNameInput"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </div>
      </Modal>
    </main>
  );
}
