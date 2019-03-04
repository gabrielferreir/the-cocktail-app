import {
    CHECK_ITEM,
    UPDATE_LIST,
    UPDATE_INPUT,
    REMOVE_ITEM
} from '../actions/actionTypes';

const initialState = {
    test: 'Test',
    inpuValue: '',
    lastValue: '',
    list: []
};
export const clickReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LIST:
            return {
                ...state,
                inputValue: '',
                list: [
                    ...state.list,
                    {
                        name: action.value,
                        checked: false
                    }
                ]
            };
        case UPDATE_INPUT:
            return {
                ...state,
                inputValue: action.value
            };
        case CHECK_ITEM:
            return {
                ...state,
                list: state.list.map((item, index) => ({
                    ...item,
                    checked: index === action.index ? !item.checked : item.checked
                }))
            };
        case REMOVE_ITEM:
            return {
                ...state,
                list: state.list.filter((item, index) => index !== action.index)
            };
        default:
            return state;
    }
};
