import { PomfFile } from './pomf-file.interface';

export interface PomfResponse {
    success: boolean;
    errorcode?: number;
    description?: number;
    files?: PomfFile[];
}
