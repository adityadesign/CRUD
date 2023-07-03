import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createUser = createAsyncThunk('createUser', async(data, {rejectWithValue}) => {
    const response = await fetch('https://649e6506245f077f3e9c5785.mockapi.io/crud', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    try {
        const result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})


//read action
export const showUser = createAsyncThunk('showUser', async(_,{rejectWithValue}) => {
    const response = await fetch('https://649e6506245f077f3e9c5785.mockapi.io/crud')
    try {
        const result = await response.json()
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})


//delete action
export const deleteUser = createAsyncThunk('deleteUser', async(id, {rejectWithValue}) => {
    const response = await fetch(`https://649e6506245f077f3e9c5785.mockapi.io/crud/${id}`, {
        method: "DELETE",
    })
    try {
        const result = await response.json()
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

//update action
export const updateUser = createAsyncThunk('updateUser', async(data, {rejectWithValue}) => {
    const response = await fetch(`https://649e6506245f077f3e9c5785.mockapi.io/crud/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    try {
        const result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const userDetail = createSlice({
    name: 'userDetail',
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: []
    },
    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            state.users.push(action.payload)
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })

        builder.addCase(showUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(showUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        })
        builder.addCase(showUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false
            const {id} = action.payload
            if(id){
                state.users = state.users.filter(item => item.id !== id)
            }
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(updateUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = state.users.map(item => item.id === action.payload.id ? action.payload : item)
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export default userDetail.reducer

export const {searchUser} = userDetail.actions