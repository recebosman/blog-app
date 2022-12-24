import React, { useState, useContext } from "react";

import { AuthContext } from "../context/Auth";
import { toast } from "react-toastify";

const Model = ({ className }) => {
  const { addPost } = useContext(AuthContext);

  const [data, setData] = useState({
    title: "",
    desc: "",
    category: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Post sent successfully.");
    addPost(data.title, data.desc, data.category, data.image);
    setData({
      title: "",
      desc: "",
      category: "",
      image: "",
    });
  };

  return (
    <form>
      <div>
        <label htmlFor="my-modal-5" className={className}>
          Add Post
        </label>
        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <div className="modal flex items-center justify-center">
          <div className="modal-box  w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg">Add Post</h3>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">What is the title?</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={data.title}
                name="title"
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
              <label className="label">
                <span className="label-text">What is description</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="description about the post"
                rows={3}
                value={data.desc}
                name="desc"
                onChange={(e) => setData({ ...data, desc: e.target.value })}
              ></textarea>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">What is the category?</span>
                </label>
                <select
                  value={data.category}
                  name="category"
                  onChange={(e) =>
                    setData({ ...data, category: e.target.value })
                  }
                  className="select select-bordered"
                >
                  <option disabled defaultValue>
                    Pick one
                  </option>
                  <option>World</option>
                  <option>Economicial</option>
                  <option>Education</option>
                  <option>Firms</option>
                  <option>Technology</option>
                  <option>Health</option>
                  <option>Football</option>
                  <option>Trivia</option>
                </select>
              </div>
              <label className="label">
                <span className="label-text">Image Url</span>
              </label>
              <input
                type="text"
                className="file-input file-input-bordered file-input-error w-full max-w-xs mt-4"
                value={data.image}
                onChange={(e) => setData({ ...data, image: e.target.value })}
              />
              <button className="btn btn-default mt-4" onClick={handleSubmit}>
                Submit
              </button>
            </div>

            <div className="modal-action">
              <label htmlFor="my-modal-5" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Model;
