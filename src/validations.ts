import { Persons } from './types';

export const getPilotValidation = (boat: Persons[]) => {
  if (
    boat.includes(Persons.POLICIAL) ||
    boat.includes(Persons.MAE) ||
    boat.includes(Persons.PAI)
  ) {
    return true;
  } else {
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
    } else if (side.length <= 3) {
      if (side.includes(Persons.FILHA_1 || Persons.FILHA_2)) {
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
    } else if (side.length <= 3) {
      if (side.includes(Persons.FILHO_1 && Persons.FILHO_2)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}