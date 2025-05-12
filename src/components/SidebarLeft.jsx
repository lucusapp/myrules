import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function SidebarLeft({ selectedTopic, onSelectTopic }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const querySnapshot = await getDocs(collection(db, "topics"));
      const fetchedTopics = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setTopics(fetchedTopics);
    };

    fetchTopics();
  }, []);

  return (
    <div className="w-64 h-full bg-gray-100 border-r p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Temas</h2>
      <ul className="space-y-2">
        {topics.map((topic) => (
          <li
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            className={`cursor-pointer px-3 py-2 rounded ${
              selectedTopic?.id === topic.id
                ? "bg-blue-200 font-bold"
                : "hover:bg-gray-200"
            }`}
          >
            {topic.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

