import { useState } from "react";
import SidebarLeft from "./components/SidebarLeft";
import SidebarRight from "./components/SidebarRight";
import ContentArea from "./components/ContentArea";

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  return (
    <div className="flex h-screen">
<SidebarLeft
  selectedTopic={selectedTopic}
  onSelectTopic={(topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null); // Reinicia subtema al cambiar de tema
  }}
/>

<SidebarRight
  selectedTopic={selectedTopic}
  onSelectSubtopic={(sub) => setSelectedSubtopic(sub)}
/>

<ContentArea
  selectedTopic={selectedTopic}
  selectedSubtopic={selectedSubtopic}
/>

    </div>
  );
}

export default App;


