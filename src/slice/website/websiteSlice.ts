import { createSlice } from "@reduxjs/toolkit"
import { WebsiteNode } from "../../types/types"

interface IWebsite {
    website: WebsiteNode;
}

const initialState: IWebsite = {
    website: {
      id: -1,
      label: "placeholder",
      totalArticles: -1,
      amountOfConnections: -1
    },
}

const websiteSlice = createSlice({
    name: 'Website',
    initialState: initialState,
    reducers: {
      setWebsite: (state, action) => {        
        state.website = action.payload;
        return state;
      },
      clearWebsite: (state) => {
        return initialState;
      },
    }
  })

export const { setWebsite, clearWebsite } = websiteSlice.actions

export default websiteSlice.reducer