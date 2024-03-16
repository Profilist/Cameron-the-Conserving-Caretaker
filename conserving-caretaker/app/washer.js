import '../scss/washer.scss';

const Washer = ({ onToggle, isWashing }) => {

    return (
        <div id="wrapper">
            <div id="washingMachine" className={`washingMachine ${isWashing ? 'isWashing' : ''}`}>
                <button id="controls" className="controls" onClick={onToggle}>{isWashing ? 'STOP' : 'START'}</button>
                <div id="door" className="door"></div>
                <div id="tub" className="tub">
                    <span className="clothes"></span>
                    <span className="clothes"></span>
                    <span className="clothes"></span>
                </div>
            </div>
        </div>
    );
};

export default Washer;
