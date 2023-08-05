import React, { useState } from "react";
import { Upload } from "antd";
// fourthInstructorImg
import { AiOutlineUpload } from "react-icons/ai";
import { Progress, Space } from "antd";
// importing firestore

import { firestore, storage } from "../../../config/firebase";
import {
  // deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// import { serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "contexts/AuthContext";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const initialState = {
  eventDate: {
    date: "",
  },
  eventName: "",
  firstInstructor: {
    name: "",
    instructor: "",
    desc: "",
    price: "",
    room: "",
    time: "",
  },
  secondInstructor: {
    name: "",
    instructor: "",
    desc: "",
    price: "",
    room: "",
    time: "",
  },
  thirdInstructor: {
    name: "",
    instructor: "",
    desc: "",
    price: "",
    room: "",
    time: "",
  },
  lunchTime: {
    time: "",
  },
  fourthInstructor: {
    name: "",
    instructor: "",
    desc: "",
    price: "",
    room: "",
    time: "",
  },
};
function RecentEvents() {
  const [formData, setFormData] = useState(initialState);
  const [firstInstructorImg, setFirstInstructorImg] = useState(null);
  const [secondInstructorImg, setSecondInstructorImg] = useState(null);
  const [thirdInstructorImg, setThirdInstructorImg] = useState(null);
  const [fourthInstructorImg, setFourthInstructorImg] = useState(null);
  /////////////////////////////////////////////////////////
  const { dispatch } = useAuthContext();
  //////  set the download url of the img
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progressing, setProgressing] = useState(0);
  const [secondIsLoading, setSecondIsLoading] = useState(false);
  const [secondProgressing, setSecondProgressing] = useState(0);
  const [thirdIsLoading, setThirdIsLoading] = useState(false);
  const [thirdProgressing, setThirdProgressing] = useState(0);
  const [fourthIsLoading, setFourthIsLoading] = useState(false);
  const [fourthProgressing, setFourthProgressing] = useState(0);

  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      const storageRef = ref(
        storage,
        "details/instructors/" + file.name + `${Date.now()}`
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
            setFirstInstructorImg(downloadURL);
          });
        }
      );
    },
  };
  ///////////////////////////////////////////////////////////////
  const secondProp = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      const storageRef = ref(
        storage,
        "details/instructors/" + file.name + `${Date.now()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setSecondIsLoading(true);
          const progress = parseInt(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setSecondProgressing(progress);
        },
        (error) => {
          setSecondIsLoading(false);
          window.toastify(error.message, "error");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setSecondIsLoading(false);
            setSecondInstructorImg(downloadURL);
          });
        }
      );
    },
  };
  ///////////////////////////////////////////////////////////////
  const thirdProp = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      const storageRef = ref(
        storage,
        "details/instructors/" + file.name + `${Date.now()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setThirdIsLoading(true);
          const progress = parseInt(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setThirdProgressing(progress);
        },
        (error) => {
          setThirdIsLoading(false);
          window.toastify(error.message, "error");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setThirdIsLoading(false);
            setThirdInstructorImg(downloadURL);
          });
        }
      );
    },
  };
  ///////////////////////////////////////////////////////////////
  const fourthProp = {
    name: "file",
    multiple: false,
    beforeUpload(file) {
      const storageRef = ref(
        storage,
        "details/instructors/" + file.name + `${Date.now()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setFourthIsLoading(true);
          const progress = parseInt(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setFourthProgressing(progress);
        },
        (error) => {
          setFourthIsLoading(false);
          window.toastify(error.message, "error");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFourthIsLoading(false);
            setFourthInstructorImg(downloadURL);
          });
        }
      );
    },
  };
  /////////////////    delete the uploaded img     //////////////
  // const deleteImg = () => {
  //   const desertRef = ref(storage, firstInstructorImg);

  //   // Delete the file
  //   deleteObject(desertRef)
  //     .then(() => {
  //       // File deleted successfully
  //       setFirstInstructorImg(null);

  //       window.toastify("File deleted successfully", "success");
  //     })
  //     .catch((error) => {
  //       // Uh-oh, an error occurred!
  //       window.toastify(error.message, "error");
  //     });
  // };

  ////////////////////////////////////////////////////////////
  const clearForm = () => {
    setFormData(initialState);
    setFirstInstructorImg(null);
    setSecondInstructorImg(null);
    setThirdInstructorImg(null);
    setFourthInstructorImg(null);
  };

  /////////////////////////////////////////////////////////////
  const getEventData = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "eventDetails")
      );
      const eventData = querySnapshot.docs.map((doc) => doc.data());
      console.log("Event data:", eventData);
      return eventData;
    } catch (error) {
      console.error("Error getting event data: ", error);
    }
  };
  const fetchAllDetails = () => {
    getEventData().then((data) => {
      // console.log(data);
      dispatch({
        type: "SET_EVENT_DETAILS",
        payload: data,
      });
    });
  };
  // ///////////////   handle the changing value of the fields
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [dataset.instructor]: {
        ...prevState[dataset.instructor],
        [name]: value,
      },
    }));
  };

  /////////////////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const {
      firstInstructor,
      secondInstructor,
      thirdInstructor,
      fourthInstructor,
      eventDate,
      lunchTime,
    } = formData;
    if (
      !firstInstructor.name ||
      !secondInstructor.name ||
      !thirdInstructor.name ||
      !fourthInstructor.name
    ) {
      window.toastify("Please enter complete Information instructor", "error");
      return;
    }
    const data = {
      id: `${Date.now()}`,
      eventDate: {
        date: eventDate.date,
      },
      firstInstructor: {
        name: firstInstructor.name,
        instructor: firstInstructor.instructor,
        desc: firstInstructor.desc,
        price: firstInstructor.price,
        room: firstInstructor.room,
        time: firstInstructor.time,
        imgUrl: firstInstructorImg,
      },
      secondInstructor: {
        name: secondInstructor.name,
        instructor: secondInstructor.instructor,
        desc: secondInstructor.desc,
        price: secondInstructor.price,
        room: secondInstructor.room,
        time: secondInstructor.time,
        imgUrl: secondInstructorImg,
      },
      thirdInstructor: {
        name: thirdInstructor.name,
        instructor: thirdInstructor.instructor,
        desc: thirdInstructor.desc,
        price: thirdInstructor.price,
        room: thirdInstructor.room,
        time: thirdInstructor.time,
        imgUrl: thirdInstructorImg,
      },
      lunchTime: {
        time: lunchTime.time,
      },
      fourthInstructor: {
        name: fourthInstructor.name,
        instructor: fourthInstructor.instructor,
        desc: fourthInstructor.desc,
        price: fourthInstructor.price,
        room: fourthInstructor.room,
        time: fourthInstructor.time,
        imgUrl: fourthInstructorImg,
      },
    };
    // ////////////    set data into firestore    ////////////////////
    try {
      setIsUploading(true);
      const latestEventRef = doc(firestore, "eventDetails", `${Date.now()}`);
      await setDoc(latestEventRef, data, { merge: true });
      // console.log("Data saved successfully!");
      window.toastify("Data saved successfully", "success");
      clearForm();
      fetchAllDetails();
    } catch (error) {
      // console.error("Error saving data: ", error);
      window.toastify(error.message, "error");
      setIsUploading(false);
    }
    setIsUploading(false);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center fw-semibold text-secondary">
              Add Recent Events
            </h2>
          </div>
        </div>
      </div>
      <div className="container card border-0 shadow-sm py-3">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <h4>Date of event</h4>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="eventDate-date"
                  name="date"
                  data-instructor="eventDate"
                  value={formData.eventDate.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 ">
              <h4>Name of event</h4>
              <div className="form-group">
                <label htmlFor="date">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventName"
                  name="eventName"
                  data-instructor="name"
                  value={formData.eventName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4>First Instructor</h4>
              <div className="form-group">
                <label htmlFor="first-instructor-img">Image</label>
                {isLoading ? (
                  <>
                    <Space wrap>
                      <Progress type="circle" percent={progressing} />
                    </Space>
                  </>
                ) : (
                  <>
                    {!firstInstructorImg ? (
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
                          src={firstInstructorImg}
                          alt="uploaded img"
                          className="img-fluid object-fit-contain d-block overflow-hidden"
                          style={{ height: "150px" }}
                          // value={imgUrl}
                        />
                        {/* <button
                          className="p-1 btn rounded-circle bg-secondary position-absolute top-0"
                          onClick={deleteImg}
                          style={{ cursor: "pointer" }}
                        >
                          <AiFillDelete className="fs-3 text-white" />
                        </button> */}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="first-instructor-name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first-instructor-name"
                  name="name"
                  data-instructor="firstInstructor"
                  value={formData.firstInstructor.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="first-instructor-instructor">Instructor</label>
                <input
                  type="text"
                  className="form-control"
                  id="first-instructor-instructor"
                  name="instructor"
                  data-instructor="firstInstructor"
                  value={formData.firstInstructor.instructor}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="first-instructor-instructor">Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="first-instructor-time"
                  name="time"
                  data-instructor="firstInstructor"
                  value={formData.firstInstructor.time}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="first-instructor-instructor">Room No</label>
                <input
                  type="text"
                  className="form-control"
                  id="first-instructor-room"
                  name="room"
                  data-instructor="firstInstructor"
                  value={formData.firstInstructor.room}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="first-instructor-desc">Description</label>
                <textarea
                  className="form-control"
                  id="first-instructor-desc"
                  name="desc"
                  data-instructor="firstInstructor"
                  value={formData.firstInstructor.desc}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6">
              <h4>second Instructor</h4>
              <div className="form-group">
                <label htmlFor="second-instructor-img">Image</label>
                {secondIsLoading ? (
                  <>
                    <Space wrap>
                      <Progress type="circle" percent={secondProgressing} />
                    </Space>
                  </>
                ) : (
                  <>
                    {!secondInstructorImg ? (
                      <Dragger {...secondProp} className="w-100 ">
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
                          src={secondInstructorImg}
                          alt="uploaded img"
                          className="img-fluid object-fit-contain d-block overflow-hidden"
                          style={{ height: "150px" }}
                          // value={imgUrl}
                        />
                        {/* <button
                          className="p-1 btn rounded-circle bg-secondary position-absolute top-0"
                          onClick={deleteImg}
                          style={{ cursor: "pointer" }}
                        >
                          <AiFillDelete className="fs-3 text-white" />
                        </button> */}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="second-instructor-name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="second-instructor-name"
                  name="name"
                  data-instructor="secondInstructor"
                  value={formData.secondInstructor.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="second-instructor-instructor">Instructor</label>
                <input
                  type="text"
                  className="form-control"
                  id="second-instructor-instructor"
                  name="instructor"
                  data-instructor="secondInstructor"
                  value={formData.secondInstructor.instructor}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="second-instructor-time">Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="second-instructor-time"
                  name="time"
                  data-instructor="secondInstructor"
                  value={formData.secondInstructor.time}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="second-instructor-time">Room No</label>
                <input
                  type="text"
                  className="form-control"
                  id="second-instructor-room"
                  name="room"
                  data-instructor="secondInstructor"
                  value={formData.secondInstructor.room}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="second-instructor-desc">Description</label>
                <textarea
                  className="form-control"
                  id="second-instructor-desc"
                  name="desc"
                  data-instructor="secondInstructor"
                  value={formData.secondInstructor.desc}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Third Instructor</h4>
              <div className="form-group">
                <label htmlFor="third-instructor-img">Image</label>
                {thirdIsLoading ? (
                  <>
                    <Space wrap>
                      <Progress type="circle" percent={thirdProgressing} />
                    </Space>
                  </>
                ) : (
                  <>
                    {!thirdInstructorImg ? (
                      <Dragger {...thirdProp} className="w-100 ">
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
                          src={thirdInstructorImg}
                          alt="uploaded img"
                          className="img-fluid object-fit-contain d-block overflow-hidden"
                          style={{ height: "150px" }}
                          // value={imgUrl}
                        />
                        {/* <button
                          className="p-1 btn rounded-circle bg-secondary position-absolute top-0"
                          onClick={deleteImg}
                          style={{ cursor: "pointer" }}
                        >
                          <AiFillDelete className="fs-3 text-white" />
                        </button> */}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="third-instructor-name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="third-instructor-name"
                  name="name"
                  data-instructor="thirdInstructor"
                  value={formData.thirdInstructor.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="third-instructor-instructor">Instructor</label>
                <input
                  type="text"
                  className="form-control"
                  id="third-instructor-instructor"
                  name="instructor"
                  data-instructor="thirdInstructor"
                  value={formData.thirdInstructor.instructor}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="third-instructor-time">time</label>
                <input
                  type="text"
                  className="form-control"
                  id="third-instructor-time"
                  name="time"
                  data-instructor="thirdInstructor"
                  value={formData.thirdInstructor.time}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="third-instructor-room">Room No</label>
                <input
                  type="text"
                  className="form-control"
                  id="third-instructor-room"
                  name="room"
                  data-instructor="thirdInstructor"
                  value={formData.thirdInstructor.room}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="third-instructor-desc">Description</label>
                <textarea
                  className="form-control"
                  id="third-instructor-desc"
                  name="desc"
                  data-instructor="thirdInstructor"
                  value={formData.thirdInstructor.desc}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Forth Instructor</h4>
              <div className="form-group">
                <label htmlFor="fourth-instructor-img">Image</label>
                {fourthIsLoading ? (
                  <>
                    <Space wrap>
                      <Progress type="circle" percent={fourthProgressing} />
                    </Space>
                  </>
                ) : (
                  <>
                    {!fourthInstructorImg ? (
                      <Dragger {...fourthProp} className="w-100 ">
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
                          src={fourthInstructorImg}
                          alt="uploaded img"
                          className="img-fluid object-fit-contain d-block overflow-hidden"
                          style={{ height: "150px" }}
                          // value={imgUrl}
                        />
                        {/* <button
                          className="p-1 btn rounded-circle bg-secondary position-absolute top-0"
                          onClick={deleteImg}
                          style={{ cursor: "pointer" }}
                        >
                          <AiFillDelete className="fs-3 text-white" />
                        </button> */}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="fourth-instructor-name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fourth-instructor-name"
                  name="name"
                  data-instructor="fourthInstructor"
                  value={formData.fourthInstructor.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fourth-instructor-instructor">Instructor</label>
                <input
                  type="text"
                  className="form-control"
                  id="fourth-instructor-instructor"
                  name="instructor"
                  data-instructor="fourthInstructor"
                  value={formData.fourthInstructor.instructor}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fourth-instructor-time">time</label>
                <input
                  type="text"
                  className="form-control"
                  id="fourth-instructor-time"
                  name="time"
                  data-instructor="fourthInstructor"
                  value={formData.fourthInstructor.time}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fourth-instructor-room">Room No</label>
                <input
                  type="text"
                  className="form-control"
                  id="fourth-instructor-room"
                  name="room"
                  data-instructor="fourthInstructor"
                  value={formData.fourthInstructor.room}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fourth-instructor-desc">Description</label>
                <textarea
                  className="form-control"
                  id="fourth-instructor-desc"
                  name="desc"
                  data-instructor="fourthInstructor"
                  value={formData.fourthInstructor.desc}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6 offset-lg-3 text-center">
              <h4>Lunch time</h4>
              <div className="form-group">
                <label htmlFor="lunch-time">Lunch</label>
                <input
                  type="text"
                  className="form-control"
                  id="Lunch-time"
                  name="time"
                  data-instructor="lunchTime"
                  value={formData.lunchTime.time}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`btn btn-primary`}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default RecentEvents;
