import * as uuid from 'uuid';

export default (): string => uuid.v4().replace(/-/g, '');