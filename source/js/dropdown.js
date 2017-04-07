window.onload = function(){

    var e = document.getElementById("menu-button");
    var menu_g = document.getElementsByClassName("menu-bar");
    console.log(menu_g);
    var nav = e.parentNode.nextElementSibling;
    console.log(nav);

    e.addEventListener('click', function(event) {
        if(nav.className == 'is-expanded-vertical-dropdown'){
            nav.className = '';
            for (i = 0; i < menu_g.length; i++) {
              menu_g[i].style.fill = "white";
            }
        }
        else {
            nav.className = "is-expanded-vertical-dropdown";
            for (i = 0; i < menu_g.length; i++) {
              menu_g[i].style.fill = "black";
            }
        }
    });
}
