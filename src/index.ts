import { recursiveCrossing, showSideState } from './operations';
import { Persons } from './types';

const startCrossing = () => {
  const leftSide: Persons[] = [
    Persons.PAI,
    Persons.MAE,
    Persons.FILHA_1,
    Persons.FILHA_2,
    Persons.FILHO_1,
    Persons.FILHO_2,
    Persons.POLICIAL,
    Persons.LADRAO
  ];

  const rightSide: Persons[] = [];

  recursiveCrossing(leftSide, rightSide);
};

startCrossing();