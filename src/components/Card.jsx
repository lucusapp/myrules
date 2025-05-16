import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Card({ card, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(true);
  const [editing, setEditing] = useState(card.isNew || false);
  const [localCard, setLocalCard] = useState({
    title: card.title,
    subtitle: card.subtitle,
    content: card.content,
  });

  const handleChange = (field, value) => {
    setLocalCard((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate({ ...card, ...localCard, isNew: false });
    setEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4 border">
      <div className="flex justify-between items-center">
        {editing ? (
          <input
            type="text"
            value={localCard.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Título"
            className="text-lg font-semibold w-full mb-2 border-b pb-1 outline-none"
          />
        ) : (
          <h3 className="text-lg font-semibold">{card.title}</h3>
        )}

        {!editing && (
          <div className="space-x-2 text-sm ml-4">
            <button onClick={() => setExpanded(!expanded)} className="text-blue-500">
              {expanded ? "Ocultar" : "Ver"}
            </button>
            <button onClick={() => setEditing(true)} className="text-green-500">Editar</button>
            <button
                    onClick={() => {
                      if (confirm("¿Estás seguro de eliminar esta tarjeta?")) {
                        onDelete(card.id);
                      }
                    }}
                    className="text-red-500"
                  >
                    Eliminar
                  </button>

          </div>
        )}
      </div>

      {expanded && (
        <div className="mt-2">
          {editing ? (
            <>
              <input
                type="text"
                value={localCard.subtitle}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                placeholder="Subtítulo"
                className="font-medium text-gray-600 w-full mb-2 border-b pb-1 outline-none"
              />
              <ReactQuill value={localCard.content} onChange={(val) => handleChange("content", val)} />
              <div className="mt-2 flex space-x-2">
                <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded">Guardar</button>
                <button onClick={() => setEditing(false)} className="text-gray-500">Cancelar</button>
              </div>
            </>
          ) : (
            <>
              <h4 className="font-medium text-gray-600">{card.subtitle}</h4>
              <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: card.content }} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
