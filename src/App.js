import { useState } from 'react'
import './App.css'
import { getResults } from './utils'
import car from './assets/car.svg'
import Info from './components/Info'

const INPUTS = ['fl', 'fr', 'rl', 'rr']

const INITIAL_WEIGHTS = INPUTS.reduce(
    (acc, name) => ({ ...acc, [name]: '' }),
    {}
)

export default function App() {
    const [weights, setWeights] = useState(INITIAL_WEIGHTS)
    const [results, setResults] = useState(null)

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
                [name]: Number.parseFloat(weights[name]),
            }),
            {}
        )

        setResults(getResults(values))
    }

    const handleReset = () => {
        setWeights(INITIAL_WEIGHTS)
        setResults(null)
    }

    const openSaves = () => {
        return
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

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-8 col-lg-7 col-xl-5">
                    <div className="c-container">
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
                            <div className="btn-group dropup">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                >
                                    <i className="fa fa-floppy-o"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <span className="visually-hidden">
                                        Toggle Dropup
                                    </span>
                                </button>
                                <ul className="dropdown-menu"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
