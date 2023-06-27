import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { Post } from "./Post";

export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  username: string;
}

function Main() {
  const postsRef = collection(db, "posts");
  const [postList, setPostList] = useState<Post[] | null>(null);

  const getPost = async () => {
    const data = await getDocs(postsRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="grid">
      {postList?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Main;
