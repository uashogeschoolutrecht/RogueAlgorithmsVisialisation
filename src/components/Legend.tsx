import { IconButton, SpeedDial, SpeedDialIcon } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import "../styles/Legend.css";

export const Legend = () => {
    const [isOpen, setOpen] = useState<boolean>(true);
    const handleClick = () => {
        setOpen(state => !state);
    }
    const getContainerClassName = (): string=> {
        if(isOpen)
            return "legend-container"
        return "legend-container closed"
    }
    const getIcon = () => {
        if(isOpen)
            return <CloseIcon />
        return <SpeedDialIcon />
    }
    return (
        <div className={getContainerClassName()}>
            <IconButton 
                style={{ position: 'absolute', top: 10, right: 5 }}
                onClick={handleClick} >
                {getIcon()}
            </IconButton>
            <div className="legend-row">
                    <h2>Legend</h2>
            </div>
            {isOpen && <>
                <div className="legend-row">
                    <div className="legend-color" style={{background:"#363A81"}}></div>
                    <p>has more copied from it</p>
                </div>
                <div className="legend-row">
                    <div className="legend-color" style={{background:"#813636"}}></div>
                    <p>has more copied</p>
                </div> 
                <div className="legend-row">
                    <div className="legend-color" style={{background:"#999999"}}></div>
                    <p>Has not enough similarities</p>
                </div>    
                <div className="legend-row">
                    <p>The larger the node the more total similarities it has.</p>
                </div> 
                <div className="legend-row">
                    <p>To view the similarities between 2 nodes:</p>
                    
                </div>
                <div className="legend-row">
                <p>- Hold <code>ctrl</code> while clicking on a node to select it.</p>
                </div>   
            </> 
            }    
        </div>
    )
}