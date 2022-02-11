filter_fn = function(element) {
    return element.length > 3
}

let my_list = ["duck", "cat", "goat"]

console.log( my_list.filter( filter_fn ) )
