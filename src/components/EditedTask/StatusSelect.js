export const StatusSelect = ({ options, status, onChange }) => {

    return (
        <select
            id="status"
            value={status}
            onChange={onChange}
        >
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    )
}