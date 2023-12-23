import { useState } from 'react'
import './App.css'
import { getResults } from './utils'
import car from './assets/car.svg'
import Info from './components/Info'
import SaveDialog from './components/SaveDialog'
import DataDialog from './components/DataDialog'
import DeleteDialog from './components/DeleteDialog'

const INPUTS = ['fl', 'fr', 'rl', 'rr']

const INITIAL_WEIGHTS = INPUTS.reduce(
    (acc, name) => ({ ...acc, [name]: '' }),
    {}
)

const WEIGHT_CALCULATOR_DATA_KEY = 'WEIGHT_CALCULATOR_DATA_KEY'

export default function App() {
    const [weights, setWeights] = useState(INITIAL_WEIGHTS)
    const [results, setResults] = useState(null)
    const [selected, setSelected] = useState()
    const [saveDialogOpen, setSaveDialogOpen] = useState(false)
    const [dataDialogOpen, setDataDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const getHandleOnChange =
        (field) =>
        ({ target: { value } }) => {
            setWeights((weights) => ({
                ...weights,
                [field]: value,
            }))
        }

    const handleCalculate = () => {
        const values = INPUTS.reduce(
            (acc, name) => ({
                ...acc,
                [name]: parseFloat(weights[name]),
            }),
            {}
        )

        setResults(getResults(values))
        setSelected()
    }

    const handleReset = () => {
        setWeights(INITIAL_WEIGHTS)
        setResults(null)
        setSelected()
    }

    const handleSave = (name) => {
        const data =
            JSON.parse(localStorage.getItem(WEIGHT_CALCULATOR_DATA_KEY)) ?? []
        localStorage.setItem(
            WEIGHT_CALCULATOR_DATA_KEY,
            JSON.stringify([...data.filter(item => item.name !== name), { name, weights }])
        )
        setSaveDialogOpen(false)
        setSelected(name)
    }

    const handleLoad = (item) => {
        const values = INPUTS.reduce(
            (acc, name) => ({
                ...acc,
                [name]: Number.parseFloat(item.weights[name]),
            }),
            {}
        )
        setWeights(item.weights)
        setResults(getResults(values))
        setSelected(item.name)
        setDataDialogOpen(false)
    }

    const handleDelete = () => {
        const data =
            JSON.parse(localStorage.getItem(WEIGHT_CALCULATOR_DATA_KEY)) ?? []
        localStorage.setItem(
            WEIGHT_CALCULATOR_DATA_KEY,
            JSON.stringify(data.filter(item => item.name !== selected))
        )
        handleReset()
        setDeleteDialogOpen(false)
    }

    const [input1, input2, input3, input4] = INPUTS.map((name) => (
        <div key={name} className="input-group input-group-lg">
            <span className="input-group-text" id={`input-label-${name}`}>
                {name.toUpperCase()}
            </span>
            <input
                className="form-control bg-dark text-light"
                type="number"
                name={name}
                value={weights[name]}
                onChange={getHandleOnChange(name)}
                aria-describedby={`input-label-${name}`}
            />
        </div>
    ))

    const data = JSON.parse(
        localStorage.getItem(WEIGHT_CALCULATOR_DATA_KEY)
    ) ?? []

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-8 col-lg-7 col-xl-5">
                        <div className="c-container">
                            <h1 className='text-light text-center' style={{ height: 35 }}>{selected}</h1>
                            <div className="inputs-container">
                                {input1}
                                {input2}
                            </div>
                            <div className="img-container">
                                {results && (
                                    <>
                                        <div className="total-container">
                                            <div></div>
                                            <Info
                                                name="Front"
                                                total={results.front.total}
                                                perc={results.front.perc}
                                            />
                                            <div></div>
                                            <Info
                                                name="Left"
                                                total={results.left.total}
                                                perc={results.left.perc}
                                            />
                                            <Info
                                                name="Total"
                                                total={results.total}
                                            />
                                            <Info
                                                name="Right"
                                                total={results.right.total}
                                                perc={results.right.perc}
                                            />
                                            <div></div>
                                            <Info
                                                name="Rear"
                                                total={results.rear.total}
                                                perc={results.rear.perc}
                                            />
                                            <div></div>
                                        </div>
                                    </>
                                )}
                                <img src={car} alt="kola" />
                            </div>
                            <div className="inputs-container">
                                {input3}
                                {input4}
                            </div>

                            <div className="cross-weights">
                                {results && (
                                    <>
                                        <Info
                                            name="Cross Left"
                                            total={results.crossLeft.total}
                                            perc={results.crossLeft.perc}
                                        />
                                        <Info
                                            name="Cross Right"
                                            total={results.crossRight.total}
                                            perc={results.crossRight.perc}
                                        />
                                    </>
                                )}
                            </div>

                            <div className="button-container">
                                <button
                                    disabled={Object.values(weights).some(weight => !Number.isFinite(parseFloat(weight)))}
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={handleCalculate}
                                >
                                    Calculate
                                </button>
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={handleReset}
                                >
                                    Reset
                                </button>
                                <button
                                    disabled={!results}
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setSaveDialogOpen(true)}
                                >
                                    <i className="fa fa-download"></i>
                                </button>
                                <button
                                    disabled={!data.length}
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setDataDialogOpen(true)}
                                >
                                    <i className="fa fa-upload"></i>
                                </button>
                                <button
                                    disabled={!selected}
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setDeleteDialogOpen(true)}
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SaveDialog
                open={saveDialogOpen}
                onClose={() => setSaveDialogOpen(false)}
                onSubmit={handleSave}
                selected={selected}
            />
            <DataDialog
                open={dataDialogOpen}
                onClose={() => setDataDialogOpen(false)}
                onSubmit={handleLoad}
                data={data}
            />
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onDelete={handleDelete}
            />
        </>
    )
}
