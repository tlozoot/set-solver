function get_card(pos) {
    var match = document.getElementById('card_image' + pos).src.match(/\d+/);
    if (!match) return null;
    var num = match[0];
    return {
        number: num % 3,
        color: Math.ceil(num / 3) % 3,
        shape: Math.ceil(num / 9) % 3,
        fill: Math.ceil(num / 27) % 3,
    };
}

function compare_cards(c1, c2, c3) {
    if (!(c1 && c2 && c3)) return false;
    var attrs = ["color", "number", "shape", "fill"];
    for (var i = 0; i < 4; i++) {
        var a = attrs[i];
        var comp1 = (c1[a] == c2[a]);
        var comp2 = (c1[a] == c3[a]);
        var comp3 = (c2[a] == c3[a]);
        if (comp1 && comp2 && comp3) continue; // Ok if all cards have same attribute
        if (!comp1 && !comp2 && !comp3) continue; // Ok if all cards have different attributes
        return false;
    }
    return true;
}

function click_card(i) {
    document.getElementById('card_image' + i).onmousedown();
}

function select_cards(i, j, k) {
    [i, j, k].forEach(click_card);
}

var num_cards = 18;

function find_match() {
    for (var i = 0; i < num_cards; i++) {
        for (var j = i+1; j < num_cards; j++) {
            for (var k = j+1; k < num_cards; k++) {
                var cards = [i, j, k].map(get_card);
                if (compare_cards.apply(this, cards)) {
                    select_cards(i, j, k);
                    return true;
                }
            }
        }
    }
    return false;    
}

while (find_match());