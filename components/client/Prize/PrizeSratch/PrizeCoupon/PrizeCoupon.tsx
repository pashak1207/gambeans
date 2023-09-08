/* eslint-disable @next/next/no-img-element */
//@ts-nocheck
'use client'

import { useEffect, useRef } from 'react';

function PrizeCoupon(props) {
	const coverImg = useRef(null);

	function main() {
		let isDrawing, lastPoint;
		let canvas = document.getElementById('js-canvas')
		if(!canvas) return
		
		let canvasWidth = canvas?.width || 0,
			canvasHeight = canvas?.height || 0,
			ctx = canvas?.getContext('2d'),
			image = coverImg.current,
			brush = new Image();

		if (coverImg.current.complete) {
			ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
			document.querySelectorAll('.originalDiv')[0].style.visibility = 'visible';
		}
		brush.src = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDAgNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIvPjwvc3ZnPg==';

		canvas.addEventListener('mousedown', handleMouseDown, false);
		canvas.addEventListener('touchstart', handleMouseDown, false);
		canvas.addEventListener('mousemove', handleMouseMove, false);
		canvas.addEventListener('touchmove', handleMouseMove, false);
		canvas.addEventListener('mouseup', handleMouseUp, false);
		canvas.addEventListener('touchend', handleMouseUp, false);

		function distanceBetween(point1, point2) {
			return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
		}

		function angleBetween(point1, point2) {
			return Math.atan2(point2.x - point1.x, point2.y - point1.y);
		}

		
		function getFilledInPixels(stride) {
			if (!stride || stride < 1) { stride = 1; }

			var pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
				pdata = pixels.data,
				l = pdata.length,
				total = (l / stride),
				count = 0;

			
			for (var i = count = 0; i < l; i += stride) {
				if (parseInt(pdata[i]) === 0) {
					count++;
				}
			}

			return Math.round((count / total) * 100);
		}


		function getMouse(e, canvas) {
			var offsetX = 0, offsetY = 0, mx, my;

			if (canvas.offsetParent !== undefined) {
				do {
					offsetX += canvas.offsetLeft;
					offsetY += canvas.offsetTop;
				} while ((canvas = canvas.offsetParent));
			}

			mx = (e.pageX || e.touches[0].clientX) - offsetX;
			my = (e.pageY || e.touches[0].clientY) - offsetY;

			return { x: mx, y: my };
		}


		function handlePercentage(filledInPixels) {
			filledInPixels = filledInPixels || 0;
			if (filledInPixels > 80 && canvas.parentNode) {
				props.setOpened(true)
				canvas.parentNode.removeChild(canvas);
			}
		}


		function handleMouseDown(e) {
			isDrawing = true;
			lastPoint = getMouse(e, canvas);
		}


		function handleMouseMove(e) {
			if (!isDrawing) { return; }

			e.preventDefault();

			var currentPoint = getMouse(e, canvas),
				dist = distanceBetween(lastPoint, currentPoint),
				angle = angleBetween(lastPoint, currentPoint),
				x, y;

			for (var i = 0; i < dist; i++) {
				x = lastPoint.x + (Math.sin(angle) * i) - 25;
				y = lastPoint.y + (Math.cos(angle) * i) - 25;
				ctx.globalCompositeOperation = 'destination-out';
				ctx.drawImage(brush, x, y);
			}

			lastPoint = currentPoint;
			handlePercentage(getFilledInPixels(32));
		}

		function handleMouseUp(e) {
			isDrawing = false;
		}
		
		if(canvas && props.opened){
			canvas.parentNode.removeChild(canvas);
			return
		}

	}
	
	useEffect(() => {
		main()
	}, [props.children])

	return (
		<div className="prize__scratchcard-inner">
			<div className="container" id="js-container">
				<canvas className="canvas" id="js-canvas" width={props.width} height={props.height} style={{position: 'absolute',top: 0}}>
				</canvas>
				<div className="originalDiv" style={{ visibility: "hidden"}}>
					{props.children}
				</div>
				<img ref={coverImg} alt='bg' src={props.cover} className="hidden" style={{ visibility: 'hidden' }}/>
			</div>
		</div >
	);
}

export default PrizeCoupon;