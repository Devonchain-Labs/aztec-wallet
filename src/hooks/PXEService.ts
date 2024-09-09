import { createPXEClient, waitForPXE } from '@aztec/aztec.js';

const pxe = createPXEClient('http://localhost:8080');
await waitForPXE(pxe);  

export default pxe;