import { default as editIcon } from '../../media/edit.svg'
import { default as saveIconOK } from '../../media/saveOK.svg'
import { default as saveIconError } from '../../media/save.svg'

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