import { recursiveCrossing } from './operations';
import { Persons } from './types';

const startCrossing = async () => {
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

  console.log('Lado esquerdo: ' + leftSide)
  console.log('Lado direito: ' + rightSide + '\n');

  await recursiveCrossing(leftSide, rightSide);
};

startCrossing();