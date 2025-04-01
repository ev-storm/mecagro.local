
function totalSvg() {

	let paths = document.querySelectorAll('.btn-svg > .svg-con > svg > path');

	let lengths = [];


	paths.forEach(function(path) {

			let len = Math.round(path.getTotalLength());


			path.setAttribute('stroke-dasharray', len);
			path.setAttribute('stroke-dashoffset', len); 


			lengths.push(len);
	});


	const btns = document.querySelectorAll('.btn-svg');

	btns.forEach(btn => {
			btn.addEventListener('mouseenter', function () {

					const path = this.querySelector('svg > path');

					let len = Math.round(path.getTotalLength());


					const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
					animate.setAttribute("attributeName", "stroke-dashoffset");
					animate.setAttribute("values", `${len}; 0`);
					animate.setAttribute("dur", `${len / 100}`);
					animate.setAttribute("fill", "freeze");

					path.appendChild(animate);
					animate.beginElement();
			});


			btn.dispatchEvent(new Event('mouseenter'));
	});
}

document.addEventListener('DOMContentLoaded', totalSvg);


