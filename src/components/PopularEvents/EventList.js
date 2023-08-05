import React, { useState } from "react";
// import { event } from "../../utils/FakeApi";
import RowContainer from "./RowContainer";
import { useAuthContext } from "contexts/AuthContext";
function EventList() {
  const { events } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState("business");

  const categories = [
    "business",
    "sports",
    "farewell",
    "webDevelopment",
    "marketing",
    "technology",
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <div className="mt-5 container">
        <div className="row">
          <div className="col  d-flex justify-content-center align-items-center flex-wrap">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(category)}
                className={`btn me-3 ${
                  selectedCategory === category &&
                  "active border-secondary text-uppercase"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <RowContainer
          events={
            events &&
            events?.filter((items) => items.category === selectedCategory)
          }
        />
      </div>
    </>
  );
}

export default EventList;
