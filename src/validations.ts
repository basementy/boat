import { Persons } from './types';

export const getPilotValidation = (boat: Persons[]) => {
  if (boat.includes(Persons.POLICIAL) || boat.includes(Persons.MAE) || boat.includes(Persons.PAI)) {
    return true;
  } else {
    console.log('Apenas policial, mãe e pai podem pilotar!');

    return false;
  }
}

export const getLadraoValidation = (side: Persons[]) => {
  if (side.includes(Persons.LADRAO)) {
    if (side.length === 1) {
      return true;
    } else {
      if (side.includes(Persons.POLICIAL)) {
        return true;
      } else {
        console.log('Ladrao não pode estar com mais pessoas e sem o policial!');

        return false;
      }
    }
  } else {
    return true;
  }
}

export const getPaiValidation = (side: Persons[]) => {
  if (side.includes(Persons.PAI)) {
    if (side.length === 1) {
      return true;
    } else if (side.length === 3) {
      if (side.includes(Persons.FILHA_1) && side.includes(Persons.FILHA_2)) {
        console.log('Pai não pode estar sozinho com as duas filhas!');

        return false;
      } else {
        return true;
      }
    } else if (side.length === 2) {
      if (side.includes(Persons.FILHA_1) || side.includes(Persons.FILHA_2)) {
        console.log('Pai não pode estar sozinho com uma das duas filhas!');

        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}

export const getMaeValidation = (side: Persons[]) => {
  if (side.includes(Persons.MAE)) {
    if (side.length === 1) {
      return true;
    } else if (side.length === 3) {
      if (side.includes(Persons.FILHO_1) && side.includes(Persons.FILHO_2)) {
        console.log('Mãe não pode estar sozinha com os dois filhos!');

        return false;
      } else {
        return true;
      }
    } else if (side.length === 2) {
      if (side.includes(Persons.FILHO_1) || side.includes(Persons.FILHO_2)) {
        console.log('Mãe não pode estar sozinha com um dos dois filhos!');

        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}