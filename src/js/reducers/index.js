const initialState = {
    data : [],
    search : [],
    sortOrderCost : 0,
    sortOrderPublishedDate : 0
}

function rootReducer (state = initialState, action){

    if(action.type === 'DATA_LOADED'){
        //alert('prateek');
        action.payload.forEach( (value)=>{
            value.visible = true;
        })
        return {
            ...state,
            data: action.payload
        }
    } else if(action.type === 'CHECK_SEARCH'){
        //alert(action.value);
        // let arr =[]
        // arr = [...state.data]
        // arr.forEach((value) => {
        //     if(value.title.includes(action.value) || value.description.includes(value)){
        //         value.visible=true;
        //     } else {
        //         value.visible=false;
        //     }
        // })
        action.payload.forEach( (value, index)=>{
            value.visible = true;
        })
        console.log(action.payload);
        return {
            ...state,
            data: action.payload
        }
    } else if(action.type === 'SORT_BY_COST'){
        
        let arr =[]
        arr = [...state.data]
        arr.sort((a, b)=>{
            if(state.sortOrderCost === 0){
                if(parseInt(a.cost) > parseInt(b.cost)){
                return 1
                } else{
                return -1;
                }
            } else {
                if(parseInt(a.cost) < parseInt(b.cost)){
                    return 1
                    } else{
                    return -1;
                    }
            }
        })
        if(state.sortOrderCost === 0){
            return {
                ...state,
                data: arr,
                sortOrderCost : 1
            }
        } else {
            return {
                ...state,
                data: arr,
                sortOrderCost : 0
            }
        }
    } else if(action.type === 'SORT_BY_PUBLISHED_DATE'){
        let arr =[]
        arr = [...state.data]
        arr.sort((a, b)=>{
            if(state.sortOrderPublishedDate === 0){
                var aa = a.publishedDate.split('/').reverse().join(),
                    bb = b.publishedDate.split('/').reverse().join();
                return new Date(aa) < new Date(bb) ? -1 : (new Date(aa) > new Date(bb) ? 1 : 0);
            } else {
                var aa = a.publishedDate.split('/').reverse().join(),
                    bb = b.publishedDate.split('/').reverse().join();
                return new Date(aa) > new Date(bb) ? -1 : (new Date(aa) < new Date(bb) ? 1 : 0);
            }
          })
        if(state.sortOrderPublishedDate === 0){  
            return {
                ...state,
                data: arr,
                sortOrderPublishedDate : 1
            }
        } else {
            return {
                ...state,
                data: arr,
                sortOrderPublishedDate : 0
            }
        }
    } else if (action.type === 'SHOW_RECENT_SEARCHES'){
        let arr = action.payload;
        console.log(arr);
        return {
            ...state,
            search: arr
        }
    } else if (action.type === 'APPLY_FILTER'){
        var from = Date.parse(action.from_date)
            var to = Date.parse(action.to_date)
            alert(from + ' ' + to);
        let arr = [...state.data];
        arr.forEach((value) => {
            var c = value.publishedDate.split("/");
            var check = Date.parse(new Date(c[2], parseInt(c[1])-1, c[0]));
            //alert(check);
            if(check > from && check < to){
                value.visible=true;
            } else {
                value.visible = false;
            }    
        })
        return {
            ...state,
            data: arr
        }
    } else if (action.type === 'APPLY_COST_FILTER'){
        alert(action.min + action.max);
        console.log(state.data);
        let arr = [...state.data];
        arr.forEach((value) => {
            if(parseInt(value.cost) > action.min && parseInt(value.cost) < action.max){
                value.visible=true;
            } else {
                value.visible = false;
            }    
        })
        console.log(arr);
        return {
            ...state,
            data: arr
        }
    }
    return state;
}

export default rootReducer