import { PomfResponse } from './pomf-response.interface';

export interface PomfObject {
    response?: PomfResponse;
    file: File;
    progress?: any;
}
