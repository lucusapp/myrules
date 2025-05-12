import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function SidebarRight({ selectedTopic, onSelectSubtopic }) {
  const [subtopics, setSubtopics] = useState([]);

  useEffect(() => {
    const fetchSubtopics = async () => {
      if (selectedTopic) {
        const q = query(
          collection(db, "subtopics"),
          where("topicId", "==", selectedTopic.id)
        );
        const querySnapshot = await getDocs(q);
        const fetchedSubtopics = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }));
        setSubtopics(fetchedSubtopics);
      } else {
        setSubtopics([]);
      }
    };

    fetchSubtopics();
  }, [selectedTopic]);

  return (
    <div className="w-64 h-full bg-gray-100 border-l p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Subtemas</h2>
      {selectedTopic ? (
        <ul className="space-y-2">
          {subtopics.map((sub) => (
            <li
              key={sub.id}
              onClick={() => onSelectSubtopic(sub)}
              className="cursor-pointer px-3 py-2 rounded hover:bg-gray-200"
            >
              {sub.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Selecciona un tema para ver los subtemas.</p>
      )}
    </div>
  );
}



  