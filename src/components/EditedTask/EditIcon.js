import { default as editIcon } from '../../media/edit.png'
import { default as saveIconOK } from '../../media/saveOK.png'
import { default as saveIconError } from '../../media/save.png'

export const EditIcon = ({ height, edit, value }) => {
    const { editValue, setValue } = edit;

    if (value === '') {
        return (
            <img style={{ cursor: 'pointer' }} src={saveIconError} height={height ? height : 30} />
        )
    }

    return (
        <img onClick={() => { setValue(!editValue) }} style={{ cursor: 'pointer' }} src={editValue ? saveIconOK : editIcon} height={height ? height : 30} />
    )
}