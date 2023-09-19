export function RowTable() {

    return (
        <>
            <tr>
                <td className="select">
                    <select className="form-select w-75" onchange="printValue(this.value)" aria-label="Default select example">
                        <option value selected>Chọn thuốc</option>
                        <option value={1}>Thuốc ABINA 1</option>
                        <option value={2}>Thuốc ABINA 2</option>
                        <option value={3}>Thuốc ABINA 3</option>
                    </select>
                </td>
                <td>HOP</td>
                <td contentEditable={true}>10</td>
                <td>29700</td>
                <td contentEditable={true}>0</td>
                <td contentEditable={true}>5</td>
                <td contentEditable={true}>311850</td>
                <td contentEditable={true}>678678</td>
                <td contentEditable={true}>1/1/2020</td>
            </tr>
        </>
    );
}