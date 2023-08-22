import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import ChatPanel from "../../components/ChatPanel";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  return (
    <div>
      <ChatPanel />
    </div>
  );
};

export default HomePage;
