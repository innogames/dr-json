import {GITHUB_URL} from '@/config/constants';

export function getDownloadUrl(): string {
    return GITHUB_URL + '/releases';
}
