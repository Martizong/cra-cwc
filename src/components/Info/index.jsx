import './styles.css'

export default function Info({ name, total, perc }) {
    return (
        <div className="infobox bg-dark-subtle rounded">
            <div className="fs-7 text-primary">{name}</div>
            <div className="fs-3 text-light-emphasis">{total.toFixed(2)}</div>
            {Boolean(perc) && (
                <div className="fs-6 text-light-emphasis">{perc.toFixed(2)}%</div>
            )}
        </div>
    )
}
