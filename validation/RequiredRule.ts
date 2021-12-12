import { ValidationRule } from '~/types/vuetify';

const rule: (name: string) => ValidationRule = name => v => !!v || `${name} is required`;
export default rule;
