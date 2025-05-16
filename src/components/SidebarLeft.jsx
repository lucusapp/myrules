import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function SidebarLeft({ selectedTopic, onSelectTopic }) {
  const [topics, setTopics] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const querySnapshot = await getDocs(collection(db, "topics"));
    const fetchedTopics = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    setTopics(fetchedTopics);
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;
    await addDoc(collection(db, "topics"), { name: newTopicName.trim() });
    setNewTopicName("");
    setShowForm(false);
    fetchTopics(); // Refresca
  };

  return (
    <div className="w-64 h-full bg-gray-100 border-r p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Temas</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-blue-500 text-lg font-bold hover:text-blue-700"
          title="Añadir nuevo tema"
        >
          +
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddTopic} className="mb-4 space-y-2">
          <input
            type="text"
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
            placeholder="Nombre del tema"
            className="w-full px-2 py-1 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
          >
            Añadir
          </button>
        </form>
      )}

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

