
function DropDownProvider(props: any) {
    return (
        <span className="text-sm">
            {!props.noHeader && <span className="text-muted pr-1">{props.title}</span>}
            <span role="button" className="selectStatus">
                <span
                    className={`badge  font-weight-bold btn-group align-middle pl-2 pr-2 pt-1 pb-1 ${props.fontSize}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{backgroundColor:props.bgColor, color: props.textColor}}
                >
                    <span className="pull-left ">{props.selectedValue || "--"}</span>
                    {!props.noIcon && <span className="pull-left">
                        <i className="fas fa-chevron-down ml-2 "></i>
                    </span>}
                </span>
                <ul className="dropdown-menu dropoptbackgrdstatus p-2">
                    <li className=" statuslistitom "
                        onClick={() => props.dropdownSelectionHandler('--', props.title.toLowerCase())}
                    >
                        <span
                            role="button"
                            className="pt-1 pb-1 text-sm d-block text-decoration-none"
                        >
                            --
                        </span>
                    </li>


                    {props.dropdownItems.map((item: any, index: any) => (
                        <li
                            className=" statuslistitom "
                            key={index}
                            onClick={() => !props.noHeader ? props.dropdownSelectionHandler(item, props.title.toLowerCase()): props.dropdownSelectionHandler(item, props.task)}
                        >
                            <a
                                role="button"
                                className="pt-1 pb-1 text-sm d-block text-decoration-none"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </span>
        </span>
    )
}

export default DropDownProvider