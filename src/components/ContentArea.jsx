export default function ContentArea({ selectedTopic, selectedSubtopic }) {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Contenido</h1>
      {selectedSubtopic ? (
        <div>
          <h2 className="text-xl font-semibold">{selectedSubtopic.title}</h2>
          <p className="text-gray-600 mt-2">Aquí iría el contenido del subtema.</p>
        </div>
      ) : selectedTopic ? (
        <p className="text-gray-500">Selecciona un subtema para ver el contenido.</p>
      ) : (
        <p className="text-gray-500">Selecciona un tema para empezar.</p>
      )}
    </div>
  );
}

