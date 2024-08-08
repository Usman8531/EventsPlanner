import React, { useState } from "react";
import { Upload } from "antd";
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai";
import { Progress, Space } from "antd";
// importing firestore

import { storage, setData, getData } from "../../../config/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "contexts/AuthContext";

// //////    initialState of input fields
const initialState = {
  event: "",
  description: "",
  location: "",
  date: "",
  select: "",
};

// ////////////////  categories
const categories = [
  "business",
  "sports",
  "farewell",
  "webDevelopment",
  "marketing",
  "technology",
];
function AddForm({ flag }) {
  const { dispatch } = useAuthContext();
  //////  set the download url of the img
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressing, setProgressing] = useState(0);

  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      const storageRef = ref(
        storage,
        "events/images/" + file.name + `${Date.now()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setIsLoading(true);
          const progress = parseInt(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressing(progress);
        },
        (error) => {
          setIsLoading(false);
          window.toastify(error.message, "error");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setIsLoading(false);
            setImgUrl(downloadURL);
          });
        }
      );
    },
  };

  //////////////////////////////////////////////////
  const [state, setState] = useState(initialState);
  // console.log(imgUrl);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((s) => ({
      ...s,
      [name]: value,
    }));
  };

  ///////////////////////////// fetch all data ///////////////
  // fetching all data from fireStore
  const fetchAllItems = async () => {
    await getData().then((events) => {
      // console.log(data);
      dispatch({
        type: "SET_ALL_EVENTS",
        payload: events,
      });
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { event, description, location, date, select } = state;
    if (
      !event ||
      event.length < 2 ||
      !description ||
      description.length < 10 ||
      !location ||
      !date ||
      !select ||
      select === "Open this select menu" ||
      !imgUrl
    ) {
      return window.toastify("Please fill all the fields", "error");
    }
    const data = {
      id: `${Date.now()}`,
      event: event,
      description: description,
      location: location,
      date: date,
      category: select,
      imgUrl: imgUrl,
      participants: 0,
      createdAt: serverTimestamp(),
    };
    setData(data);
    window.toastify("Uploaded Successfully", "success");
    emptyFields();
    // getAllEventsData();
    fetchAllItems();
  };

  /////////////////    delete the uploaded img     //////////////
  const deleteImg = () => {
    const desertRef = ref(storage, imgUrl);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        setImgUrl(null);

        window.toastify("File deleted successfully", "success");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        window.toastify(error.message, "error");
      });
  };

  // ///////////////// ////// empty all input fields
  const emptyFields = () => {
    return setState(initialState) || setImgUrl(null);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-12">
          <label htmlFor="">Event Name</label>
          <input
            type="text"
            className="form-control"
            name="event"
            value={state.event}
            onChange={handleChange}
            placeholder="Enter Event Name"
          />
        </div>
        <div className="col-lg-6 col-12 my-1 my-lg-0">
          <label htmlFor="">Location</label>
          <input
            type="text"
            className="form-control "
            name="location"
            placeholder="Enter Location"
            value={state.location}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="">Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            onChange={handleChange}
            value={state.date}
            placeholder="Enter Event Name"
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="">Event category</label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChange}
            value={state.select}
            name="select"
          >
            <option defaultValue={"Open this select menu"}>
              Open this select menu
            </option>

            {categories &&
              categories.map((item, i) => {
                return (
                  <option value={item} key={i}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>
        <div
          className="col-12 my-3 d-flex justify-content-center align-items-center border position-relative"
          style={{ minHeight: "25vh" }}
        >
          {isLoading ? (
            <>
              <Space wrap>
                <Progress type="circle" percent={progressing} />
              </Space>
            </>
          ) : (
            <>
              {!imgUrl ? (
                <Dragger {...props} className="w-100 ">
                  <p className="ant-upload-drag-icon">
                    <AiOutlineUpload className="fs-2 fw-bold text-secondary" />
                  </p>

                  <p className="text-dark fw-semibold">
                    Click or drag file to this area to upload
                  </p>
                </Dragger>
              ) : (
                <>
                  <img
                    src={imgUrl}
                    alt="uploaded img"
                    className="img-fluid object-fit-contain d-block overflow-hidden"
                    style={{ height: "250px" }}
                  // value={imgUrl}
                  />
                  <button
                    className="p-1 btn rounded-circle bg-secondary position-absolute top-100"
                    onClick={deleteImg}
                    style={{ cursor: "pointer" }}
                  >
                    <AiFillDelete className="fs-3 text-white" />
                  </button>
                </>
              )}
            </>
          )}
        </div>
        <div className="col-12 my-lg-0">
          <label htmlFor="">tell about event</label>
          <textarea
            name="description"
            id=""
            cols="20"
            className="form-control"
            rows="2"
            placeholder="Enter Event Description"
            onChange={handleChange}
            value={state.description}
          ></textarea>
        </div>
        {flag && (
          <div className="col-12 text-end mt-1">
            <button
              className="btn btn-outline-secondary px-5 rounded-0"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AddForm;
