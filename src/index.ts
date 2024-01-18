import './sass/index.css';

import { LevelData } from './types/levelData';
import jsonLevels from './levels.json';
import { Apple, Bento, Orange, Pickle, Plate } from './customElements/custom';
import { Game } from './types/game';

customElements.define('my-apple', Apple);
customElements.define('my-plate', Plate);
customElements.define('my-pickle', Pickle);
customElements.define('my-bento', Bento);
customElements.define('my-orange', Orange);

const loadedData: LevelData = jsonLevels;

const game = new Game(loadedData.levels);

game.start();
