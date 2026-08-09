import { Margin } from '@mui/icons-material';
import './Carousel.css';
import Formation2 from '../../components/Reactbit/Formattion2';
import Formation from './Formation';
import Formation3 from '../../components/Reactbit/Formation3';
import Formation4 from '../../components/Reactbit/Formation4';

const cards = [
  {
    id: 1,
    content: <Formation />,
  },
  {
    id: 2,
    content: <Formation2 />
  },
  {
    id: 3,
    content: <Formation3 />
  },
  {
    id: 4,
    content: <Formation4 />
  },
];

const Carousel = () => {
  return (
    <div className="MMslider" style={{ '--width': '200px', '--height': '200px' }}>
      <div className="MMlist">
        {[...cards, ...cards].map((card, index) => (
          <div className="MMitem" key={index}>
            <div className="MMcard" style={{ background: card.bg }}>
              {card.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
