
///// MERGE SÖRT
// Merge Sort

funktion mergeSort(liste) {

    wenn liste.length <= 1 
        return liste
    sonst 
        halbiere Liste in liste1 und liste2 
        liste1 = mergeSort(liste1)
        liste2 = mergeSort(liste2)
        return merge(liste1, liste2 )
}

funktion merge(liste1, liste2) {
    let neueListe;
    solange liste1 und liste2 nicht leer 
        falls (erstes Element liste1 <= erstes Element liste2)
            füge erstes Element aus liste1 in neueListe ein und entferne es aus liste1 
        sonst 
            füge erstes Element aus liste2 in neueListe ein und entferne es aus liste2
    solange_ende
    solange(liste1 nicht leer)
        füge Elemente in neueListe ein und entferne aus liste1
    solange_ende 

    solange(liste2 nicht leer)
        füge Elemente in neueListe ein und entferne aus liste2
    solange_ende

    return neueListe

}


