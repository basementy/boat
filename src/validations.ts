import { Persons } from './types';

export const getPilotValidation = (boat: Persons[]) => {
  if (boat.includes(Persons.POLICIAL) || boat.includes(Persons.MAE) || boat.includes(Persons.PAI)) {
    return true;
  }

  console.log("\x1b[33m", '\nApenas policial, mãe e pai podem pilotar!\n');

  return false;
}

export const getLadraoValidation = (side: Persons[]) => {
  if (side.includes(Persons.LADRAO)) {
    if (side.length === 1) {
      return true;
    }

    if (side.includes(Persons.POLICIAL)) {
      return true;
    }

    console.log("\x1b[33m", '\nLadrao não pode estar com mais pessoas e sem o policial!\n');

    return false;
  }

  return true;
}

export const getPaiValidation = (side: Persons[]) => {
  if (side.includes(Persons.PAI)) {
    if (side.length === 1) {
      return true;
    } else if (side.length === 3) {
      if (side.includes(Persons.FILHA_1) && side.includes(Persons.FILHA_2)) {
        console.log("\x1b[33m", '\nPai não pode estar sozinho com as duas filhas!\n');

        return false;
      }

      return true;
    } else if (side.length === 2) {
      if (side.includes(Persons.FILHA_1) || side.includes(Persons.FILHA_2)) {
        console.log("\x1b[33m", '\nPai não pode estar sozinho com uma das duas filhas!\n');

        return false;
      }

      return true;
    }

    return true;
  }

  return true;
}

export const getMaeValidation = (side: Persons[]) => {
  if (side.includes(Persons.MAE)) {
    if (side.length === 1) {
      return true;
    } else if (side.length === 3) {
      if (side.includes(Persons.FILHO_1) && side.includes(Persons.FILHO_2)) {
        console.log("\x1b[33m", '\nMãe não pode estar sozinha com os dois filhos!\n');

        return false;
      }

      return true;
    } else if (side.length === 2) {
      if (side.includes(Persons.FILHO_1) || side.includes(Persons.FILHO_2)) {
        console.log("\x1b[33m", '\nMãe não pode estar sozinha com um dos dois filhos!\n');

        return false;
      }

      return true;
    }

    return true;
  }

  return true;
}