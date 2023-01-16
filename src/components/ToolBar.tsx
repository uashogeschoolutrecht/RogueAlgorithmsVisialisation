import {useState } from "react";
import "../styles/ToolBar.css";
import logo from "../hogeschool-utrecht-logo-black-and-white.png";
import { useDispatch, useSelector } from "react-redux";
import { setThreshold } from "../slice/scoreThreshold/scoreThreshold";
import { RootState } from "../store/store";
import { setGraph } from "../slice/graph/graphSlice";
import { getGraphWithThreshold } from "../service/services";
import { UseThreshold } from "../hooks/useThreshold";
import { Slider, styled } from "@mui/material";

export const StyledSlider = styled(Slider)({
    color: '#ECECEC'
  });

export const ToolBar = () => {
    const [threshold, setThreshold] = UseThreshold(0.3);
    const state = useSelector((state: RootState) => state.pReducer)
    const dispatch = useDispatch();
    
    const changeGraph = async () => {
        dispatch(
            setGraph(
                await getGraphWithThreshold(state.scoreThresholdSlice)))
    }
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if(typeof newValue === "number" && typeof setThreshold !== "number"){
            setThreshold(newValue);
        }
      };

    return(
        <div className="toolbar-container">
            <div className="logo-container">
                <img src={logo} alt="HU Logo" />
            </div>
            <div className="menu-container">
                <div className="slider-container">
                    <div className="threshold-container">
                        <strong className="threshold-display">{typeof threshold === "number" && threshold}</strong>
                    </div>
                    <StyledSlider
                        defaultValue={0.3}
                        step={0.1}
                        min={0.3}
                        max={1}                        
                        onChange={handleSliderChange}
                        />
                </div>
                <div className="button-container">
                    <a className="link-btn link-btn-white" onClick={changeGraph}>
                        Get Graph
                    </a>
                </div>
            </div>
        </div>
    );
}