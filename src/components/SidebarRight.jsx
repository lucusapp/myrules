import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function SidebarRight({ selectedTopic, onSelectSubtopic }) {
  const [subtopics, setSubtopics] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSubtopicName, setNewSubtopicName] = useState("");

  useEffect(() => {
    fetchSubtopics();
  }, [selectedTopic]);

  const fetchSubtopics = async () => {
    if (!selectedTopic) {
      setSubtopics([]);
      return;
    }

    const subtopicsRef = collection(db, `topics/${selectedTopic.id}/subtopics`);
    const snapshot = await getDocs(subtopicsRef);
    const fetchedSubtopics = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));

    setSubtopics(fetchedSubtopics);
  };

  const handleAddSubtopic = async (e) => {
    e.preventDefault();
    if (!newSubtopicName.trim() || !selectedTopic) return;

    const subtopicsRef = collection(db, `topics/${selectedTopic.id}/subtopics`);
    await addDoc(subtopicsRef, { name: newSubtopicName.trim() });
    setNewSubtopicName("");
    setShowForm(false);
    fetchSubtopics();
  };

  return (
    <div className="w-64 h-full bg-gray-100 border-l p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Subtemas</h2>
        {selectedTopic && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-blue-500 text-lg font-bold hover:text-blue-700"
            title="Añadir subtema"
          >
            +
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleAddSubtopic} className="mb-4 space-y-2">
          <input
            type="text"
            value={newSubtopicName}
            onChange={(e) => setNewSubtopicName(e.target.value)}
            placeholder="Nombre del subtema"
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

      {selectedTopic ? (
        <ul className="space-y-2">
          {subtopics.map((sub) => (
            <li
              key={sub.id}
              onClick={() => onSelectSubtopic(sub)}
              className="cursor-pointer px-3 py-2 rounded hover:bg-gray-200"
            >
              {sub.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Selecciona un tema para ver los subtemas.</p>
      )}
    </div>
  );
}


  