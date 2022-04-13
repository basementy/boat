import * as readline from 'readline'

import { Persons } from "./types";
import { getLadraoValidation, getMaeValidation, getPaiValidation, getPilotValidation } from './validations';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const runCrossingValidations = (side: Persons[]) => {
  return !!(getLadraoValidation(side) && getPaiValidation(side) && getMaeValidation(side));
}

const question = <T>(question: string) => {
  return new Promise<T>((resolve) => {
    rl.question(question, (answer) => {
      return resolve(answer.toLowerCase().toUpperCase() as unknown as T);
    })
  })
}

const initialBoatMovement = async (leftSide: Persons[], rightSide: Persons[], callback: (newLeftSide: Persons[], newRightSide: Persons[], completeBoat: Persons[]) => void) => {
  const localLeftSide = [...leftSide];
  const localRightSide = [...rightSide];
  const localBoatState: Persons[] = [];

  const firstPerson = await question<Persons>('Qual a primeira pessoa que você deseja embarcar? ');

  if (localLeftSide.includes(firstPerson)) {
    localBoatState.push(firstPerson);
    localLeftSide.splice(localLeftSide.indexOf(firstPerson), 1);
  } else {
    console.log('\nEssa pessoa não pode embarcar!');

    console.log('\nLado esquerdo: ' + localLeftSide);
    console.log('Lado direito: ' + localRightSide + '\n');

    return recursiveCrossing(localLeftSide, localRightSide);
  }

  const secondPerson = await question<Persons>('Qual a segunda pessoa que você deseja embarcar? ');

  if (localLeftSide.includes(secondPerson)) {
    localBoatState.push(secondPerson);
    localLeftSide.splice(localLeftSide.indexOf(secondPerson), 1);
  } else {
    console.log("\x1b[33m", '\nEssa pessoa não pode embarcar!');

    console.log('\nLado esquerdo: ' + localLeftSide);
    console.log('Lado direito: ' + localRightSide + '\n');

    return recursiveCrossing(localLeftSide, localRightSide);
  }

  return callback(localLeftSide, localRightSide, localBoatState);
}

export const recursiveCrossing = async (leftSide: Persons[], rightSide: Persons[]) => {
  var boat: Persons[] = [];

  var clonedLeftSide: Persons[] = [...leftSide];
  var clonedRightSide: Persons[] = [...rightSide];

  await initialBoatMovement(clonedLeftSide, clonedRightSide, (newLeftSide, newRightSide, completeBoat) => {
    clonedLeftSide = [...newLeftSide];
    clonedRightSide = [...newRightSide];

    boat = completeBoat;
  });

  if (getPilotValidation(boat)) {
    // Run all sides validations
    if (runCrossingValidations(clonedLeftSide) && runCrossingValidations(clonedRightSide)) {
      clonedRightSide.push(...boat);

      boat = [];

      console.log('\nLado esquerdo: ' + clonedLeftSide);
      console.log('Lado direito: ' + clonedRightSide);

      // Validate if the left side is empty
      if (clonedLeftSide.length === 0) {
        console.log("\x1b[32m", '\nParabéns, você conseguiu atravessar todas as pessoas!');
        rl.close();
        return true;
      } else {
        const returnPerson = await question<Persons>('\nEscolha alguém para voltar ao outro lado: ');

        //Validate the boat return
        if (clonedRightSide.includes(returnPerson)) {
          boat.push(returnPerson);
          clonedRightSide.splice(clonedRightSide.indexOf(returnPerson), 1);
        } else {
          console.log("\x1b[33m", '\nEssa pessoa não pode voltar ao outro lado!');

          console.log('\nLado esquerdo: ' + clonedLeftSide);
          console.log('Lado direito: ' + clonedRightSide + '\n');

          return recursiveCrossing(clonedLeftSide, clonedRightSide);
        }

        // Validate boat pilot
        if (getPilotValidation(boat)) {
          if (runCrossingValidations(clonedLeftSide) && runCrossingValidations(clonedRightSide)) {
            clonedLeftSide.push(...boat);

            console.log('\nLado esquerdo: ' + clonedLeftSide);
            console.log('Lado direito: ' + clonedRightSide + '\n');

            return recursiveCrossing(clonedLeftSide, clonedRightSide);
          } else {
            console.log('Lado esquerdo: ' + clonedLeftSide);
            console.log('Lado direito: ' + clonedRightSide + '\n');

            return recursiveCrossing(clonedLeftSide, clonedRightSide);
          }
        } else {
          clonedRightSide.push(...boat);

          boat = [];

          console.log('Lado esquerdo: ' + clonedLeftSide);
          console.log('Lado direito: ' + clonedRightSide + '\n');

          return recursiveCrossing(clonedLeftSide, clonedRightSide);
        }
      }
    } else {
      console.log('Lado esquerdo: ' + clonedLeftSide);
      console.log('Lado direito: ' + clonedRightSide + '\n');

      return recursiveCrossing(clonedLeftSide, clonedRightSide);
    }
  } else {
    clonedLeftSide.push(...boat);

    boat = [];

    console.log('Lado esquerdo: ' + clonedLeftSide);
    console.log('Lado direito: ' + clonedRightSide + '\n');

    return recursiveCrossing(clonedLeftSide, clonedRightSide);
  }
}