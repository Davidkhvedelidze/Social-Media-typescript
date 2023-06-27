import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Post as IPost } from "./Main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props {
  post: IPost;
}
interface Like {
  userId: string;
  likeId: string;
}
export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "Likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);

      const likeToDelete = doc(db, "Likes", likeToDeleteData.docs[0].id);
      const likeId = likeToDeleteData.docs[0].id;

      await deleteDoc(likeToDelete);

      if (user) {
        setLikes(
          (prev) => prev && prev?.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div>
        <h1>{post.title}</h1>
      </div>
      <div className="bg-blue-200 rounded-sm">
        <p>{post.description}</p>
      </div>
      <div>
        <p>@{post.username}</p>
        <button
          className="border-black text-red-400 bg-red-700 rounded-md p-2"
          onClick={hasUserLiked ? removeLike : addLike}
        >
          {hasUserLiked ? "Liked" : "Like"}
        </button>
        {likes && <p>likes: {likes?.length}</p>}
      </div>
    </div>
  );
};
