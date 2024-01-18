import { GameLevel } from '../types/gameLevel';
import { MARK_COMPLETED, MARK_HELPED } from '../constants/constants';

export function createBurgerLevel(level: GameLevel) {
    if (level.isCompleted && !level.wasHelped) {
        return `${level.levelNb}. ${level.selectorType} ${MARK_COMPLETED}`;
    } else if (level.wasHelped) {
        return `${level.levelNb}. ${level.selectorType} ${MARK_COMPLETED} ${MARK_HELPED}`;
    } else {
        return `${level.levelNb}. ${level.selectorType}`;
    }
}
