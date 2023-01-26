import React from "react";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Graph.css";
import { setShow } from "../../slice/modal/modalSlice";
import { RootState } from "../../store/store";
import { NodeInfo } from "./NodeInfo";
import { EdgeInfo } from "./EdgeInfo";
import { Waiting } from "./Waiting";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75vw',
    height: '70vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => ({
        website: state.pReducer.websiteSlice.website, 
        edge: state.pReducer.edgeSlice.edge,  
        graph: state.pReducer.graphSlice.graph,
        show: state.pReducer.modalSlice
    }));

    const handleClose = () => dispatch(setShow({show: false, type:""}));

    const renderInfo = () => {
        switch (state.show.type) {
            case "website":
                return <NodeInfo/>
            case "edge":
                return <EdgeInfo />
            case "wait":
                return <Waiting />
            default:
                return null;
        }
    }

    return(
        <>
        <Modal open={state.show.show}
            onClose={handleClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
                  timeout: 500,
            }}
            className={state.show.type}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Fade in={state.show.show}>
                <Box sx={style}>
                    {renderInfo()}
                </Box>
            </Fade>
        </Modal>  
        {children}
        </>
        
    );
}