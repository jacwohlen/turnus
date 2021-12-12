import { ValidationRule } from '~/types/vuetify';

const rule: (name: string) => ValidationRule = name => v => (!!v && /.+@.+\..+/.test(v)) || `${name} must be a valid e-mail`;
export default rule;
