var loadingTime = new Date().getTime();

window.addEventListener('load', function() {
    document.getElementById('loadingtime').textContent = "Время загрузки страницы: " + ((new Date).getTime() - loadingTime) +  " ms";
}, false);


document.addEventListener('DOMContentLoaded', () => {
	const pushmenu = document.getElementsByClassName('pushmenu');
	const hiddenOverley = document.querySelector('.hidden-overley');

	hiddenOverley.addEventListener('click', (e) => {
		e.currentTarget.classList.toggle('show');
		document.querySelector('.sidebar').classList.toggle('show');
		document.querySelector('body').classList.toggle('sidebar-opened');
		for (i = 0; i < pushmenu.length; i++) {
            pushmenu[i].classList.toggle('open');
		}
	});

	const pushmenuFunction = function() {
		document.querySelector('.pushmenu').classList.toggle('open');
		document.querySelector('.sidebar').classList.toggle('show');
		document.querySelector('.hidden-overley').classList.toggle('show');
		document.body.classList.toggle('sidebar-opened')
	};

	for (i = 0; i < pushmenu.length; i++) {
		pushmenu[i].addEventListener('click', pushmenuFunction, false);
	}

    const menuList = document.querySelector('ul#menu-main-menu')
    for (i = 0; i < menuList.childElementCount; i++) {
        if (menuList.children[i].childNodes[0].href == document.location) {
            menuList.children[i].classList.add('current-menu-item');
        }
        else {
            menuList.children[i].classList.remove('current-menu-item');
        }
    }
});


