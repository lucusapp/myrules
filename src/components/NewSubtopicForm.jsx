import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function NewSubtopicForm({ topic, onCreated }) {
  const [subtopic, setSubtopic] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([""]);
  const [notes, setNotes] = useState("");

  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleSubmit = async () => {
    if (!subtopic.trim()) return;

    await addDoc(collection(db, "knowledge"), {
      topic: topic.id,
      subtopic: subtopic.trim(),
      description,
      steps: steps.filter((s) => s.trim() !== ""),
      notes,
    });

    // Notifica al padre para actualizar vista
    onCreated(subtopic.trim());
    // Limpia el formulario
    setSubtopic("");
    setDescription("");
    setSteps([""]);
    setNotes("");
  };

  return (
    <div className="p-4 border rounded mb-4 bg-white shadow">
      <h2 className="font-bold text-lg mb-2">➕ Nuevo subtema en {topic.name}</h2>

      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Nombre del subtema"
        value={subtopic}
        onChange={(e) => setSubtopic(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mb-2 rounded"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {steps.map((step, idx) => (
        <input
          key={idx}
          className="w-full border p-1 mb-1 rounded"
          placeholder={`Paso ${idx + 1}`}
          value={step}
          onChange={(e) => handleStepChange(idx, e.target.value)}
        />
      ))}

      <button onClick={handleAddStep} className="text-sm text-green-600 mt-1">
        ➕ Añadir paso
      </button>

      <textarea
        className="w-full border p-2 mb-2 mt-2 rounded"
        placeholder="Notas (opcional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar subtema
      </button>
    </div>
  );
}

