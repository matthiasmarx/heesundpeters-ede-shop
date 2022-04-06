/*
let meineListe = [1,4,6,3,9,10,15,36,23,88,8789];


function mergeSort(list) {
    if(list.length <= 1) {
        return list
    }
    else {
        let list1 = [];
        let list2 = [];
        
        // Halbiere 1. Hälfte der Liste in Liste 1
        for (var i = 0; i < list.length / 2; i++) {
            console.log('listElem', list[i])
            list1.push(list[i]);
        }
        // Halbiere 2. Hälfte der Liste in Liste 2
        for (var i = list / 2; i < list.length; i++) {
            list2.push(list[i]);
        }

        list1 = mergeSort(list1)
        list2 = mergeSort(list2)
        // console.log('list1', list1)
        return merge(list1, list2)
        
    }


}

function merge(list1, list2) {
    let neueListe = [];
    let i = 0;
    while(list1.length > 0 && list2.length > 0) {
        
        if(list1[i] <= list2[i]) {
            neueListe.push(list1[i])
            list1.slice(1)
        }
        else {
            neueListe.push(list2[i])
            list2.slice(1)
        }

        i++;
    }
    while(list1.length > 0) {
        neueListe.push(list1[i])
        list1.slice(1)
    }
    while(list2.length > 0) {
        neueListe.push(list2[i])
        list2.slice(1)
    }

    return neueListe

}


console.log(mergeSort(meineListe));

*/


