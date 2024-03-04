import BGParticles from './components/BGParticals';
import Banner from './components/Banner';
import { ICard } from './components/Card';
import CardList from './components/Card/CardLinst';
import Form from './components/Form';
import './style/global.scss';

function App() {
  const cards: ICard[] = [
    {
      id: '1',
      name: 'Rick Sanchez',
      img: 'https://therickandmortyapi.vercel.app/api/character/avatar/1.jpeg'
    },
    {
      id: '2',
      name: 'Rick Sanchez',
      img: 'https://therickandmortyapi.vercel.app/api/character/avatar/1.jpeg'
    },
    {
      id: '3',
      name: 'Rick Sanchez',
      img: 'https://therickandmortyapi.vercel.app/api/character/avatar/1.jpeg'
    },
    {
      id: '4',
      name: 'Rick Sanchez',
      img: 'https://therickandmortyapi.vercel.app/api/character/avatar/1.jpeg'
    }
  ];

  return (
    <div className="p-3">
      <Banner />
      <Form />
      <BGParticles />
      <CardList cards={cards} />
    </div>
  );
}

export default App;
