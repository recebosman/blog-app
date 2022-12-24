import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setPost(docs);
    };
    getPosts();
  }, []);

  const data = post.filter((item) => item.id === id);

  console.log(data);

  return (
    <div className="items-start mt-12 w-full h-screen  flex justify-center ">
      <div className="container w-5/6 h-4/5">
        {loading ? (
          <h1>loading...</h1>
        ) : (
          data.map((item, index) => (
            <div
              className="flex card bg-neutral relative py-12 px-4 flex-col items-center justify-center"
              key={item.id}
            >
              <div className="card-actions absolute ml-6 top-8 left-0">
                <div className="badge badge-outline"></div>
                <div className="badge badge-outline p-6 text-secondary font-semibold text-lg">
                  {item.category}{" "}
                </div>
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="w-2/3 object-cover rounded-lg"
              />
              <h1 className="text-2xl font-bold text-white mt-4">
                {item.title}
              </h1>
              <p className="text-white mt-4">{item.desc}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
