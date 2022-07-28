import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// springBootで作成したRESTAPI
// requestBodyの形式→{"requestFirstName":"*****", "requestLastName":"*****"}
// responseBodyの形式→{"responseFirstName":"*****", "responseLastName":"*****"}
const apiUrl = "http://10.2.11.9:8081/api/requestBodyJsonParamGet/";

// 説明２（非同期処理の作成について）
export const fetchApiPost = createAsyncThunk("api/post", async (request) => {
    const res = await axios.post(
        apiUrl,
        request,
        {headers: {
            "Content-Type": "application/json"
        }}
    );

    return res.data;
});


// 説明１（Sliceの作成について）
const apiAccessSlice = createSlice({
    name: "apiAccess",
    initialState: {
        requestState: {
            requestFirstName: "",
            requestLastName: ""
        },
        responseState: {
            responseFirstName: "",
            responseLastName: "",
            error: ""
        }
    },
    reducers: {
        editRequestFirstName(state, action) { state.requestState.requestFirstName = action.payload },
        editRequestLastName(state, action) { state.requestState.requestLastName = action.payload },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiPost.fulfilled, (state, action) => {
            state.responseState.responseFirstName = action.payload.responseFirstName;
            state.responseState.responseLastName = action.payload.responseLastName;
        });
        builder.addCase(fetchApiPost.rejected, (state, action) => {
            state.responseState.responseFirstName = "rejected_responseFirstName";
            state.responseState.responseLastName = "rejected_responseLastName";
            state.responseState.error = action.error.message;
        });
    }

});

// exportの記述
export const { editRequestFirstName, editRequestLastName } = apiAccessSlice.actions;
export const selectRequest = (state) => state.apiAccess.requestState;
export const selectResponse = (state) => state.apiAccess.responseState;

// 説明３（Sliceをstoreに登録する方法について）
export default apiAccessSlice.reducer;


// 説明１（Sliceの作成について）
// ◆Sliceの作成方法
//     createSliceを使用
// ◆Sliceの構成
//     name         ：Sliceの名前を設定
//     initialState ：Slice内のstateの構成・初期値を設定
//     reducers     ：Slice内のactionを作成
//     extraReducers：非同期処理の後処理のactionに対して処理を定義

// 説明２（非同期処理の作成について）
// ◆非同期処理の作成方法
//    createAsyncThunkを使用
//      ※createSliceの外側で実装すること。

// 説明３（Sliceをstoreに登録する方法について）
// ◆storeへの登録方法
//    configureStoreを使用
//      ※store.jsにて行う。