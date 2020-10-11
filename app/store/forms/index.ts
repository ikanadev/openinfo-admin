import { kea, MakeLogicType } from 'kea';

import { NewSponsorForm } from './types';
import { EmpyFile } from 'utils/const';

interface Values {
  isLoading: boolean;
  form: NewSponsorForm;
}

interface Actions {
  clear: () => void;
  setName: (value: string) => { value: string };
  setWebsite: (value: string) => { value: string };
  setDescription: (value: string) => { value: string };
  setContact: (value: string) => { value: string };
  setImage: (file: File) => { file: File };
  setLoading: (value: boolean) => { value: boolean };
  postData: () => void;
}

const initialState: Values = {
  isLoading: false,
  form: {
    name: '',
    website: '',
    description: '',
    contact: '',
    image: EmpyFile,
  },
};

const commissionLogic = kea<MakeLogicType<Values, Actions, null>>({
  actions: {
    clear: true,
    setName: (value) => ({ value }),
    setWebsite: (value) => ({ value }),
    setDescription: (value) => ({ value }),
    setContact: (value) => ({ value }),
    setImage: (file) => ({ file }),
    setLoading: (value) => ({ value }),
    postData: true,
  },
  defaults: initialState,
  reducers: {
    isLoading: {
      postData: () => true,
    },
    form: {
      setName: (state, { value }) => ({ ...state, name: value }),
      setWebsite: (state, { value }) => ({ ...state, website: value }),
      setDescription: (state, { value }) => ({ ...state, description: value }),
      setContact: (state, { value }) => ({ ...state, contact: value }),
      setImage: (state, { file }) => ({ ...state, image: file }),
      clear: () => initialState.form,
    },
  },
});

export default commissionLogic;
