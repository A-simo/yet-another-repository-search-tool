import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {
  return (
    <>
      <Header />
      <div className='wrapper'>
        <div className='content'>
          <Sidebar />
          <div className='main-content'>
              <MainContent />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
