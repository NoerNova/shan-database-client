export interface indexPropsType {
  id: number;
  name: string;
  type: string;
  path: string;
  create_time: {
    $date: string;
  };
  modifiled_time: {
    $date: string;
  };
  _formatted?: { name?: string; path?: string };
}

export interface contactPropsType {
  id: number;
  name: string;
  org?: string;
  email?: string;
  phone?: Phone;
  website?: string;
  address?: string;
}

export interface Phone {
  [key: string]: string;
}

export interface staffPropsType {
  id: number;
  name_en: string;
  name_shn: string;
  position: string;
  department: string;
  email?: string;
  phone?: Phone;
  address?: string;
  equipment?: Equipment[];
}

export interface Equipment {
  [key: string]: string;
}
