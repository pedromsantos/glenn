import PageContent from './components/PageContent';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC<any> = () => {
  return (
    <>
      <Header />
      <main>
        <PageContent />
      </main>
      <Footer />
    </>
  );
};

export default App;
