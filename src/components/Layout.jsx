import { useState } from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import Topbar from './Topbar';
import ContentArea from './ContentArea';
import { topics } from '../data/mockData';

export default function Layout() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [selectedSubtopic, setSelectedSubtopic] = useState(topics[0].subtopics[0]);

  return (
    <div className="h-screen grid grid-cols-[200px_250px_1fr] grid-rows-[auto_1fr]">
      <div className="row-span-2 bg-gray-100 border-r">
        <SidebarLeft topics={topics} setSelectedTopic={setSelectedTopic} />
      </div>
      <div className="row-span-2 bg-gray-50 border-r">
        <SidebarRight topic={selectedTopic} setSelectedSubtopic={setSelectedSubtopic} />
      </div>
      <div className="bg-white border-b">
        <Topbar subtopic={selectedSubtopic} />
      </div>
      <div className="bg-white overflow-auto">
        <ContentArea topic={selectedTopic} subtopic={selectedSubtopic} />
      </div>
    </div>
  );
}

