import * as readline from 'readline'

import { Persons } from "./types";
import { getLadraoValidation, getMaeValidation, getPaiValidation, getPilotValidation } from './validations';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export const showSideState = (state: Persons[]) => {
  console.log(state);
};

export const showBoatState = (state: Persons[]) => {
  console.log(state);
};

const runCrossingValidations = (side: Persons[]) => {
  if (getPilotValidation(side)) {
    if (getLadraoValidation(side)) {
      if (getPaiValidation(side)) {
        if (getMaeValidation(side)) {
          return true;
        }
      }
    }
  }

  return false;
}

export const recursiveCrossing = (leftSide: Persons[], rightSide: Persons[]): boolean => {
  let boat: Persons[] = [];

  let clonedLeftSide: Persons[] = [...leftSide];
  let clonedRightSide: Persons[] = [...rightSide];

  rl.question('Qual a primeira pessoa você deseja embarcar? ', (answer: string) => {
    const person = answer.toUpperCase();

    // Validate the first person
    if (clonedLeftSide.includes(person as Persons)) {
      boat.push(person as Persons);
      clonedLeftSide.splice(clonedLeftSide.indexOf(person as Persons), 1);
    } else {
      console.log('Essa pessoa não pode embarcar!');

      rl.close();

      return false;
    }

    rl.question('Qual a segunda pessoa você deseja embarcar? ', (answer: string) => {
      const person = answer.toUpperCase();

      // Validate the second person
      if (clonedLeftSide.includes(person as Persons)) {
        boat.push(person as Persons);
        clonedLeftSide.splice(clonedLeftSide.indexOf(person as Persons), 1);
      } else {
        console.log('Essa pessoa não pode embarcar!');

        rl.close();

        return false;
      }

      // Validate boat pilot
      if (getPilotValidation(boat)) {
        // Run all sides validations
        if (runCrossingValidations(clonedLeftSide) && runCrossingValidations(clonedRightSide)) {
          clonedRightSide.push(...boat);
          boat = [];

          showSideState(clonedLeftSide);
          showSideState(clonedRightSide);

          // Validate if the left side is empty
          if (clonedLeftSide.length === 0) {
            rl.close();

            console.log('Parabéns, você conseguiu atravessar todas as pessoas!');

            return true;
          } else {
            rl.question('Escolha alguém para voltar ao outro lado', (answer: string) => {
              const person = answer.toUpperCase();

              //Validate the boat return
              if (clonedRightSide.includes(person as Persons)) {
                boat.push(person as Persons);
                clonedRightSide.splice(clonedRightSide.indexOf(person as Persons), 1);
              } else {
                console.log('Essa pessoa não pode voltar ao outro lado!');

                rl.close();

                return false;
              }

              // Validate boat pilot
              if (getPilotValidation(boat)) {
                if (runCrossingValidations(clonedLeftSide) && runCrossingValidations(clonedRightSide)) {
                  clonedRightSide.push(...boat);

                  showSideState(clonedLeftSide);
                  showSideState(clonedRightSide);

                  return recursiveCrossing(clonedLeftSide, clonedRightSide);
                }
              } else {
                rl.close();
                return false;
              }
            });
          }
        }
      } else {
        rl.close();
        return false;
      }
    })
  });

  return false;
}