import {dialog} from '@electron/remote';
import {closeCreateEntry} from '../../actions/entries/closeCreateEntry';
import {closeEditEntry} from '../../actions/entries/closeEditEntry';
import {closeCreateVariant} from '../../actions/variants/closeCreateVariant';
import {isEditing} from '../../queries/isEditing';

export function confirmLeaveEditMode<R = void>(onOk: Function): Promise<R | void> {
    return new Promise((resolve) => {
        if (!isEditing()) {
            resolve(onOk());
            return;
        }

        dialog.showMessageBox(
            {
                title: 'Leave Edit Mode?',
                type: 'warning',
                message: 'You are currently in edit mode. If you proceed, your current form changes will be lost. Do you want to proceed?',
                buttons: ['Oh, wait!', 'Yes, leave edit mode'],
                cancelId: 0,
                defaultId: 1,

            }
        ).then(result => {
            if (result.response == 1) {
                Promise.all([
                    closeCreateVariant(),
                    closeCreateEntry(),
                    closeEditEntry(),
                ]).then(() => {
                    resolve(onOk());
                });
            } else {
                resolve();
            }
        });
    });
}
