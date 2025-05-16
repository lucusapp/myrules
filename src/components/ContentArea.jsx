import { useState, useEffect } from "react";
import Card from "./Card";
import { v4 as uuidv4 } from "uuid";

export default function ContentArea({ selectedSubtopic }) {
  const [cardsBySubtopic, setCardsBySubtopic] = useState({});
  const [cards, setCards] = useState([]);

  // Cargar las cards del subtema cuando cambia
  useEffect(() => {
    if (selectedSubtopic?.id) {
      const subCards = cardsBySubtopic[selectedSubtopic.id] || [];
      setCards(subCards);
    } else {
      setCards([]);
    }
  }, [selectedSubtopic, cardsBySubtopic]);

  const handleAddCard = () => {
    const newCard = {
      id: uuidv4(),
      title: "Nuevo título",
      subtitle: "Nuevo subtítulo",
      content: "",
      isNew: true,
    };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    setCardsBySubtopic({
      ...cardsBySubtopic,
      [selectedSubtopic.id]: updatedCards,
    });
  };

  const handleUpdateCard = (updatedCard) => {
    const updatedCards = cards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    );
    setCards(updatedCards);
    setCardsBySubtopic({
      ...cardsBySubtopic,
      [selectedSubtopic.id]: updatedCards,
    });
  };

  const handleDeleteCard = (cardId) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    setCards(updatedCards);
    setCardsBySubtopic({
      ...cardsBySubtopic,
      [selectedSubtopic.id]: updatedCards,
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {selectedSubtopic?.name || "Selecciona un subtema"}
        </h2>
        {selectedSubtopic && (
          <button
            onClick={handleAddCard}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Añadir tarjeta
          </button>
        )}
      </div>

      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onUpdate={handleUpdateCard}
          onDelete={handleDeleteCard}
        />
      ))}
    </div>
  );
}



