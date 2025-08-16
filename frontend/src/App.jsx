import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Step1 from './Step1.jsx';
import Step2 from './Step2.jsx';
import Step3 from './Step3.jsx';
import Step4 from './Step4.jsx';
import Step5 from './Step5.jsx';
import Step6 from './Step6.jsx';
import Step7 from './Step7.jsx';
import Step8 from './Step8.jsx';
import Step9 from './Step9.jsx';
import Step10 from './Step10.jsx';






export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/step4" element={<Step4 />} />
        <Route path="/step5" element={<Step5 />} />
        <Route path="/step6" element={<Step6 />} />
        <Route path="/step7" element={<Step7 />} />
        <Route path="/step8" element={<Step8 />} />
        <Route path="/step9" element={<Step9 />} />
        <Route path="/step10" element={<Step10 />} />
      </Routes>
    </BrowserRouter>
  );
}