
const $openHierarchyBtn = document.querySelector('button#open-hierarchy')

let $hierarchyWindow

$openHierarchyBtn.addEventListener('click', ()=> {
    $hierarchyWindow = window.open(
        '/Hierarchy.html', 
        "Hierarchy", 
        "left=0,top=0,width=320,height=640,menubar=no,toolbar=no,location=no"
    )    
})
