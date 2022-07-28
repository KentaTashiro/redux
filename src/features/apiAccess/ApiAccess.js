import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ApiAccess.module.css';

import { fetchApiPost } from './apiAccessSlice';
import { editRequestFirstName, editRequestLastName } from './apiAccessSlice';
import { selectRequest, selectResponse } from './apiAccessSlice';

const ApiAccess = () => {
    // 説明１（Slice内のaction実行）
    const dispatch = useDispatch();
    // 説明２（Slice内のstateを参照）
    const request = useSelector(selectRequest);
    const response = useSelector(selectResponse);

    const apiExe = async () => {
        await dispatch(fetchApiPost(request));
        // dispatch(editRequestFirstName(""));
        // dispatch(editRequestLastName(""));
    }

    return (
        <>
            <h1>ApiAccess</h1>

            <div className={styles.area}>
                <h3>request</h3>
                <div className={styles.row}>
                    <div>requestFirstName：</div>
                    <input type="text" name="requestFirstName" value={request.requestFirstName} onChange={(e) => dispatch(editRequestFirstName(e.target.value))} />
                </div>
                <div className={styles.row}>
                    <div>requestLastName：</div>
                    <input type="text" name="requestLastName" value={request.requestLastName} onChange={(e) => dispatch(editRequestLastName(e.target.value))} />
                </div>
            </div>



            <div className={styles.area}>
                <button onClick={apiExe}>api実行</button>
            </div>

            <div className={styles.area}>
                <h3>response</h3>

                <div className={styles.row}>
                    <div>responseFirstName：</div>
                    <div>{response.responseFirstName}</div>
                </div>
                <div className={styles.row}>
                    <div>responseLastName：</div>
                    <div>{response.responseLastName}</div>
                </div>
                <div className={styles.error}>
                    <div>{response.error}</div>
                </div>
            </div>
        </>
    )
}

export default ApiAccess

// 説明１（Slice内のaction実行）
// ◆実行方法
//    useDispatchを使用

// 説明２（Slice内のstateを参照）
// ◆参照方法
//    useSelectorを使用