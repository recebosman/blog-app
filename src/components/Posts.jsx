import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const Card = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "posts"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setPosts(docs);
      setLoading(false);
    };
    getPosts();
  }, [posts]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-6 justify-items-center items-start pt-12 ">
      {!loading ? (
        <h1>
          <i className="fas fa-spinner fa-spin"></i>
        </h1>
      ) : (
        posts.map((post, index) => (
          <Link to={`/posts/${post.id}`} key={index}>
            <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <figure>
                <img
                  className="rounded-t-xl w-full h-56 object-cover"
                  src={post.image}
                  alt={post.title}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  <a href="#">{post.title}</a>
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{post.desc.substring(0, 100)}...</p>
                <div className="card-actions justify-between flex items-center">
                  {post.user && (
                    <h1 className="lowercase badge badge-outline bg-primary p-3 text-black text-md">
                      {post.user}
                    </h1>
                  )}
                  <div className="badge badge-outline p-3 text-md font-semibold text-black bg-info hover:bg-white hover:brightness-60 hover:text-black">
                    {post.category}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Posts;
