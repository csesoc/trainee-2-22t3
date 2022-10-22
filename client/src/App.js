import Profile from "./components/Profile";
import ProfileTracker from "./components/ProfileTracker/ProfileTracker";
import ProgressBarWhole from "./components/ProgressBarWhole";
import DoomFactor from "./components/DoomFactor";
import HowPrepared from "./components/HowPrepared/HowPrepared";
import DoomGraph from "./components/DoomGraph";

function App() {
  return (
    <div className="App">
      <DoomFactor />
      <ProfileTracker />
      <HowPrepared />
      {/* <DoomGraph /> */}
    </div>
  );
}

export default App;
